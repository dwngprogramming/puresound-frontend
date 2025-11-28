"use client"

import React, {createContext, useContext} from "react";
import {usePlayerControls} from "@/hooks/common/usePlayerControls";

type PlayerControlContextType = ReturnType<typeof usePlayerControls>

const PlayerControlContext = createContext<PlayerControlContextType | null>(null);

export const PlayerControlProvider = ({children}: { children: React.ReactNode }) => {
  const playerControls = usePlayerControls();

  return (
    <PlayerControlContext.Provider value={playerControls}>
      {children}
      <audio
        ref={playerControls.audioRef}
        className="hidden"
        preload="auto"
      />
    </PlayerControlContext.Provider>
  );
}

export const usePlayerContext = () => {
  const context = useContext(PlayerControlContext);
  if (!context) {
    throw new Error("usePlayerContext must be used within a PlayerControlProvider");
  }
  return context;
}