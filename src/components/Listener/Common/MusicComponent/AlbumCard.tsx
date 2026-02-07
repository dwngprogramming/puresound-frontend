import {Image} from "@heroui/react";
import Link from "next/link";
import {SimplifiedAlbumResponse} from "@/models/metadata/album/SimplifiedAlbumResponse";
import {AlbumType} from "@/const/metadata/AlbumType";

interface AlbumCardProps {
  album: SimplifiedAlbumResponse;
}

const AlbumCard = ({album}: AlbumCardProps) => {
  return (
    <div
      className="w-28 md:w-48 p-3 flex flex-col shrink-0 justify-start items-start space-y-2 hover:bg-gray-800 rounded-lg cursor-pointer">
      <Image
        src={album.images[0].url}
        alt={album.name}
        className="rounded-lg"
      />
      <div className="flex w-full flex-col justify-start items-start space-y-0.5">
        <div className="flex w-full justify-between items-baseline gap-2">
          <Link
            href="#"
            className="font-bold line-clamp-2 hover:underline flex-1"
          >
            {album.name}
          </Link>
          <p className="text-[13px] text-neutral-400 leading-4 whitespace-nowrap shrink-0">
            {AlbumType[album.albumType as keyof typeof AlbumType]}
          </p>
        </div>
        <div className="line-clamp-2">
          {album.artists.map((artist) => (
            <Link
              key={artist.id}
              href="#"
              // after:content-[','] add comma after each artist
              // last:after:content-[''] remove comma after last artist
              className="text-[13px] text-gray-400 leading-4 font-semibold hover:underline after:content-[','] last:after:content-[''] after:mr-1"
            >
              {artist.stageName}
            </Link>
          ))}
        </div>
      
      </div>
    </div>
  );
}

export default AlbumCard;