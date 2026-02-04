import {ListMusic, Maximize, MicVocal, MonitorSpeaker, Turntable} from "lucide-react";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import OptionButton from "@/components/Listener/Common/BottomMusicController/OptionButton";
import VolumeControl from "@/components/Listener/Common/BottomMusicController/VolumeControl";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {toggleQueue} from "@/libs/redux/features/layout/layoutSlice";

export interface PlayerOption {
  showNowPlaying: boolean;
  showLyrics: boolean
  showPlaylist: boolean
  showConnect: boolean
  showFullscreen: boolean
  mute: boolean
  volume: number
}

const PlayerOptions = () => {
  const tOption = useTranslations("Components.MusicOption");
  const dispatch = useAppDispatch();
  const {rightSidebar} = useAppSelector(state => state.layout);
  const [option, setOption] = useState<PlayerOption>({
    showNowPlaying: false,
    showLyrics: false,
    showPlaylist: false,
    showConnect: false,
    showFullscreen: false,
    mute: false,
    volume: 50,
  });
  
  useEffect(() => {
    setOption((prev) => ({
      ...prev,
      showPlaylist: rightSidebar.openQueue
    }));
  }, [rightSidebar.openQueue]);
  
  const supportButtons = {
    nowPlaying: false,
    lyrics: false,
    queue: true,
    connect: false,
    fullscreen: false,
  };
  
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex items-center z-10">
        <OptionButton
          icon={Turntable}
          label={tOption("nowPlayingView")}
          isEnabled={supportButtons.nowPlaying}
          size={21}
        />
        
        <OptionButton
          icon={MicVocal}
          label={tOption("lyrics")}
          isEnabled={supportButtons.lyrics}
          size={19}
        />
        
        <OptionButton
          icon={ListMusic}
          label={tOption("queue")}
          isEnabled={supportButtons.queue}
          isActive={option.showPlaylist}
          size={21}
          onClick={() => {
            dispatch(toggleQueue());
          }}
        />
        
        <OptionButton
          icon={MonitorSpeaker}
          label={tOption("connect")}
          isEnabled={supportButtons.connect}
          size={21}
        />
        
        <VolumeControl/>
        
        <OptionButton
          icon={Maximize}
          label={tOption("fullscreen")}
          isEnabled={supportButtons.fullscreen}
          size={19}
        />
      </div>
    </div>
  );
}

export default PlayerOptions;
