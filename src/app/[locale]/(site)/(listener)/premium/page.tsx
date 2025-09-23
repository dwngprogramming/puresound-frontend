import Subscription from "@/components/Listener/Subscription";
import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.Listener.premium');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const PremiumPage = () => {
  return (
    <>
      <Subscription/>
    </>
  )
}

export default PremiumPage;
