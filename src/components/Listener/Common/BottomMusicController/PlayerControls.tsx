import {Dot, Repeat, Repeat1, Shuffle} from "lucide-react";
import {LoopMode} from "@/const/LoopMode";
import {Slider} from "@heroui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackwardStep, faForwardStep, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {PlayerControl} from "@/hooks/common/usePlayerControls";
import {formatDuration} from "@/utils/formatDuration";

interface PlayerControlsProps {
  playerControl: PlayerControl
  handleLoopMode: (loopMode: LoopMode) => void
  handleShuffle: () => void
  handlePlayTrack: () => void
}

const PlayerControls = ({playerControl, handleLoopMode, handleShuffle, handlePlayTrack}: PlayerControlsProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center space-x-6">
        <div
          className={`relative cursor-pointer ${playerControl.shuffle ?
            "text-blue-400 hover:text-blue-300 transform ease-in-out duration-300" :
            "text-gray-400 hover:text-white transform ease-in-out duration-300"}`}
          onClick={handleShuffle}
        >
          <Shuffle size={18}/>
          {playerControl.shuffle && <Dot className="absolute -bottom-4.5 -left-0.75"/>}
        </div>
        <FontAwesomeIcon
          icon={faBackwardStep}
          className="cursor-pointer text-gray-400 hover:text-white transform ease-in-out duration-300"
        />
        <div
          className={`cursor-pointer rounded-full px-1.5 py-1 hover:scale-105 transform ease-in-out duration-300 ${playerControl.playing ? 'bg-blue-400' : 'bg-white'}`}
          onClick={handlePlayTrack}
        >
          {
            playerControl.playing ?
              <FontAwesomeIcon
                icon={faPause}
                className="text-gray-200"
              /> :
              <FontAwesomeIcon
                icon={faPlay}
                className="text-black"
              />
          }

        </div>
        <FontAwesomeIcon
          icon={faForwardStep}
          className="cursor-pointer text-gray-400 hover:text-white transform ease-in-out duration-300"
        />
        <div className="cursor-pointer">
          {
            playerControl.loopMode === LoopMode.NONE ?
              <Repeat
                size={18}
                className="text-gray-400 hover:text-white transform ease-in-out duration-300"
                onClick={() => handleLoopMode(LoopMode.ALL)}
              /> :
              playerControl.loopMode === LoopMode.ALL ?
                <div
                  className="relative text-blue-400 hover:text-blue-300 transform ease-in-out duration-300"
                  onClick={() => handleLoopMode(LoopMode.ONE)}
                >
                  <Repeat size={18}/>
                  <Dot className="absolute -bottom-4.5 -left-0.5"/>
                </div> :
                <div
                  className="relative text-blue-400 hover:text-blue-300 transform ease-in-out duration-300"
                  onClick={() => handleLoopMode(LoopMode.NONE)}
                >
                  <Repeat1 size={18}/>
                  <Dot className="absolute -bottom-4.5 -left-0.5"/>
                </div>
          }
        </div>
      </div>
      <div className="min-w-[400px]">
        <Slider
          classNames={{
            track: `group cursor-pointer border-x-5 m-0 h-[6px]
            data-[fill-start=true]:border-s-blue-400 hover:data-[fill-start=true]:border-s-blue-300 
            data-[fill-end=true]:border-e-blue-400 hover:data-[fill-end=true]:border-e-blue-300`,
            filler: "bg-blue-400 group-hover:bg-blue-300 rounded-r-full",
          }}
          aria-label="Playback progress"
          size="sm"
          value={playerControl.current}
          minValue={0}
          maxValue={playerControl.duration}
          onChangeEnd={(value) => console.log(`Value: ${value}`)}  // When end the slider change (mouse up)
          startContent={<p className="text-xs text-gray-400">{formatDuration(playerControl.current)}</p>}
          endContent={<p className="text-xs text-gray-400">{formatDuration(playerControl.duration)}</p>}
          renderThumb={(props) => (
            <div
              {...props}
              className="top-1/2 w-3.5 h-3.5 rounded-full bg-white transition-opacity opacity-0 group-hover:opacity-100"
            />
          )}
        />
      </div>
    </div>
  );
}

export default PlayerControls;
