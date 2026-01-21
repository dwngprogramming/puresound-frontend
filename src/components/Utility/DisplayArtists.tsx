import Link from "next/link";
import React from "react";
import {SimplifiedArtistResponse} from "@/models/metadata/artist/SimplifiedArtistResponse";

const DisplayArtists: React.FC<{ artists: SimplifiedArtistResponse[] }> = ({ artists = [] }) => {
  return (
    <div className="text-[13px] text-gray-400 leading-4 font-semibold truncate">
      {artists.map((artist, index) => (
        <>
          <Link
            key={artist.id}
            href="#"
            className="hover:underline"
          >
            {artist.stageName}
          </Link>
          {index < artists.length - 1 && ', '}
        </>
      ))}
    </div>
  )
};

export default DisplayArtists;