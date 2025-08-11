import SignUp from "@/components/Listener/SignUp";
import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.Listener.signup');

  return {
    title: t('title'),
    description: t('description'),
  };
}

const SignUpPage = () => {
  return (
    <div>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
