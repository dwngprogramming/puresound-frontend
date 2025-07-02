import {getTranslations} from "next-intl/server";

const MainPage = async () => {
  const t = await getTranslations("Home");
  console.log(t("title"));
  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
}

export default MainPage;
