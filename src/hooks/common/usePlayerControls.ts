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
}

export const usePlayerControls = () => {
  const t = useTranslations("Streaming.Error");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const dispatch = useAppDispatch();
  const [saved, setSaved] = useState(false);
  const [playerControl, setPlayerControl] = useState<PlayerControl>({
    streamUrl: "https://stream.puresound.space/192/01K8NFN35729A5PHCQ7FNYG8BH/m3u8?token_=exp=1763141470~hmac=bdc23183e9127b66ed20fbbc4927da4e195204a83aeef287c358b4a8a6912f69",
    trackId: "01K8NFN35729A5PHCQ7FNYG8BH",
    duration: 0,
    current: 0,
    bitrate: 192,
    loopMode: LoopMode.NONE,
    shuffle: false,
    playing: false
  });

  // TODO: Implement auto-refresh stream url before expired (10s) in future
  // useCallback to memoize the function, avoid non-need re-creating on each render
  const handleTokenExpired = useCallback(async () => {
    console.log("Refreshing stream url due to token expired...");
    if (!playerControl.trackId || playerControl.trackId.trim() === "") {
      console.error("No track id to refresh stream url!");
      dispatch(showErrorNotification(t("system")));
      return;
    }

    try {
      const response = await streamApi.streamTrack(playerControl.bitrate, playerControl.trackId);
      console.log(response);

      if (!response || !response.data.url) {
        console.error("Failed to refresh stream url!");
        dispatch(showErrorNotification(t("system")));
        return;
      }

      setPlayerControl(prev => ({
        ...prev,
        streamUrl: response.data.url,
      }));
    } catch (error) {
      console.error("Lỗi khi làm mới token:", error);
      dispatch(showErrorNotification(t("system")));
    }
  }, [playerControl.trackId, playerControl.bitrate, dispatch, t]);

  const handleLoadMetadata = useCallback(() => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      setPlayerControl(prev => ({
        ...prev,
        duration: duration,
      }));
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setPlayerControl(prev => ({
        ...prev,
        current: currentTime,
      }));
    }
  }, []);

  const handlePlay = useCallback(() => {
    console.log("Audio playback đã THỰC SỰ bắt đầu!");
    setPlayerControl(prev => ({...prev, playing: true}));
  }, []);

  const handlePause = useCallback(() => {
    setPlayerControl(prev => ({...prev, playing: false}));
  }, []);

  const handleEnded = useCallback(() => {
    setPlayerControl(prev => {
      switch (prev.loopMode) {
        case LoopMode.ONE:
          // Vẫn nên giữ check ở đây vì đây là một "hành động"
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
          break;
        case LoopMode.ALL:
          // TODO: Implement after add queue
          break;
        case LoopMode.NONE:
          // TODO: Implement after add queue
          break;
        default:
          // Do nothing
          break;
      }
      return {...prev, playing: false};
    });
  }, []);

  // Effect to setup HLS.js
  useEffect(() => {
    const {streamUrl, current} = playerControl;
    if (!streamUrl || !audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = 0.15; // Set âm lượng mặc định

    let tokenQueryString = "";
    try {
      const url = new URL(streamUrl);
      tokenQueryString = url.search;
    } catch (e) {
      console.error("Invalid stream URL", e);
      return;
    }

    const hlsConfig = {
      xhrSetup: (xhr: XMLHttpRequest, url: string) => {
        if (url.includes('.ts')) {
          const newUrl = url.split('?')[0] + tokenQueryString;
          xhr.open('GET', newUrl, true);
        }
      }
    };

    let hls: Hls;
    if (Hls.isSupported()) {
      hls = new Hls(hlsConfig);
      hlsRef.current = hls;

      hls.loadSource(streamUrl);
      hls.attachMedia(audio);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (current > 0) audio.currentTime = current;
        audio.play().catch(e => {
          if (e.name === 'NotAllowedError') console.warn(e);
          else console.error("Error when play audio:", e);
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal && data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          if (data.response && (data.response.code === 401 || data.response.code === 403)) {
            handleTokenExpired(); // Gọi handler khi link HLS hết hạn
          }
        }
      });
    } else if (audio.canPlayType("application/vnd.apple.mpegurl")) {
      audio.src = streamUrl;
      // ... (cũng nên thêm logic play/catch lỗi ở đây)
    }

    // Cleanup effect
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    }
  }, [playerControl.streamUrl, handleTokenExpired, dispatch, t]);

  useEffect(() => {
    const audio = audioRef.current;

    // "Master Guard Check"
    if (!audio) return;

    // Gán listeners
    audio.addEventListener('loadedmetadata', handleLoadMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // Cleanup listeners
    return () => {
      if (audio) {
        audio.removeEventListener('loadedmetadata', handleLoadMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
      }
    };
  }, [handleLoadMetadata, handleTimeUpdate, handlePlay, handlePause, handleEnded]);

  const handleSaved = () => {
    setSaved(saved => !saved);
  }

  const handleLoop = (mode: LoopMode) => {
    setPlayerControl(prev => ({
      ...prev,
      loopMode: mode,
    }));
  }

  const handleShuffle = () => {
    setPlayerControl(prev => ({
      ...prev,
      shuffle: !prev.shuffle,
    }));
  }

  const handlePlayTrack = () => {
    if (playerControl.playing) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    // State `playing` will update automatically by event listener 'play'/'pause' in useEffect
  };

  const loadTrack = useCallback(async (track: { trackId: string, bitrate: number }) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const response = await streamApi.streamTrack(track.bitrate, track.trackId);

    if (!response || !response.data.url) {
      console.error("Failed to load track stream url!");
      dispatch(showErrorNotification(t("system")));
      return;
    }

    setPlayerControl(prev => ({
      ...prev,
      trackId: track.trackId,
      streamUrl: response.data.url,
      bitrate: track.bitrate,
      current: 0,
      duration: 0,
      playing: true, // Auto play by `useEffect`
    }));
  }, [dispatch, t]);

  return {
    playerControl,
    audioRef,
    saved,
    handleSaved,
    handleLoop,
    handleShuffle,
    handlePlayTrack,
    loadTrack
  };
}
