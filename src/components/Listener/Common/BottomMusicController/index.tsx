'use client';

import NowPlayingTrack from "@/components/Listener/Common/BottomMusicController/NowPlayingTrack";
import PlayerControls from "@/components/Listener/Common/BottomMusicController/PlayerControls";
import PlayerOptions from "@/components/Listener/Common/BottomMusicController/PlayerOptions";
import {useEffect} from "react";
import {usePlayerContext} from "@/context/player-control-context";

const BottomMusicController = () => {
  const {loadTrack} = usePlayerContext();

  useEffect(() => {
    loadTrack({trackId: '01K8NFBYSAR65S5X2C4XT31J1N', bitrate: 192});
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-22 bg-primary-700 z-50 flex items-center justify-between px-4">
      {/* Audio DOM is placed in Context Provider */}
      <NowPlayingTrack/>
      <PlayerControls/>
      <PlayerOptions/>
    </div>
  )
}

export default BottomMusicController;
