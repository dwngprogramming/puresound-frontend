import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {Me} from "@/components/Listener/Me";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.Listener.me');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const MePage = () => {
  return (
    <div>
      <Me />
    </div>
  )
}

export default MePage;
