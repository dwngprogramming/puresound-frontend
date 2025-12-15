import {SimplifiedArtistResponse} from "@/models/metadata/artist/SimplifiedArtistResponse";
import {Image} from "@heroui/react";
import Link from "next/link";
import {useTranslations} from "next-intl";

const ArtistCard = ({artist}: { artist: SimplifiedArtistResponse }) => {
  const t = useTranslations("Listener.Common");
  return (
    <div
      className="w-28 lg:w-48 p-3 flex flex-col shrink-0 justify-start items-start space-y-2 hover:bg-gray-800 rounded-lg cursor-pointer">
      <Image
        src={`https://i.scdn.co/image/ab67616d00001e024b56a34b0c2b3798fd46f855`}
        alt={artist.stageName}
        className="rounded-full"
      />
      <div className="flex flex-col justify-start items-start space-y-0.5">
        <Link href="#" className="font-bold line-clamp-2 hover:underline">{artist.stageName}</Link>
        <div className="line-clamp-2">
          <a href="#" className="text-[13px] text-gray-400 cursor-default pointer-events-none font-semibold">{t('artist')}</a>
        </div>
      </div>
    </div>
  );
}

export default ArtistCard;