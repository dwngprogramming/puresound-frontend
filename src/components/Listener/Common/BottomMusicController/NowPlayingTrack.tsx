import {Check, Plus} from "lucide-react";
import {Image} from "@heroui/react";
import {useUserInfo} from "@/hooks/user/useUserInfo";
import React, {useState} from "react";
import {useAppSelector} from "@/libs/redux/hooks";
import DisplayArtists from "@/components/Utility/DisplayArtists";

const NowPlayingTrack = () => {
  const {isPremium} = useUserInfo();
  const [saved, setSaved] = useState<boolean>(false);
  const {currentQueue, currentIndex} = useAppSelector(state => state.player);
  const currentTrack = currentQueue[currentIndex];
  
  const handleSaved = () => {
    setSaved(!saved);
  };
  
  return (
    <div className="flex items-center space-x-4 z-10">
      <Image
        isBlurred={isPremium}
        alt={currentTrack?.title || 'Track Image'}
        src={currentTrack?.album.images[0].url || ''}
        height={60}
        width={60}
        className="rounded-lg"
      />
      <div>
        <a className="text-white font-semibold text-sm cursor-pointer hover:underline">{currentTrack?.title}</a>
        <DisplayArtists artists={currentTrack?.artists}/>
      </div>
      <div>
        {
          saved ? (
            <button
              className="text-black bg-blue-400 font-bold hover:bg-blue-300 border-2 border-blue-400 hover:border-blue-300
        hover:scale-105 cursor-pointer rounded-full p-0.25 transform ease-in-out duration-300"
              onClick={handleSaved}
            >
              <Check size={12}/>
            </button>
          ) : (
            <button
              className="text-gray-400 font-bold hover:text-white border-2 border-gray-400 hover:border-white
        hover:scale-105 cursor-pointer rounded-full p-0.25 transform ease-in-out duration-300"
              onClick={handleSaved}
            >
              <Plus size={12}/>
            </button>
          )
        }
      </div>
    </div>
  );
}

export default NowPlayingTrack;
