import {SimplifiedItemResponse} from "@/components/Listener/Common/MusicComponent/MediaSection";
import {SimplifiedTrackResponse} from "@/models/metadata/track/SimplifiedTrackResponse";
import {SimplifiedArtistResponse} from "@/models/metadata/artist/SimplifiedArtistResponse";
import TrackCard from "@/components/Listener/Common/MusicComponent/TrackCard";
import ArtistCard from "@/components/Listener/Common/MusicComponent/ArtistCard";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const MediaItemCard = ({item}: { item: SimplifiedItemResponse }) => {
  let content = null;
  
  if (!item) {
    return null;
  } else if ((item as SimplifiedTrackResponse).explicit !== undefined) {
    content = <TrackCard track={item as SimplifiedTrackResponse} />;
  } else if ((item as SimplifiedArtistResponse).stageName !== undefined) {
    content = <ArtistCard artist={item as SimplifiedArtistResponse} />;
  } else {
    // Trường hợp không khớp loại nào
    return null;
  }
  
  return (
    <div className="relative group">
      {content}
      <div className="absolute bottom-18 right-3 z-10">
        <button className="opacity-0 translate-y-2 cursor-pointer
            group-hover:opacity-100 group-hover:translate-y-0
            pointer-events-auto
            transition-all duration-300 ease-in-out
            p-3 rounded-full bg-blue-400 hover:scale-105 shadow-xl shadow-black/50">
          <FontAwesomeIcon
            size="lg"
            icon={faPlay}
            className="text-white"
          />
        </button>
      </div>
    </div>
  )
}

export default MediaItemCard;