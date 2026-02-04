"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import PageLoader from "@/components/PageLoader";
import {useAppSelector} from "@/libs/redux/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const router = useRouter();
  const { token, isInitialized } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    if (isInitialized && !token) {
      router.replace('/login');
    }
  }, [isInitialized, token, router]);
  
  if (!isInitialized || (!token)) {
    return <PageLoader />;
  }
  
  return <>{children}</>;
};

export default AuthRoute;
