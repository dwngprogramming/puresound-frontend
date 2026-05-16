import {AlbumResponse} from "@/models/metadata/album/AlbumResponse";
import React from "react";

interface AlbumDetailProps {
  album: AlbumResponse;
}

const AlbumDetail: React.FC<AlbumDetailProps> = ({album}) => {
  return (
    <div>
      <h1>Album Detail</h1>
    </div>
  );
}

export default AlbumDetail;