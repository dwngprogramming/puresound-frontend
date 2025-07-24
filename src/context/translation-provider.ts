"use client";

import {useTranslations} from "next-intl";
import {setTranslator} from "@/libs/singleton/translation";
import {useEffect} from "react";

export default function TranslationProvider() {
  const translator = useTranslations();

  useEffect(() => {
    setTranslator(translator);
  }, [translator]);

  return null;
}
