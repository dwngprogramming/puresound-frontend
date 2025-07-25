import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {setCredentials} from "@/libs/redux/features/auth/authSlice";
import {UserPrincipal} from "@/models/auth/UserPrincipal";
import {store} from "@/libs/redux/store";
import {CustomJwtPayload} from "@/models/auth/CustomJwtPayload";

export const tryRelogin = async (): Promise<boolean> => {
  const dispatch = store.dispatch;
  const refreshToken = localStorage.getItem('rt');
  const reloginInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000
  });

  // Not have refresh token -> false
  if (!refreshToken) return false;

  try {
    const response = await reloginInstance.post('/v1/auth/local/refresh-token', refreshToken);
    const accessToken: string = response.data.data.accessToken;
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

    return true;
  } catch (error) {
    return false;
  }
}
