'use client';

import NowPlayingTrack from "@/components/Listener/Common/BottomMusicController/NowPlayingTrack";
import PlayerControls from "@/components/Listener/Common/BottomMusicController/PlayerControls";
import PlayerOptions from "@/components/Listener/Common/BottomMusicController/PlayerOptions";
import {usePlayerControls} from "@/hooks/common/usePlayerControls";

const BottomMusicController = () => {
  const {
    saved,
    audioRef,
    playerControl,
    handleSaved,
    handleLoop,
    handleShuffle,
    handlePlayTrack
  } = usePlayerControls();

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
      />
      <PlayerOptions/>
    </div>
  )
}

export default BottomMusicController;
