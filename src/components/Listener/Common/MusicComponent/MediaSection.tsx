import {useTranslations} from "next-intl";
import Link from "next/link";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useMediaHorizontalScroll} from "@/hooks/util/useMediaHorizontalScroll";
import MediaItemCard from "@/components/Listener/Common/MusicComponent/MediaItemCard";
import {SimplifiedTrackResponse} from "@/models/metadata/track/SimplifiedTrackResponse";
import {SimplifiedArtistResponse} from "@/models/metadata/artist/SimplifiedArtistResponse";
import {SimplifiedAlbumResponse} from "@/models/metadata/album/SimplifiedAlbumResponse";

export type SimplifiedItemResponse = SimplifiedTrackResponse | SimplifiedArtistResponse | SimplifiedAlbumResponse;

interface MediaSectionInfo {
  title: string;
  numOfItems: number;
  items: SimplifiedItemResponse[];
}

const MediaSection = <T, >({title, numOfItems, items}: MediaSectionInfo) => {
  const t = useTranslations('Listener.Home.media');
  const {
    scrollRef,
    showLeft,
    showRight,
    scrollLeft,
    scrollRight
  } = useMediaHorizontalScroll([items]);
  
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3>{title}</h3>
        <Link href="#" className="text-sm text-gray-400 hover:underline mr-4">
          {t('seeMore')}
        </Link>
      </div>
      <div className="relative">
        {showLeft && (
          <div
            className="absolute left-0 top-0 z-100 w-25 h-full bg-gradient-to-r from-blue-900/40 to-transparent flex items-center justify-start">
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
          {items?.slice(0, numOfItems).map((item: SimplifiedItemResponse) => (
            <MediaItemCard key={item.id} item={item}/>
          ))}
        </div>
        
        {showRight && (
          <div
            className="absolute right-0 top-0 z-100 w-25 h-full bg-gradient-to-r from-transparent to-blue-900/50 flex items-center justify-end">
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