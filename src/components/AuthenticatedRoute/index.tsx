"use client";

import React, {useEffect, useState} from "react";
import {store} from "@/libs/redux/store";
import {useAutoRelogin} from "@/hooks/auth/useAutoRelogin";
import {usePathname, useRouter} from "next/navigation";
import PageLoader from "@/components/PageLoader";
import {tryRelogin} from "@/libs/auth/tryRelogin";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const AuthenticatedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const {relogin} = useAutoRelogin();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = store.getState().auth.token;

      if (!token) {
        setIsVerifying(true);
        try {
          // Relogin (dùng tryRelogin, không dùng hook useAutoRelogin)
          const success = await tryRelogin();

          if (!success) {
            // Nếu thất bại, chuyển hướng sang login
            router.replace(`/login`);
            return;
          }
        } finally {
          setIsVerifying(false);
        }
      }
    };

    verifyAuth();
  }, [pathname, router, relogin]);

  if (isVerifying) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;
