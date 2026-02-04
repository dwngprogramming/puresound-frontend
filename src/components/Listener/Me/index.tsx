"use client";

import {useTranslations} from "next-intl";
import {useQuery} from "@tanstack/react-query";
import meApi from "@/apis/main/listener/me.api";

export const Me = () => {
  const t = useTranslations("Listener.Me");
  const { data: me, isLoading } = useQuery<string>({
    queryKey: ["me"],
    queryFn: async () => {
      return await meApi.getMe();
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <div>{t(me ?? "unknown")}</div>
  )
}
