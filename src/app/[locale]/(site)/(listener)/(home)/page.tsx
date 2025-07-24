import {getTranslations} from "next-intl/server";
import type {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.Listener.home');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const MainPage = async () => {
  const t = await getTranslations("Listener.Home");
  console.log(t("title"));
  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
}

export default MainPage;
