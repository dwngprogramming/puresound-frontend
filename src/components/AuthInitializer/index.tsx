import React, {useEffect} from "react";
import {tryRelogin} from "@/libs/auth/tryRelogin";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {initializeAuth} from "@/libs/redux/features/auth/authSlice";

const AuthInitializer = ({children}: {children: React.ReactNode}) => {
  const dispatch = useAppDispatch();
  const {token, isInitialized} = useAppSelector(state => state.auth);
  
  // Initialize authentication state on mount (public or protected routes)
  useEffect(() => {
    if (isInitialized) return;
    
    const initAuth = async () => {
      try {
        if (!token) {
          await tryRelogin();
        }
      } finally {
        // Always mark auth as initialized
        dispatch(initializeAuth());
      }
    };
    initAuth();
  }, []);
  
  return <>{children}</>;
}

export default AuthInitializer;