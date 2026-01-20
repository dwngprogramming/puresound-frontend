import React, {useMemo, useState} from "react";
import QueueOptionButton from "@/components/Listener/Common/RightContentLayout/QueueOptionButton";
import QueueTrack from "@/components/Listener/Common/RightContentLayout/QueueTrack";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {LoopMode} from "@/const/LoopMode";
import {toggleQueue} from "@/libs/redux/features/layout/layoutSlice";

const MusicQueue = () => {
  const {currentQueue, currentIndex, loopMode} = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();
  const [isScrollQueue, setIsScrollQueue] = useState(false);
  const currentTrack = currentQueue[currentIndex];
  
  // Memoize next up tracks calculation
  const nextUpTracks = useMemo(() => {
    if (currentQueue.length === 0) return [];
    
    if (loopMode === LoopMode.ALL) {
      const after = currentQueue.slice(currentIndex + 1);
      const before = currentQueue.slice(0, currentIndex);
      return [...after, ...before];
    }
    
    return currentQueue.slice(currentIndex + 1);
  }, [currentQueue, currentIndex, loopMode]);
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.scrollTop > 0) {
      setIsScrollQueue(true);
    } else {
      setIsScrollQueue(false);
    }
  }
  
  const handleCloseQueue = () => {
    dispatch(toggleQueue());
  }
  
  return (
    <div className="flex flex-col h-full mb-5">
      <div className="flex-none">
        <QueueOptionButton handleCloseQueue={handleCloseQueue}/>
        
        <div className="mt-4 mb-5">
          <p className="font-bold mb-2 ml-2">Now Playing</p>
          {currentTrack &&
              <QueueTrack
                  key={currentTrack.id}
                  track={currentTrack}
                  isActive
              />
          }
        </div>
      </div>
      
      <div className="relative flex-1 h-0 flex flex-col">
        <div className={`transition-shadow duration-300 ${isScrollQueue ? 'shadow-lg shadow-blue-900/40 z-10' : ''}`}>
          <p className="font-bold mb-2 ml-2">Next Up</p>
        </div>
        <div onScroll={handleScroll} className="flex-1 overflow-y-auto no-scrollbar">
          {nextUpTracks.length > 0 && nextUpTracks.map((track) => (
            <QueueTrack
              key={track.id}
              track={track}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicQueue;