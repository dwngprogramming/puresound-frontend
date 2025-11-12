'use client';

import NowPlayingTrack from "@/components/Listener/Common/BottomMusicController/NowPlayingTrack";
import PlayerControls from "@/components/Listener/Common/BottomMusicController/PlayerControls";
import PlayerOptions from "@/components/Listener/Common/BottomMusicController/PlayerOptions";
import {useState} from "react";
import {LoopMode} from "@/const/LoopMode";

export interface PlayerControl {
  loopMode: LoopMode
  shuffle: boolean
  playing: boolean
}

const BottomMusicController = () => {
  const [saved, setSaved] = useState(false);
  const [playerControl, setPlayerControl] = useState<PlayerControl>({
    loopMode: LoopMode.NONE,
    shuffle: false,
    playing: false,
  });

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

  const handlePlaying = () => {
    setPlayerControl(prev => ({
      ...prev,
      playing: !prev.playing,
    }));
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-22 bg-primary-700 z-50 flex items-center justify-between px-4">
      <NowPlayingTrack
        saved={saved}
        handleSaved={handleSaved}
      />
      <PlayerControls
        playerControl={playerControl}
        handleLoopMode={handleLoop}
        handleShuffle={handleShuffle}
        handlePlaying={handlePlaying}
      />
      <PlayerOptions/>
    </div>
  )
}

export default BottomMusicController;
