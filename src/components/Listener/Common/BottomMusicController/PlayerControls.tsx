import {Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward} from "lucide-react";
import {LoopMode} from "@/const/LoopMode";
import {PlayerControl} from "@/components/Listener/Common/BottomMusicController/index";

interface PlayerControlsProps {
  playerControl: PlayerControl
  handleLoopMode: (loopMode: LoopMode) => void
  handleShuffle: () => void
  handlePlaying: () => void
}

const PlayerControls = ({playerControl, handleLoopMode, handleShuffle, handlePlaying}: PlayerControlsProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-8">
        <Shuffle
          size={20}
          className={`cursor-pointer ${playerControl.shuffle ?
            "text-blue-400 hover:text-blue-300 transform ease-in-out duration-300" :
            "text-gray-400 hover:text-white transform ease-in-out duration-300"}`}
          onClick={handleShuffle}
        />
        <SkipBack size={20}
                  className="cursor-pointer text-gray-400 hover:text-white transform ease-in-out duration-300"
        />
        <div
          className={`cursor-pointer rounded-full p-2 hover:scale-105 transform ease-in-out duration-300 ${playerControl.playing ? 'bg-blue-400' : 'bg-white'}`}
          onClick={handlePlaying}
        >
          {
            playerControl.playing ?
              <Pause
                size={20}
                className="text-neutral-800"
              /> :
              <Play
                size={20}
                className="text-black"
              />
          }

        </div>
        <SkipForward size={20}
                     className="cursor-pointer text-gray-400 hover:text-white transform ease-in-out duration-300"/>
        <div className="cursor-pointer">
          {
            playerControl.loopMode === LoopMode.NONE ?
              <Repeat
                size={20}
                className="text-gray-400 hover:text-white transform ease-in-out duration-300"
                onClick={() => handleLoopMode(LoopMode.ALL)}
              /> :
              playerControl.loopMode === LoopMode.ALL ?
                <Repeat
                  size={20}
                  className="text-blue-400 hover:text-blue-300 transform ease-in-out duration-300"
                  onClick={() => handleLoopMode(LoopMode.ONE)}
                /> :
                <Repeat1
                  size={20}
                  className="text-blue-400 hover:text-blue-300  transform ease-in-out duration-300"
                  onClick={() => handleLoopMode(LoopMode.NONE)}
                />
          }
        </div>
      </div>
    </div>
  );
}

export default PlayerControls;
