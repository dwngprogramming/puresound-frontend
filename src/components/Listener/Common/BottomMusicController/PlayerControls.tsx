import {Dot, Repeat, Repeat1, Shuffle} from "lucide-react";
import {LoopMode} from "@/const/LoopMode";
import {Slider, Tooltip} from "@heroui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackwardStep, faForwardStep, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {formatDuration} from "@/utils/formatDuration";
import {useTranslations} from "next-intl";
import {usePlayerContext} from "@/context/player-control-context";

const PlayerControls = () => {
  const tPlayer = useTranslations("Components.MusicPlayer");
  const {
    playerControl,
    handleLoop,
    handleShuffle,
    handlePlayTrack,
    handleSeekTrack,
    handleSeekComplete,
    handleNextTrack
  } = usePlayerContext();
  
  return (
    <div className="absolute left-0 right-0 flex justify-center items-center">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-6">
          <Tooltip
            classNames={{content: "bg-gray-800 text-xs"}}
            content={
              <div className="flex flex-col items-center">
                <div
                  className="font-semibold mb-1">{playerControl.shuffle ? tPlayer("shuffleOff") : tPlayer("shuffleOn")}</div>
              </div>
            }
            delay={500}
            closeDelay={0}
            placement="top"
          >
            <div
              className={`relative cursor-pointer select-none ${playerControl.shuffle ?
                "text-blue-400 hover:text-blue-300 transform ease-in-out duration-300" :
                "text-gray-400 hover:text-white transform ease-in-out duration-300"}`}
              onClick={handleShuffle}
            >
              <Shuffle size={21}/>
              {playerControl.shuffle && <Dot className="absolute -bottom-4.5 -left-0.75"/>}
            </div>
          </Tooltip>
          
          <Tooltip
            classNames={{content: "bg-gray-800 text-xs"}}
            content={
              <div className="flex flex-col items-center">
                <div className="font-semibold mb-1">{tPlayer("previous")}</div>
              </div>
            }
            delay={500}
            closeDelay={0}
            placement="top"
          >
            <div className="select-none">
              <FontAwesomeIcon
                size="lg"
                icon={faBackwardStep}
                className="cursor-pointer text-gray-400 hover:text-white transform ease-in-out duration-300"
              />
            </div>
          </Tooltip>
          
          <Tooltip
            classNames={{content: "bg-gray-800 text-xs"}}
            content={
              <div className="flex flex-col items-center">
                <div className="font-semibold mb-1">{playerControl.playing ? tPlayer("pause") : tPlayer("play")}</div>
              </div>
            }
            delay={500}
            closeDelay={0}
            placement="top"
          >
            <div
              className={`cursor-pointer rounded-full px-2 py-2 hover:scale-105 transform ease-in-out duration-300 select-none ${playerControl.playing ? 'bg-blue-400' : 'bg-white'}`}
              onClick={handlePlayTrack}
            >
              {
                playerControl.playing ?
                  <FontAwesomeIcon
                    size="lg"
                    icon={faPause}
                    className="text-gray-200"
                  /> :
                  <FontAwesomeIcon
                    size="lg"
                    icon={faPlay}
                    className="text-black"
                  />
              }
            </div>
          </Tooltip>
          
          <Tooltip
            classNames={{content: "bg-gray-800 text-xs"}}
            content={
              <div className="flex flex-col items-center">
                <div className="font-semibold mb-1">{tPlayer("next")}</div>
              </div>
            }
            delay={500}
            closeDelay={0}
            placement="top"
          >
            <div
              className="select-none"
              onClick={handleNextTrack}
            >
              <FontAwesomeIcon
                size="lg"
                icon={faForwardStep}
                className="cursor-pointer text-gray-400 hover:text-white transform ease-in-out duration-300"
              />
            </div>
          </Tooltip>
          
          <Tooltip
            classNames={{content: "bg-gray-800 text-xs"}}
            content={
              <div className="flex flex-col items-center">
                <div className="font-semibold mb-1">
                  {
                    playerControl.loopMode === LoopMode.NONE ?
                      tPlayer("repeatAll") :
                      playerControl.loopMode === LoopMode.ALL ?
                        tPlayer("repeatOne") :
                        tPlayer("repeatOff")
                  }
                </div>
              </div>
            }
            delay={500}
            closeDelay={0}
            placement="top"
          >
            <div className="cursor-pointer select-none">
              {
                playerControl.loopMode === LoopMode.NONE ?
                  <Repeat
                    size={21}
                    className="text-gray-400 hover:text-white transform ease-in-out duration-300"
                    onClick={() => handleLoop(LoopMode.ALL)}
                  /> :
                  playerControl.loopMode === LoopMode.ALL ?
                    <div
                      className="relative text-blue-400 hover:text-blue-300 transform ease-in-out duration-300"
                      onClick={() => handleLoop(LoopMode.ONE)}
                    >
                      <Repeat size={21}/>
                      <Dot className="absolute -bottom-4.5 -left-0.5"/>
                    </div> :
                    <div
                      className="relative text-blue-400 hover:text-blue-300 transform ease-in-out duration-300"
                      onClick={() => handleLoop(LoopMode.NONE)}
                    >
                      <Repeat1 size={21}/>
                      <Dot className="absolute -bottom-4.5 -left-0.5"/>
                    </div>
              }
            </div>
          </Tooltip>
        </div>
        
        <div className="min-w-[400px]">
          <Slider
            classNames={{
              track: `group cursor-pointer border-x-5 m-0 h-[6px]
            data-[fill-start=true]:border-s-blue-400 hover:data-[fill-start=true]:border-s-blue-300
            data-[fill-end=true]:border-e-blue-400 hover:data-[fill-end=true]:border-e-blue-300`,
              filler: `bg-blue-400 group-hover:bg-blue-300 rounded-r-full group-data-[fill-end=true]:rounded-r-none`,
            }}
            aria-label="Playback progress"
            size="sm"
            value={Math.floor(playerControl.current)}
            minValue={0}
            maxValue={Math.floor(playerControl.duration)}
            onChange={(value) => handleSeekTrack(value as number)}
            onChangeEnd={(value) => handleSeekComplete(value as number)}
            startContent={<p className="text-xs text-gray-400 w-7.5">{formatDuration(playerControl.current)}</p>}
            endContent={<p className="text-xs text-gray-400 w-7.5">{formatDuration(playerControl.duration)}</p>}
            renderThumb={(props) => (
              <div
                {...props}
                className="top-1/2 w-3.5 h-3.5 rounded-full bg-white transition-opacity opacity-0 group-hover:opacity-100"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default PlayerControls;
