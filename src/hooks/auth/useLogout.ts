import authApi from "@/apis/auth/auth.api";
import {deleteCredentials} from "@/libs/redux/features/auth/authSlice";
import {useAppDispatch} from "@/libs/redux/hooks";
import {useCallback} from "react";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  return useCallback(async () => {
    await authApi.logout();
    dispatch(deleteCredentials());
  }, []);
};

