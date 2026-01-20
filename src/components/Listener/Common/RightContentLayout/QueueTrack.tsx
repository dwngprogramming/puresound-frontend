import {Ellipsis} from "lucide-react";
import {SimplifiedTrackResponse} from "@/models/metadata/track/SimplifiedTrackResponse";
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {playSelectedTrackInQueue, setIsPlaying} from "@/libs/redux/features/player/playerSlice";
import DisplayArtists from "@/components/Utility/DisplayArtists";

const QueueTrack = ({track, isActive = false}: { track: SimplifiedTrackResponse, isActive?: boolean }) => {
  const {isPlaying, currentQueue, currentIndex, } = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();
  const currentTrack = currentQueue[currentIndex];
  const isCurrentPlaying = isActive && isPlaying && track.id === currentTrack?.id;
  
  const handlePlayPauseClick = () => {
    if (isCurrentPlaying) {
      dispatch(setIsPlaying(false));
      return;
    }
    
    dispatch(playSelectedTrackInQueue(track.id));
  }
  
  return (
    <div className="group p-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg">
      <div className="relative w-11 h-11">
        <img
          width={44}
          height={44}
          src={track.album.images[0].url}
          alt={track.title}
          className="rounded-lg"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/60 bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-lg cursor-pointer">
          <button onClick={handlePlayPauseClick} className="cursor-pointer">
            <FontAwesomeIcon icon={isCurrentPlaying ? faPause: faPlay} size="1x" />
          </button>
        </span>
      </div>
      
      <div className="flex flex-1 items-center justify-between min-w-0">
        <div className="flex flex-col space-y-1 justify-center min-w-0 flex-1">
          <p className={`${isActive && 'text-blue-400'} font-bold text-sm truncate cursor-pointer hover:underline`}>
            {track.title}
          </p>
          <DisplayArtists artists={track.artists}/>
        </div>
        <Ellipsis size={22}
                  className="relative cursor-pointer text-gray-300 hover:text-gray-100 hover:scale-105 flex-shrink-0 ml-2"/>
      </div>
    </div>
  );
}


export default QueueTrack;