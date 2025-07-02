import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {Login} from "@/components/Login";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.login');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const LoginPage = () => {
  return (
    <div>
      <Login />
    </div>
  )
}

export default LoginPage;
