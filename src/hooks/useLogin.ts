import {useMutation} from "@tanstack/react-query";
import {LoginRequest} from "@/models/auth/LoginRequest";
import authApi from "@/apis/auth/auth.api";
import {ApiResponse} from "@/models/ApiResponse";
import {TokenResponse} from "@/models/auth/TokenResponse";
import {CustomJwtPayload} from "@/models/auth/CustomJwtPayload";
import {jwtDecode} from "jwt-decode";
import {UserPrincipal} from "@/models/auth/UserPrincipal";
import {setCredentials} from "@/libs/redux/features/auth/authSlice";
import {useAppDispatch} from "@/libs/redux/hooks";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response: ApiResponse<TokenResponse>) => {
      const accessToken = response.data.accessToken;
      const payload: CustomJwtPayload = jwtDecode(accessToken);
      const principal: UserPrincipal = {
        id: payload.sub,
        fullname: payload.fullname,
        userType: payload.userType,
        authorities: payload.authorities,
      };

      dispatch(setCredentials({
        principal: principal,
        token: accessToken
      }));

      const refreshToken = response.data.refreshToken;
      localStorage.setItem('rt', refreshToken);

      console.log('Login successful:', response);
    },
  });
}
