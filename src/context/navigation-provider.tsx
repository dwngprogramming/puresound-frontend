"use client";

import {useRouter} from "next/navigation";
import {setRouter} from "@/libs/singleton/navigation";
import {useEffect} from "react";

export default function NavigationProvider() {
  const navigation = useRouter();

  // Set navigation router for navigation.ts (singleton)
  useEffect(() => {
    setRouter(navigation);
  }, [navigation]);

  return null;
}
