"use client";

import {useTranslations} from "next-intl";
import {useQuery} from "@tanstack/react-query";
import meApi from "@/apis/main/listener/me.api";

export const Me = () => {
  const t = useTranslations("Listener.Me");
  const { data: me, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: meApi.getMe,
  });

  return (
    <div>{t('me')}</div>
  )
}
