"use client";

import {useLocale, useTranslations} from "next-intl";
import {setLocale, setTranslator} from "@/libs/singleton/translation";
import {useEffect} from "react";

export default function I18nProvider() {
  const translator = useTranslations();
  const locale = useLocale();

  useEffect(() => {
    setTranslator(translator);
    setLocale(locale);
  }, [translator, locale]);

  return null;
}
