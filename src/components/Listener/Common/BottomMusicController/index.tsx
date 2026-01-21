'use client';

import NowPlayingTrack from "@/components/Listener/Common/BottomMusicController/NowPlayingTrack";
import PlayerControls from "@/components/Listener/Common/BottomMusicController/PlayerControls";
import PlayerOptions from "@/components/Listener/Common/BottomMusicController/PlayerOptions";
import {useEffect} from "react";
import {useAppDispatch} from "@/libs/redux/hooks";
import {setQueue} from "@/libs/redux/features/player/playerSlice";
import trackApi from "@/apis/main/metadata/track.api";

const BottomMusicController = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const setupQueue = async () => {
      // Giả sử ta có hàm fetchQueueTracks để lấy danh sách phát
      const response = await trackApi.getPopularTracks(1);
      const tracks = response.data.content;
      
      dispatch(setQueue({
        tracks: tracks
      }));
    };
    setupQueue();
  }, [dispatch]);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-22 bg-primary-700 z-50 flex items-center justify-between px-4">
      {/* Audio DOM is placed in Context Provider */}
      <NowPlayingTrack/>
      <PlayerControls/>
      <PlayerOptions/>
    </div>
  )
}

export default BottomMusicController;
