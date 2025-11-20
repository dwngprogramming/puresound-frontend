import {useCallback, useEffect, useRef, useState} from "react";
import {LoopMode} from "@/const/LoopMode";
import Hls from "hls.js";
import {useAppDispatch} from "@/libs/redux/hooks";
import {showErrorNotification} from "@/libs/redux/features/notification/notificationAction";
import {useTranslations} from "next-intl";
import streamApi from "@/apis/main/stream/stream.api";

export interface PlayerControl {
  streamUrl: string
  trackId: string
  duration: number
  current: number
  bitrate: number
  loopMode: LoopMode
  shuffle: boolean
  playing: boolean
  volume: number
}

export const usePlayerControls = () => {
  const t = useTranslations("Streaming.Error");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const dispatch = useAppDispatch();
  const [saved, setSaved] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);

  const [playerControl, setPlayerControl] = useState<PlayerControl>({
    streamUrl: "https://stream.puresound.space/192/01K8NFN35729A5PHCQ7FNYG8BH/m3u8?token_=exp=1763141470~hmac=bdc23183e9127b66ed20fbbc4927da4e195204a83aeef287c358b4a8a6912f69",
    trackId: "01K8NFN35729A5PHCQ7FNYG8BH",
    duration: 0,
    current: 0,
    bitrate: 192,
    loopMode: LoopMode.NONE,
    shuffle: false,
    playing: false,
    volume: 15
  });

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

  const handleTokenExpired = useCallback(async () => {
    const currentTrackId = trackIdRef.current;
    const currentBitrate = bitrateRef.current;

    if (!currentTrackId) return;

    try {
      const response = await streamApi.streamTrack(currentBitrate, currentTrackId);
      if (response?.data?.url) {
        setPlayerControl(prev => ({...prev, streamUrl: response.data.url}));
      } else {
        dispatch(showErrorNotification(t("system")));
      }
    } catch (error) {
      console.error("Error refresh stream url:", error);
      dispatch(showErrorNotification(t("system")));
    }
  }, [dispatch, t]); // Bỏ dependency playerControl để tránh re-create function

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
    const {streamUrl} = playerControl;
    if (!streamUrl || !audioRef.current) return;

    const audio = audioRef.current;
    let tokenQueryString = "";
    try {
      tokenQueryString = new URL(streamUrl).search;
    } catch (e) {
    }

    const hlsConfig = {
      xhrSetup: (xhr: XMLHttpRequest, url: string) => {
        if (url.includes('.ts')) {
          xhr.open('GET', url.split('?')[0] + tokenQueryString, true);
        }
      }
    };

    let hls: Hls;

    const initHls = () => {
      if (Hls.isSupported()) {
        hls = new Hls(hlsConfig);
        hlsRef.current = hls;
        hls.loadSource(streamUrl);
        hls.attachMedia(audio);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // Resume logic: Chỉ resume nếu currentTimeRef > 0 (tức là refresh token/link)
          // Nếu là bài mới (loadTrack set current=0) thì nó sẽ chạy từ 0
          if (currentTimeRef.current > 0.5) {
            audio.currentTime = currentTimeRef.current;
          }
          audio.play().catch(e => console.warn("Autoplay blocked", e));
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            // Check 401/403 logic
            if (data.response?.code === 401 || data.response?.code === 403) {
              // Catch token expired and refresh URL
              handleTokenExpired();
            }
            if (data.fatal) {
              hls.startLoad();
            }
          }
        });
      } else if (audio.canPlayType("application/vnd.apple.mpegurl")) {
        audio.src = streamUrl;
        audio.play();
      }
    };

    initHls();

    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
    }
  }, [playerControl.streamUrl, handleTokenExpired]);


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
    setPlayerControl(prev => ({
      ...prev,
      trackId: track.trackId,
      bitrate: track.bitrate,
      current: 0, // Important: Reset current = 0 to HLS Effect know it's a new track
      duration: 0,
    }));

    const response = await streamApi.streamTrack(track.bitrate, track.trackId);
    if (response?.data?.url) {
      setPlayerControl(prev => ({
        ...prev,
        streamUrl: response.data.url,
        playing: true
      }));
    }
  }, []);

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
