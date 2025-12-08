import {useTranslations} from "next-intl";
import Link from "next/link";
import MediaCard from "@/components/Listener/Common/MusicComponent/MediaCard";
import {SimplifiedTrackResponse} from "@/models/metadata/track/SimplifiedTrackResponse";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useMediaHorizontalScroll} from "@/hooks/util/useMediaHorizontalScroll";
import {usePopularTracks} from "@/hooks/metadata/useTrackMetadata";

interface SectionInfo {
  title: string;
  numOfItems: number;
}

const MediaSection = ({title, numOfItems}: SectionInfo) => {
  const t = useTranslations('Listener.Home.media');
  const {data: tracks, isLoading} = usePopularTracks();
  const {
    scrollRef,
    showLeft,
    showRight,
    scrollLeft,
    scrollRight
  } = useMediaHorizontalScroll([tracks]);
  
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3>{title}</h3>
        <Link href="#" className="text-sm text-gray-400 hover:underline">
          {t('seeMore')}
        </Link>
      </div>
      <div className="relative">
        {showLeft && (
          <div
            className="absolute left-0 top-0 z-100 w-30 h-full bg-gradient-to-r from-blue-900/20 to-transparent flex items-center justify-start">
            <button
              className="rounded-full p-1 ml-3 transition ease-in-out duration-300 bg-blue-900/90 hover:bg-neutral-500 cursor-pointer"
              onClick={scrollLeft}
            >
              <ChevronLeft size={24}/>
            </button>
          </div>
        )}
        
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth"
        >
          {tracks?.slice(0, numOfItems).map((track: SimplifiedTrackResponse) => (
            <MediaCard
              key={track.id}
              track={track}
            />
          ))}
        </div>
        
        {showRight && (
          <div
            className="absolute right-0 top-0 z-100 w-30 h-full bg-gradient-to-r from-transparent to-blue-900/20 flex items-center justify-end">
            <button
              className="rounded-full p-1 mr-3 transition ease-in-out duration-300 bg-blue-900/90 hover:bg-neutral-500 cursor-pointer"
              onClick={scrollRight}
            >
              <ChevronRight size={24}/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaSection;