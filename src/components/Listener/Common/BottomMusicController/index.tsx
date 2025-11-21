'use client';

import NowPlayingTrack from "@/components/Listener/Common/BottomMusicController/NowPlayingTrack";
import PlayerControls from "@/components/Listener/Common/BottomMusicController/PlayerControls";
import PlayerOptions from "@/components/Listener/Common/BottomMusicController/PlayerOptions";
import {usePlayerControls} from "@/hooks/common/usePlayerControls";
import {useEffect} from "react";

const BottomMusicController = () => {
  const {
    saved,
    audioRef,
    playerControl,
    handleSaved,
    handleLoop,
    handleShuffle,
    handlePlayTrack,
    handleSeekTrack,
    handleSeekComplete,
    loadTrack
  } = usePlayerControls();

  useEffect(() => {
    loadTrack({trackId: '01K8NFBYSAR65S5X2C4XT31J1N', bitrate: 192});
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-22 bg-primary-700 z-50 flex items-center justify-between px-4">
      <audio ref={audioRef}/>
      <NowPlayingTrack
        saved={saved}
        handleSaved={handleSaved}
      />
      <PlayerControls
        playerControl={playerControl}
        handleLoopMode={handleLoop}
        handleShuffle={handleShuffle}
        handlePlayTrack={handlePlayTrack}
        handleSeekTrack={handleSeekTrack}
        handleSeekComplete={handleSeekComplete}
      />
      <PlayerOptions/>
    </div>
  )
}

export default BottomMusicController;
