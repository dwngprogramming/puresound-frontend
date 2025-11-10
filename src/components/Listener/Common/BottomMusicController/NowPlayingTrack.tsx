import {Check, Plus} from "lucide-react";
import {Image} from "@heroui/react";
import {useUserInfo} from "@/hooks/user/useUserInfo";

const NowPlayingTrack = () => {
  const {isPremium} = useUserInfo();

  return (
    <div className="flex items-center space-x-4">
      <Image
        isBlurred={isPremium}
        alt="Track Artwork"
        src="https://i.scdn.co/image/ab67616d00001e02e9ba8c0c593400e0ed676089"
        width={54}
        className="rounded-lg"
      />
      <div>
        <a className="text-white font-semibold text-sm cursor-pointer hover:underline">Track Title</a>
        <div className="text-gray-400 cursor-pointer text-[12px] hover:text-white hover:underline">Artist Name</div>
      </div>
      <div>
        <button className="text-black bg-blue-500 font-bold hover:bg-blue-400 border-2 border-blue-500 hover:border-blue-400
        hover:scale-105 cursor-pointer rounded-full p-0.25 transform ease-in-out duration-300">
          <Check size={12}/>
        </button>
        <button className="text-gray-400 font-bold hover:text-white border-2 border-gray-400 hover:border-white
        hover:scale-105 cursor-pointer rounded-full p-0.25 transform ease-in-out duration-300">
          <Plus size={12}/>
        </button>
      </div>
    </div>
  );
}

export default NowPlayingTrack;
