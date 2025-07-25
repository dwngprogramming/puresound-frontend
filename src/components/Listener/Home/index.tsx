"use client";

import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";

const Home = () => {
  const t = useTranslations("Listener.Home");
  const router = useRouter();

  return (
    <div>
      <h1>{t('title')}</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push('/me')}>Go to Me page</button>
    </div>
  );
}

export default Home
