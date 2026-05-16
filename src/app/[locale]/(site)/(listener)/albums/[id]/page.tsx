import AlbumDetail from "@/components/Listener/AlbumDetail";
import {AlbumResponse} from "@/models/metadata/album/AlbumResponse";
import {ApiResponse} from "@/models/ApiResponse";
import {notFound} from "next/navigation";
import {getLocale, getTranslations} from "next-intl/server";
import {getReleaseYear} from "@/utils/getReleaseYear";
import {Metadata} from "next";
import {appLocale} from "@/const/appLocale";

export async function generateMetadata({params}: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const {id} = await params;
  const album = await getAlbum(id);
  const t = await getTranslations('Metadata.Listener.albumDetail');
  const locale = await getLocale();
  
  if (!album) notFound();
  const artistNames = album.artists.map(artist => artist.stageName).join(', ');
  
  const title = t('title', {albumName: album.name});
  const description = t('description', {
    albumName: album.name,
    albumType: album.albumType.toLowerCase(),
    artistNames: artistNames,
    albumReleaseYear: getReleaseYear(album.releaseDate),
    totalTracks: album.totalTracks,
    totalDuration: Math.floor(album.totalDurationMs / 60000),
  });
  const openGraph = {
    title: title,
    description: description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/albums/${id}`,
    siteName: 'PureSound',
    images: [
      {
        url: album.images[0].url,
        width: 320,
        height: 320,
        alt: t('imgAlt', {
          albumName: album.name,
          artistNames: artistNames
        }),
      },
    ],
    locale: appLocale[locale],
    type: 'music.album',
  }
  
  return {
    title,
    description,
    openGraph,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/albums/${id}`,
    }
  };
}

async function getAlbum(id: string): Promise<AlbumResponse | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/albums/${id}`, {
    next: {revalidate: 86400} // 24 hours,
  });
  if (response.status === 404) return null;
  
  const result: ApiResponse<AlbumResponse> = await response.json();
  return result.data;
}

export default async function AlbumDetailPage({params}: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  const album = await getAlbum(id);
  
  if (!album) notFound();
  
  return <AlbumDetail album={album}/>;
}