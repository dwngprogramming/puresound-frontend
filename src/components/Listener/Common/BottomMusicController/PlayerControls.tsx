"use client"

import React from "react";
import {useTranslations} from "next-intl";
import {Tooltip} from "@heroui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackwardStep, faForwardStep, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {Dot, Repeat, Repeat1, Shuffle} from "lucide-react"; // Hoặc icon library bạn dùng
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {playNext, playPrev, setIsPlaying, toggleLoop, toggleShuffle} from "@/libs/redux/features/player/playerSlice";
import {LoopMode} from "@/const/LoopMode";
import PlayerProgressSlider from "@/components/Listener/Common/BottomMusicController/PlayerProgressSlider";

export const PlayerControls = () => {
  const tPlayer = useTranslations("Components.MusicPlayer");
  const dispatch = useAppDispatch();
  
  const { isShuffling, loopMode, isPlaying } = useAppSelector(state => state.player);
  
  const handleTogglePlay = () => {
    dispatch(setIsPlaying(!isPlaying));
  };
  
  const handleNext = () => {
    dispatch(playNext({ isListenerClick: true }));
  };
  
  const handlePrev = () => {
    dispatch(playPrev());
  };
  
  const handleShuffleClick = () => {
    dispatch(toggleShuffle());
  };
  
  const handleLoopClick = () => {
    dispatch(toggleLoop());
  };
  
  return (
    <div className="absolute left-0 right-0 flex justify-center items-center">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-6">
          {/* Shuffle Button */}
          <Tooltip
            content={<div className="font-semibold">{isShuffling ? tPlayer("shuffleOff") : tPlayer("shuffleOn")}</div>}
            delay={500} closeDelay={0} placement="top"
            classNames={{ content: "bg-gray-800 text-xs text-white" }}
          >
            <div
              className={`relative cursor-pointer select-none transition-colors duration-300 ${
                isShuffling ?
                  "text-blue-400 hover:text-blue-300" :
                  "text-gray-400 hover:text-white"
              }`}
              onClick={handleShuffleClick}
            >
              <Shuffle size={20} />
              {isShuffling && <Dot size={18} className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-blue-400" />}
            </div>
          </Tooltip>
          
          {/* Previous Button */}
          <Tooltip content={tPlayer("previous")} delay={500} closeDelay={0} placement="top" classNames={{ content: "bg-gray-800 text-xs text-white" }}>
            <div onClick={handlePrev} className="cursor-pointer text-gray-400 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faBackwardStep} size="lg" />
            </div>
          </Tooltip>
          
          {/* Play/Pause Button (Main) */}
          <Tooltip content={isPlaying ? tPlayer("pause") : tPlayer("play")} delay={500} closeDelay={0} placement="top" classNames={{ content: "bg-gray-800 text-xs text-white" }}>
            <div
              className={`cursor-pointer rounded-full p-3 hover:scale-105 transition-transform duration-200 flex items-center justify-center w-10 h-10 ${
                isPlaying ? 'bg-blue-400 text-white' : 'bg-white text-black'
              }`}
              onClick={handleTogglePlay}
            >
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="lg" />
            </div>
          </Tooltip>
          
          {/* Next Button */}
          <Tooltip content={tPlayer("next")} delay={500} closeDelay={0} placement="top" classNames={{ content: "bg-gray-800 text-xs text-white" }}>
            <div onClick={handleNext} className="cursor-pointer text-gray-400 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faForwardStep} size="lg" />
            </div>
          </Tooltip>
          
          {/* Loop Button */}
          <Tooltip
            content={
              <div className="font-semibold">
                {loopMode === LoopMode.NONE ? tPlayer("repeatAll") : loopMode === LoopMode.ALL ? tPlayer("repeatOne") : tPlayer("repeatOff")}
              </div>
            }
            delay={500} closeDelay={0} placement="top" classNames={{ content: "bg-gray-800 text-xs text-white" }}
          >
            <div
              className={`relative cursor-pointer select-none transition-colors duration-300 ${
                loopMode !== LoopMode.NONE ? "text-blue-400 hover:text-blue-300" : "text-gray-400 hover:text-white"
              }`}
              onClick={handleLoopClick}
            >
              {loopMode === LoopMode.ONE ? <Repeat1 size={20} /> : <Repeat size={20} />}
              {loopMode !== LoopMode.NONE && (
                <Dot size={18} className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-blue-400" />
              )}
            </div>
          </Tooltip>
        </div>
        
        {/* Progress Slider */}
        <PlayerProgressSlider/>
      </div>
    </div>
  );
};

export default PlayerControls;