import {getTranslations} from "next-intl/server";
import type {Metadata} from "next";
import Home from "@/components/Listener/Home";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.Listener.home');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const MainPage = () => {
  return (
    <div>
      <Home />
    </div>
  );
}

export default MainPage;
