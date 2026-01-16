import React from "react";
import QueueOptionButton from "@/components/Listener/Common/RightContentLayout/QueueOptionButton";
import QueueTrack from "@/components/Listener/Common/RightContentLayout/QueueTrack";

const MusicQueue = () => {
  return (
    <div className="mb-5">
      <QueueOptionButton/>
      <div className="mb-5">
        <p className="font-bold mb-2">Now Playing</p>
        <QueueTrack/>
      </div>
      
      <div className="mb-4">
        <p className="font-bold mb-2">Next Up</p>
        <QueueTrack/>
        <QueueTrack/>
        <QueueTrack/>
      </div>
    </div>
  );
};

export default MusicQueue;