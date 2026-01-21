"use client"

import React, {createContext, useContext} from "react";
import {usePlayerControls} from "@/hooks/common/usePlayerControls";

interface PlayerContextType {
  currentTime: number;
  duration: number;
  seek: (time: number) => void;
}

const PlayerControlContext = createContext<PlayerContextType | null>(null);

export const PlayerControlProvider = ({children}: { children: React.ReactNode }) => {
  // 2. Gọi Hook "Driver" (Hook này đã kết nối Redux và HLS)
  const {
    audioRef,
    currentTime,
    duration,
    seek,
    handleTimeUpdate,
    handleEnded,
    handleNativePlayPause
  } = usePlayerControls();
  
  return (
    <PlayerControlContext.Provider value={{currentTime, duration, seek}}>
      {/* Quan trọng: Children được render ở đây.
        Khi currentTime thay đổi, chỉ những component nào dùng usePlayerContext()
        bên trong children mới bị re-render. Các component khác đứng yên.
      */}
      {children}
      
      {/* 3. Audio Element - Single Source of Truth cho âm thanh */}
      <audio
        ref={audioRef}
        className="hidden"
        preload="auto"
        // Gắn các event handlers từ Hook vào DOM
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPlay={handleNativePlayPause}
        onPause={handleNativePlayPause}
      />
    </PlayerControlContext.Provider>
  );
}

// 4. Hook để component con sử dụng (Thường là ProgressBar)
export const usePlayerContext = () => {
  const context = useContext(PlayerControlContext);
  if (!context) {
    throw new Error("usePlayerContext must be used within a PlayerControlProvider");
  }
  return context;
}