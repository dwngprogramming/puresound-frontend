import {useCallback, useEffect, useRef, useState} from "react";
import {LoopMode} from "@/const/LoopMode";
import Hls from "hls.js";
import {useAppDispatch} from "@/libs/redux/hooks";
import {showErrorNotification} from "@/libs/redux/features/notification/notificationAction";
import {useTranslations} from "next-intl";
import streamApi from "@/apis/main/stream/stream.api";
import {PlayerControl} from "@/libs/redux/features/player_control/playerControlsSlice";
import {CustomHlsConfig, HlsTokenRefreshLoader} from "@/components/Utility/HlsTokenRefreshLoader";

export const usePlayerControls = () => {
  const t = useTranslations("Streaming.Error");
  const dispatch = useAppDispatch();
  const [saved, setSaved] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);

  const [playerControl, setPlayerControl] = useState<PlayerControl>({
    trackId: null,
    duration: 0,
    current: 0,
    bitrate: 192,
    loopMode: LoopMode.NONE,
    shuffle: false,
    playing: false,
    volume: 15
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const streamUrlRef = useRef<string | null>(null);
  const isRefreshingRef = useRef(false);
  const tokenParamRef = useRef<string | null>(null);

  // Sync Volume state -> Audio Element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = playerControl.volume / 100;
    }
  }, [playerControl.volume]);

  // Refresh stream URL khi hết hạn
  // Using refs to avoid stale closures
  const trackIdRef = useRef(playerControl.trackId);
  const bitrateRef = useRef(playerControl.bitrate);

  // Update refs when trackId or/and bitrate changes
  useEffect(() => {
    trackIdRef.current = playerControl.trackId;
    bitrateRef.current = playerControl.bitrate;
  }, [playerControl.trackId, playerControl.bitrate]);

  const handleNewTokenWhenExpired = useCallback(async () => {
    if (isRefreshingRef.current) return null; // Avoid multiple refresh
    isRefreshingRef.current = true;

    const currentTrackId = trackIdRef.current;
    const currentBitrate = bitrateRef.current;

    if (!currentTrackId) return null;

    try {
      const response = await streamApi.streamTrack(currentBitrate, currentTrackId);
      if (response?.data && streamUrlRef.current) {
        streamUrlRef.current = response.data.streamUrl;
        tokenParamRef.current = response.data.tokenParam;
        return response.data.tokenParam;
      } else {
        dispatch(showErrorNotification(t("system")));
      }
    } catch (error) {
      console.error("Error refresh stream url:", error);
      dispatch(showErrorNotification(t("system")));
    } finally {
      isRefreshingRef.current = false;
    }
    return null;
  }, [dispatch, t]);

  // Event Handlers
  const handleLoadMetadata = useCallback(() => {
    if (audioRef.current) {
      setPlayerControl(prev => ({...prev, duration: audioRef.current!.duration}));
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (isSeeking || !audioRef.current) return;
    setPlayerControl(prev => ({...prev, current: audioRef.current!.currentTime}));
  }, [isSeeking]);

  // Just update Playing State base on real DOM state
  const handlePlayPause = useCallback((isPlaying: boolean) => {
    setPlayerControl(prev => ({...prev, playing: isPlaying}));
  }, []);

  const handleEnded = useCallback(() => {
    setPlayerControl(prev => {
      if (audioRef.current) {
        if (prev.loopMode === LoopMode.ONE) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
          return prev;
        }
      }
      // Default: Stop
      return {...prev, playing: false};
    });
  }, []);

  // Use Ref to save current time, so that when streamUrl changes, we can resume from that time
  // Avoid adding playerControl.current to dependency to prevent re-creating HLS unnecessarily
  // Ref not re-render component
  const currentTimeRef = useRef(0);
  useEffect(() => {
    currentTimeRef.current = playerControl.current;
  }, [playerControl.current]);

  // Setup HLS
  useEffect(() => {
    const {trackId} = playerControl;
    if (!trackId || !streamUrlRef.current || !audioRef.current) return;

    const streamUrl = streamUrlRef.current;
    const audio = audioRef.current;

    const hlsConfig: Partial<CustomHlsConfig> = {
      maxBufferLength: 30,

      fLoader: HlsTokenRefreshLoader as any,    // For .ts files
      pLoader: HlsTokenRefreshLoader as any,

      handleNewTokenWhenExpired: handleNewTokenWhenExpired,

      // Đây là setup cho các segment .ts và m3u8 lần đầu (luôn đảm bảo rằng các request đều có token mới nhất)
      xhrSetup: (xhr: XMLHttpRequest, url: string) => {
        if (url.includes('.ts') || url.includes('m3u8')) {
          const baseUrl = url.split('?')[0];
          xhr.open('GET', `${baseUrl}?${tokenParamRef.current}`, true);
        }
      }
    };

    let hls: Hls;

    const initHls = () => {
      if (Hls.isSupported()) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }

        hls = new Hls(hlsConfig);
        hlsRef.current = hls;

        hls.loadSource(streamUrl);
        hls.attachMedia(audio);

        hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
          // data.details.totalduration chứa tổng thời gian chính xác từ file m3u8
          const durationFromManifest = data.details.totalduration;

          setPlayerControl(prev => {
            // Chỉ update nếu duration khác giá trị cũ để tránh render thừa
            if (prev.duration !== durationFromManifest) {
              return {...prev, duration: durationFromManifest};
            }
            return prev;
          });
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // Resume logic: Chỉ resume nếu currentTimeRef > 0 (tức là refresh token/link)
          // Nếu là bài mới (loadTrack set current=0) thì nó sẽ chạy từ 0
          if (currentTimeRef.current > 0.5) {
            audio.currentTime = currentTimeRef.current;
            audio.play().catch(e => console.warn("Autoplay blocked", e));
          }
        });

        hls.on(Hls.Events.ERROR, async (event, data) => {
          if (data.fatal) {
            console.error("HLS fatal error:", data);
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                const httpCode = data.response?.code;
                // Nếu Loader (đã setup trong HlsConfig)s đã bó tay với 401/403 hoặc file không tồn tại (404)
                if (httpCode === 401 || httpCode === 403 || httpCode === 404) {
                  hls.destroy();
                  dispatch(showErrorNotification(t("system")));
                  return;
                }
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log("Fatal media error encountered, trying to recover...");
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                break;
            }
          }
        });
      }
    };

    initHls();

    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
    }
  }, [playerControl.trackId, handleNewTokenWhenExpired]);

  // Setup Event Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => handlePlayPause(true);
    const onPause = () => handlePlayPause(false);
    const onVolumeChange = () => {
      setPlayerControl(prev => ({
        ...prev,
        volume: Math.floor(audio.volume * 100)
      }));
    };

    audio.addEventListener('loadedmetadata', handleLoadMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('volumechange', onVolumeChange); // Đã thêm listener
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('volumechange', onVolumeChange); // Đã thêm remove
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [handleLoadMetadata, handleTimeUpdate, handlePlayPause, handleEnded]);


  // User Actions
  const handleSaved = () => setSaved(prev => !prev);

  const handleLoop = (mode: LoopMode) =>
    setPlayerControl(prev => ({
      ...prev,
      loopMode: mode
    }));

  const handleShuffle = () =>
    setPlayerControl(prev => ({
      ...prev, shuffle: !prev.shuffle
    }));

  const handlePlayTrack = () => {
    // Just affect DOM, Event Listener auto update state -> Simpler logic
    if (audioRef.current?.paused) audioRef.current.play();
    else audioRef.current?.pause();
  };

  const handleSeekTrack = useCallback((value: number) => {
    // Optimistic UI update
    setPlayerControl(prev => ({...prev, current: value}));
    setIsSeeking(true);
  }, []);

  const handleSeekComplete = useCallback((value: number) => {
    if (audioRef.current) {
      // Check if finite to avoid crash
      if (Number.isFinite(value)) audioRef.current.currentTime = value;
    }
    setIsSeeking(false);
  }, []);

  const handleVolume = useCallback((volume: number) => {
    // Just set state, Effect auto update DOM
    const vol = Math.min(Math.max(volume, 0), 100);
    setPlayerControl(prev => ({...prev, volume: vol}));
  }, []);

  const loadTrack = useCallback(async (track: { trackId: string, bitrate: number }) => {
    try {
      const response = await streamApi.streamTrack(track.bitrate, track.trackId);

      if (response?.data) {
        streamUrlRef.current = "https://stream.puresound.space/192/01K8NFBYSAR65S5X2C4XT31J1N/m3u8?token_=exp=1763716002~hmac=2eed7601e7014eacd5859d645dcc0ac2d56a8541f492713cf66c194d9765a041";
        tokenParamRef.current = response.data.tokenParam;

        setPlayerControl(prev => ({
          ...prev,
          trackId: track.trackId,
          bitrate: track.bitrate,
          current: 0,
          duration: 0,
        }));
      }
    } catch (error) {
      console.error("Load track failed", error);
      dispatch(showErrorNotification(t("system")));
    }
  }, [dispatch, t]);

  return {
    playerControl,
    audioRef,
    saved,
    handleSaved,
    handleLoop,
    handleShuffle,
    handlePlayTrack,
    handleSeekTrack,
    handleSeekComplete,
    handleVolume,
    loadTrack
  };
}
