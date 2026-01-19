import {useCallback, useEffect, useRef, useState} from "react";
import {LoopMode} from "@/const/LoopMode";
import Hls from "hls.js";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import streamApi from "@/apis/main/stream/stream.api";
import {CustomHlsConfig, HlsTokenRefreshLoader} from "@/components/Utility/HlsTokenRefreshLoader";
import {playNext, setIsPlaying} from "@/libs/redux/features/player/playerSlice";

export interface PlayerControl {
  trackId: string | null
  duration: number
  current: number
  bitrate: number
  loopMode: LoopMode
  shuffle: boolean
  playing: boolean
  volume: number
  isMuted: boolean
}

export const usePlayerControls = () => {
  const dispatch = useAppDispatch();
  const {currentTrack, isPlaying, currentVolume, isMuted, loopMode} = useAppSelector(state => state.player);
  const bitrate = 192;    // Tạm thời hardcode bitrate
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const streamUrlRef = useRef<string | null>(null);
  const tokenParamRef = useRef<string | null>(null);
  
  // Refs for Token Refresh logic (Avoid Stale Closures inside HLS Loader)
  const isRefreshingRef = useRef(false);
  const trackIdRef = useRef<string | null>(null);
  const bitrateRef = useRef(bitrate);
  
  useEffect(() => {
    trackIdRef.current = currentTrack?.id || null;
    bitrateRef.current = bitrate;
  }, [currentTrack, bitrate]);
  
  const handleNewTokenWhenExpired = useCallback(async () => {
    if (isRefreshingRef.current) return null;
    isRefreshingRef.current = true;
    
    const currentId = trackIdRef.current; // Lấy ID string
    const currentBitrate = bitrateRef.current;
    
    if (!currentId) return null;
    
    try {
      const response = await streamApi.streamTrack(currentBitrate, currentId);
      if (response?.data && streamUrlRef.current) {
        streamUrlRef.current = response.data.streamUrl;
        tokenParamRef.current = response.data.tokenParam;
        return response.data.tokenParam;
      }
    } catch (error) {
      console.error("Error refreshing stream url:", error);
    } finally {
      isRefreshingRef.current = false;
    }
    return null;
  }, []);
  
  // Setup HLS
  useEffect(() => {
    // Nếu currentTrack là null, dọn dẹp và return
    if (!currentTrack) {
      if (hlsRef.current) hlsRef.current.destroy();
      return;
    }
    
    const loadStream = async () => {
      try {
        const response = await streamApi.streamTrack(bitrate, currentTrack.id);
        
        if (response?.data) {
          const streamUrl = response.data.streamUrl;
          streamUrlRef.current = streamUrl;
          tokenParamRef.current = response.data.tokenParam;
          
          if (Hls.isSupported() && audioRef.current) {
            if (hlsRef.current) hlsRef.current.destroy();
            
            const hlsConfig: Partial<CustomHlsConfig> = {
              maxBufferLength: 30,
              enableWorker: true,
              fLoader: HlsTokenRefreshLoader as any,
              pLoader: HlsTokenRefreshLoader as any,
              handleNewTokenWhenExpired: handleNewTokenWhenExpired,
              xhrSetup: (xhr: XMLHttpRequest, url: string) => {
                if ((url.includes('.ts') || url.includes('m3u8')) && tokenParamRef.current) {
                  const baseUrl = url.split('?')[0];
                  xhr.open('GET', `${baseUrl}?${tokenParamRef.current}`, true);
                }
              }
            };
            
            const hls = new Hls(hlsConfig);
            hlsRef.current = hls;
            
            hls.loadSource(streamUrl);
            hls.attachMedia(audioRef.current);
            
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              audioRef.current?.play().catch(e => console.warn("Autoplay blocked", e));
            });
            
            hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
              setDuration(data.details.totalduration);
            });
            
            hls.on(Hls.Events.ERROR, (_, data) => {
              if (data.fatal) {
                switch (data.type) {
                  case Hls.ErrorTypes.NETWORK_ERROR:
                    hls.startLoad();
                    break;
                  case Hls.ErrorTypes.MEDIA_ERROR:
                    hls.recoverMediaError();
                    break;
                  default:
                    hls.destroy();
                    dispatch(setIsPlaying(false));
                    break;
                }
              }
            });
          }
        }
      } catch (error) {
        console.error("Load failed", error);
        dispatch(setIsPlaying(false));
      }
    };
    
    loadStream();
    
    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
    };
    
    // Quan trọng: Dependency là currentTrack.id
    // Nếu chỉ để [currentTrack], React có thể so sánh tham chiếu object (reference check)
    // Dùng .id đảm bảo logic chỉ chạy lại khi ĐÚNG LÀ bài hát đã đổi.
  }, [currentTrack?.id, bitrate, dispatch, handleNewTokenWhenExpired]);
  
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying && audioRef.current.paused) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) playPromise.catch(() => {});
    } else if (!isPlaying && !audioRef.current.paused) {
      audioRef.current.pause();
    }
    
    audioRef.current.volume = isMuted ? 0 : currentVolume / 100;
    audioRef.current.muted = isMuted;
    
  }, [isPlaying, currentVolume, isMuted]);
  
  
  // --- LOGIC 4: DOM EVENTS HANDLERS ---
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  }, []);
  
  const handleEnded = useCallback(() => {
    // Logic Loop:
    // 1. Loop 1: Tự replay
    if (loopMode === LoopMode.ONE) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }
    // 2. Loop khác: Gọi Redux đổi bài
    dispatch(playNext({ isListenerClick: false }));
  }, [dispatch, loopMode]);
  
  const handleNativePlayPause = useCallback(() => {
    if (audioRef.current) {
      dispatch(setIsPlaying(!audioRef.current.paused));
    }
  }, [dispatch]);
  
  const seek = useCallback((time: number) => {
    if (audioRef.current && Number.isFinite(time)) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);
  
  return {
    audioRef,
    currentTime,
    duration,
    seek,
    handleTimeUpdate,
    handleEnded,
    handleNativePlayPause
  };
}
