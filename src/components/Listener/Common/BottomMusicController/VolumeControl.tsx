import {Slider, Tooltip} from "@heroui/react";
import {Volume2, VolumeX} from "lucide-react";
import {usePlayerContext} from "@/context/player-control-context";
import {useTranslations} from "next-intl";

const VolumeControl = () => {
  const tOption = useTranslations("Components.MusicOption");
  const {
    playerControl,
    handleVolume,
    handleMuted
  } = usePlayerContext();
  
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
        value={playerControl.volume}
        minValue={0}
        maxValue={100}
        onChange={(value) => handleVolume(value as number)}
        startContent={
          playerControl.isMuted ?
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
                onClick={() => handleMuted(false)}
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
                onClick={() => handleMuted(true)}
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