import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.Privacy');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const PrivacyPolicy = () => {
  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p>Your privacy is important to us. We only collect basic information to authenticate you with Google and do not share or sell your data.</p>
      <p>If you have questions, please contact us at dddhandicraft.contact@gmail.com.</p>
    </div>
  );
};

export default PrivacyPolicy;
