"use client";

import {useEffect, useRef} from "react";
import {store} from "@/libs/redux/store";
import {useAutoRelogin} from "@/hooks/auth/useAutoRelogin";

const InitialLoadListener = () => {
  const token = store.getState().auth.token;
  const reloginTried = useRef(false);
  const {relogin} = useAutoRelogin();

  useEffect(() => {
    if (!token && !reloginTried.current) {
      reloginTried.current = true;

      const initialLoad = async () => {
        await relogin();
      };
      initialLoad();
    }
  }, [token]);

  return null;
};

export default InitialLoadListener;
