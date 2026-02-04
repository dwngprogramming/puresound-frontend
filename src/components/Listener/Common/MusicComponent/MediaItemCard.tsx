import {SimplifiedItemResponse} from "@/components/Listener/Common/MusicComponent/MediaSection";
import {SimplifiedTrackResponse} from "@/models/metadata/track/SimplifiedTrackResponse";
import {SimplifiedArtistResponse} from "@/models/metadata/artist/SimplifiedArtistResponse";
import TrackCard from "@/components/Listener/Common/MusicComponent/TrackCard";
import ArtistCard from "@/components/Listener/Common/MusicComponent/ArtistCard";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppDispatch} from "@/libs/redux/hooks";
import {setQueue} from "@/libs/redux/features/player/playerSlice";
import {SimplifiedAlbumResponse} from "@/models/metadata/album/SimplifiedAlbumResponse";
import AlbumCard from "@/components/Listener/Common/MusicComponent/AlbumCard";

const MediaItemCard = ({item}: { item: SimplifiedItemResponse }) => {
  let content = null;
  let itemType: 'track' | 'artist' | 'album' | 'unknown' = 'unknown';
  const dispatch = useAppDispatch();
  
  const handlePlayClick = () => {
    if (itemType === 'track') {
      dispatch(setQueue({
        tracks: [item as SimplifiedTrackResponse],
      }));
    }
  }
  
  if (!item) {
    return null;
  } else if ((item as SimplifiedTrackResponse).explicit !== undefined) {
    content = <TrackCard track={item as SimplifiedTrackResponse} />;
    itemType = 'track';
  } else if ((item as SimplifiedArtistResponse).stageName !== undefined) {
    content = <ArtistCard artist={item as SimplifiedArtistResponse} />;
    itemType = 'artist';
  } else if ((item as SimplifiedAlbumResponse).albumType !== undefined) {
    content = <AlbumCard album={item as SimplifiedAlbumResponse} />;
    itemType = 'album';
  }
  else {
    // Trường hợp không khớp loại nào
    return null;
  }
  
  return (
    <div className="relative group">
      {content}
      <div className="absolute top-30 right-3 z-10">
        <button className="opacity-0 translate-y-2 cursor-pointer
            group-hover:opacity-100 group-hover:translate-y-0
            pointer-events-auto
            transition-all duration-300 ease-in-out
            p-3 rounded-full bg-blue-400 hover:scale-105 shadow-xl shadow-black/50">
          <FontAwesomeIcon
            size="lg"
            icon={faPlay}
            className="text-white"
            onClick={handlePlayClick}
          />
        </button>
      </div>
    </div>
  )
}

export default MediaItemCard;