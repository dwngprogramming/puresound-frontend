import {AlbumType} from "@/const/metadata/AlbumType";
import {ApiResponse} from "@/models/ApiResponse";
import {SimplifiedAlbumResponse} from "@/models/metadata/album/SimplifiedAlbumResponse";
import {SimplifiedArtistResponse} from "@/models/metadata/artist/SimplifiedArtistResponse";
import {SimplifiedTrackResponse} from "@/models/metadata/track/SimplifiedTrackResponse";
import {SearchSuggestionResponse} from "@/models/search/SearchSuggestionResponse";

const createAlbumImage = (id: string, name: string) => ({
  id,
  name,
  imageOwnerType: 'ALBUM' as const,
  url: '/puresound-logo.svg',
  width: 320,
  height: 320,
});

const createArtistImage = (id: string, name: string) => ({
  id,
  name,
  imageOwnerType: 'ARTIST' as const,
  url: '/puresound-logo.svg',
  width: 320,
  height: 320,
});

const artists: SimplifiedArtistResponse[] = [
  {
    id: 'mock-artist-luna-hale',
    stageName: 'Luna Hale',
    images: [createArtistImage('mock-artist-image-luna-hale', 'Luna Hale portrait')],
  },
  {
    id: 'mock-artist-midnight-atlas',
    stageName: 'Midnight Atlas',
    images: [createArtistImage('mock-artist-image-midnight-atlas', 'Midnight Atlas portrait')],
  },
  {
    id: 'mock-artist-sora-kai',
    stageName: 'Sora Kai',
    images: [createArtistImage('mock-artist-image-sora-kai', 'Sora Kai portrait')],
  },
];

const albums: SimplifiedAlbumResponse[] = [
  {
    id: 'mock-album-velvet-sky',
    name: 'Velvet Sky Sessions',
    albumType: AlbumType.ALBUM,
    releaseDate: '2026-01-18',
    images: [createAlbumImage('mock-album-image-velvet-sky', 'Velvet Sky Sessions cover')],
    artists: [artists[0]],
  },
  {
    id: 'mock-album-neon-rain',
    name: 'Neon Rain',
    albumType: AlbumType.EP,
    releaseDate: '2025-11-04',
    images: [createAlbumImage('mock-album-image-neon-rain', 'Neon Rain cover')],
    artists: [artists[1]],
  },
  {
    id: 'mock-album-soft-static',
    name: 'Soft Static After Midnight',
    albumType: AlbumType.SINGLE,
    releaseDate: '2026-03-09',
    images: [createAlbumImage('mock-album-image-soft-static', 'Soft Static After Midnight cover')],
    artists: [artists[2]],
  },
];

export const searchSuggestionMockResponse: ApiResponse<SearchSuggestionResponse> = {
  code: '200',
  message: 'Mock search suggestions',
  data: {
    keyword: '',
    tracks: [
      {
        id: 'mock-track-golden-hour',
        title: 'Golden Hour Drive',
        explicit: false,
        artists: [artists[0]],
        album: albums[0],
      },
      {
        id: 'mock-track-night-currents',
        title: 'Night Currents',
        explicit: false,
        artists: [artists[1]],
        album: albums[1],
      },
      {
        id: 'mock-track-slow-bloom',
        title: 'Slow Bloom Reverie',
        explicit: false,
        artists: [artists[2], artists[0]],
        album: albums[2],
      },
    ],
    artists,
    albums,
  },
};
