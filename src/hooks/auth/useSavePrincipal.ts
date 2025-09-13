import {useAppDispatch} from "@/libs/redux/hooks";
import {useCallback} from "react";
import {TokenResponse} from "@/models/auth/TokenResponse";
import {CustomJwtPayload} from "@/models/auth/CustomJwtPayload";
import {UserPrincipal} from "@/models/auth/UserPrincipal";
import {UserType} from "@/const/user/UserType";
import {setCredentials} from "@/libs/redux/features/auth/authSlice";
import {jwtDecode} from "jwt-decode";

export const useSavePrincipal = () => {
  const dispatch = useAppDispatch();

  return useCallback((response: TokenResponse) => {
    const accessToken = response.accessToken;
    const payload: CustomJwtPayload = jwtDecode(accessToken);

    const principal: UserPrincipal = {
      id: payload.sub,
      fullname: payload.fullname,
      userType: payload.userType as UserType,
      authorities: payload.authorities,
    };

    // Chỉ lưu vào Redux
    dispatch(setCredentials({
      principal: principal,
      token: accessToken
    }));

    return principal;
  }, [dispatch]);
}
