"use client";

import {tryRelogin} from "@/libs/auth/tryRelogin";
import {useEffect, useRef} from "react";
import {store} from "@/libs/redux/store";

const InitialLoadListener = () => {
  const token = store.getState().auth.token;
  const reloginTried = useRef(false);

  useEffect(() => {
    if (!token && !reloginTried.current) {
      reloginTried.current = true;

      const initialLoad = async () => {
        await tryRelogin();
      };
      initialLoad();
    }
  }, [token]);

  return null;
};

export default InitialLoadListener;
