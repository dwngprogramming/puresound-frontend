import {Disc3} from "lucide-react";
import {useTranslations} from "next-intl";
import {SearchSuggestionResponse} from "@/models/search/SearchSuggestionResponse";
import {SimplifiedAlbumResponse} from "@/models/metadata/album/SimplifiedAlbumResponse";
import {SimplifiedArtistResponse} from "@/models/metadata/artist/SimplifiedArtistResponse";
import {SimplifiedTrackResponse} from "@/models/metadata/track/SimplifiedTrackResponse";
import SearchSuggestionSkeleton from "@/components/Listener/Common/Header/SearchSuggestionSkeleton";

type SuggestionType = 'track' | 'artist' | 'album';

interface SearchSuggestionDropdownProps {
  suggestions: SearchSuggestionResponse;
  isLoading: boolean;
  onSelect: (value: string) => void;
}

interface SuggestionRowInfo {
  id: string;
  type: SuggestionType;
  title: string;
  artistNames: string;
  typeLabel: string;
  imageUrl?: string;
}

const getArtistNames = (artists: SimplifiedArtistResponse[]) =>
  artists.map((artist) => artist.stageName).join(', ');

const mapTrackSuggestion = (track: SimplifiedTrackResponse, typeLabel: string): SuggestionRowInfo => ({
  id: track.id,
  type: 'track',
  title: track.title,
  artistNames: getArtistNames(track.artists),
  typeLabel,
  imageUrl: track.album.images[0]?.url,
});

const mapArtistSuggestion = (artist: SimplifiedArtistResponse, typeLabel: string): SuggestionRowInfo => ({
  id: artist.id,
  type: 'artist',
  title: artist.stageName,
  artistNames: artist.stageName,
  typeLabel,
  imageUrl: artist.images[0]?.url,
});

const mapAlbumSuggestion = (album: SimplifiedAlbumResponse, typeLabel: string): SuggestionRowInfo => ({
  id: album.id,
  type: 'album',
  title: album.name,
  artistNames: getArtistNames(album.artists),
  typeLabel,
  imageUrl: album.images[0]?.url,
});

const getSuggestionSubtitle = (item: SuggestionRowInfo) =>
  item.type === 'artist' ? item.typeLabel : `${item.typeLabel} \u00B7 ${item.artistNames}`;

const SearchSuggestionDropdown = ({suggestions, isLoading, onSelect}: SearchSuggestionDropdownProps) => {
  const t = useTranslations('Listener.Common');
  const items: SuggestionRowInfo[] = [
    ...suggestions.tracks.map((track) => mapTrackSuggestion(track, t('song'))),
    ...suggestions.artists.map((artist) => mapArtistSuggestion(artist, t('artist'))),
    ...suggestions.albums.map((album) => mapAlbumSuggestion(album, t('album'))),
  ];
  
  if (isLoading) {
    return <SearchSuggestionSkeleton/>;
  }
  
  if (items.length === 0) {
    return (
      <div className="flex h-28 flex-col items-center justify-center gap-2 px-4 text-center text-sm text-neutral-400">
        <Disc3 size={24} className="text-neutral-500"/>
        <p>{t('searchNoSuggestions')}</p>
      </div>
    );
  }
  
  return (
    <div className="max-h-[min(60vh,28rem)] overflow-y-auto overscroll-contain p-2">
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="grid w-full grid-cols-[2.75rem_1fr] items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-neutral-700/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onSelect(item.title)}
          >
            <img
              src={item.imageUrl || '/puresound-logo.svg'}
              alt={item.title}
              className={`h-11 w-11 object-cover ${item.type === 'artist' ? 'rounded-full' : 'rounded-md'}`}
            />
            
            <span className="flex min-w-0 flex-col gap-1">
              <span className="block truncate text-sm font-semibold text-neutral-100">
                {item.title}
              </span>
              <span className="block truncate text-xs text-neutral-400">
                {getSuggestionSubtitle(item)}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchSuggestionDropdown;
