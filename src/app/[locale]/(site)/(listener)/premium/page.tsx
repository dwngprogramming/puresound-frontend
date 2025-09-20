import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.Listener.subscription');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const SubscriptionPage = () => {
  return <div>Subscription Page</div>;
}

export default SubscriptionPage;
