import {Slider, Tooltip} from "@heroui/react";
import {Volume2, VolumeX} from "lucide-react";
import {useTranslations} from "next-intl";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setVolume, toggleMute} from "@/libs/redux/features/player/playerSlice";

const VolumeControl = () => {
  const tOption = useTranslations("Components.MusicOption");
  const {currentVolume, isMuted} = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();
  
  const handleVolumeChange = (value: number) => {
    dispatch(setVolume(value));
  }
  
  const handleToggleMute = () => {
    dispatch(toggleMute());
  };
  
  return (
    <div className="min-w-[130px] px-2">
      <Slider
        classNames={{
          track: `group cursor-pointer border-x-5 m-0 h-1
            data-[fill-start=true]:border-s-blue-400 hover:data-[fill-start=true]:border-s-blue-300
            data-[fill-end=true]:border-e-blue-400 hover:data-[fill-end=true]:border-e-blue-300`,
          trackWrapper: "gap-0",
          filler: `bg-blue-400 group-hover:bg-blue-300 rounded-r-full group-data-[fill-end=true]:rounded-r-none`,
        }}
        aria-label="Playback progress"
        size="sm"
        value={currentVolume}
        minValue={0}
        maxValue={100}
        onChange={(value) => handleVolumeChange(value as number)}
        startContent={
          isMuted ?
            <Tooltip
              classNames={{content: "bg-gray-800 text-xs"}}
              content={
                <div className="font-semibold mb-1">{tOption("unmute")}</div>
              }
              delay={500}
              closeDelay={0}
              placement="top"
            >
              <div
                className={`group py-1 pr-2 cursor-pointer`}
                onClick={handleToggleMute}
              >
                <VolumeX
                  size={21}
                  className={"text-gray-400 group-hover:scale-105 group-hover:text-white transition ease-in-out duration-300"}
                />
              </div>
            </Tooltip> :
            <Tooltip
              classNames={{content: "bg-gray-800 text-xs"}}
              content={
                <div className="font-semibold mb-1">{tOption("mute")}</div>
              }
              delay={500}
              closeDelay={0}
              placement="top"
            >
              <div
                className={`group py-1 pr-2 cursor-pointer`}
                onClick={handleToggleMute}
              >
                <Volume2
                  size={21}
                  className={"text-gray-400 group-hover:scale-105 group-hover:text-white transition ease-in-out duration-300"}
                />
              </div>
            </Tooltip>
        }
        renderThumb={(props) => (
          <div
            {...props}
            className="top-1/2 w-3.5 h-3.5 rounded-full bg-white transition-opacity opacity-0 group-hover:opacity-100"
          />
        )}
      />
    </div>
  )
}

export default VolumeControl;