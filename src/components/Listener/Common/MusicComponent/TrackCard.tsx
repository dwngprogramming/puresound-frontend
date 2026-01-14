import {SimplifiedTrackResponse} from "@/models/metadata/track/SimplifiedTrackResponse";
import {Image} from "@heroui/react";
import Link from "next/link";

interface TrackCardProps {
  track: SimplifiedTrackResponse;
}

const TrackCard = ({track}: TrackCardProps) => {
  return (
    <div
      className="w-28 md:w-48 p-3 flex flex-col shrink-0 justify-start items-start space-y-2 hover:bg-gray-800 rounded-lg cursor-pointer">
      <Image
        src={track.album.images[0].url}
        alt={track.title}
        className="rounded-lg"
      />
      <div className="flex flex-col justify-start items-start space-y-0.5">
        <Link href="#" className="font-bold line-clamp-2 hover:underline">{track.title}</Link>
        <div className="line-clamp-2">
          {track.artists.map((artist) => (
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

export default TrackCard;