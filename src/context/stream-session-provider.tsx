"use client";

import {useEffect} from "react";
import streamApi from "@/apis/main/stream/stream.api";

// Init default stream sesssion when app start
export default function StreamSessionProvider() {
  useEffect(() => {
    const createOrVerifyStreamSession = async () => {
      await streamApi.verifyOrCreateSession();
    }

    createOrVerifyStreamSession()
  }, []);

  return null;
}
