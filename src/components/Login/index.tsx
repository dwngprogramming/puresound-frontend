"use client";

import {useTranslations} from "next-intl";

export const Login = () => {
  const t = useTranslations("Login");

  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
};
