import AuthFailure from "@/components/Listener/AuthFailure";
import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.Listener.authFailure');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const AuthFailurePage = () => {
  return (
    <AuthFailure />
  );
}

export default AuthFailurePage;
