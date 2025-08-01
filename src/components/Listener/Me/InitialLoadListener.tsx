"use client";

import {tryRelogin} from "@/libs/auth/tryRelogin";
import {useEffect, useRef} from "react";
import {store} from "@/libs/redux/store";

const InitialLoadListener = () => {
  const token = store.getState().auth.token;
  const reloginTried = useRef(false);

  if (!token) {
    reloginTried.current = true;
    useEffect(() => {
      const initialLoad = async () => {
        await tryRelogin();
      }
      initialLoad();
    }, []);
  }

  return null;
};

export default InitialLoadListener;
