import ForgotPassword from "@/components/Listener/ForgetPassword";
import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.Listener.forgotPassword');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const ForgotPasswordPage = () => {
  return (
    <ForgotPassword/>
  );
}

export default ForgotPasswordPage;
