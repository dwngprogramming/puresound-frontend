import {jwtDecode} from "jwt-decode";
import {setCredentials} from "@/libs/redux/features/auth/authSlice";
import {UserPrincipal} from "@/models/auth/UserPrincipal";
import {store} from "@/libs/redux/store";
import {CustomJwtPayload} from "@/models/auth/CustomJwtPayload";
import {reloginInstance} from "@/libs/axios/axiosInstances";

export const tryRelogin = async (): Promise<boolean> => {
  const dispatch = store.dispatch;

  try {
    const response = await reloginInstance.post('/v1/auth/refresh-token');
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
