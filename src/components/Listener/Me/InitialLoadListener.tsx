"use client";

import {tryRelogin} from "@/libs/auth/tryRelogin";
import {useEffect} from "react";

const InitialLoadListener = () => {
  useEffect(() => {
    const initialLoad = async () => {
      const refreshToken = localStorage.getItem('rt');

      if (refreshToken) {
        const success = await tryRelogin();
        if (!success) {
          localStorage.removeItem('rt');
        }
      }
    }
    initialLoad();
  }, []);

  return null;
};

export default InitialLoadListener;
