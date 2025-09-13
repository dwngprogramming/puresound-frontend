import {useMutation} from "@tanstack/react-query";
import authApi from "@/apis/auth/auth.api";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import meApi from "@/apis/main/listener/me.api";
import {UserType} from "@/const/user/UserType";
import {setSubscription} from "@/libs/redux/features/subscription/subscriptionSlice";
import {LoginRequest} from "@/models/auth/LoginRequest";
import {useSavePrincipal} from "@/hooks/auth/useSavePrincipal";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const savePrincipal = useSavePrincipal();
  const principal = useAppSelector(state => state.auth.principal);

  const handleSubscriptionInfo = async (userType: UserType) => {
    const apiFunction = chooseApiEndpoint(userType);
    if (!apiFunction) {
      return;
    }

    const response = await apiFunction();
    if (response) {
      const subscriptionInfo = response.data;
      // Lưu thông tin subscription vào Redux store
      dispatch(setSubscription(subscriptionInfo));
    }
  }

  const chooseApiEndpoint = (userType: UserType) => {
    switch (userType) {
      case UserType.LISTENER:
        return meApi.getBasicSubscription;
      default:
        return null;
    }
  }

  return useMutation({
    mutationFn: async (loginRequest: LoginRequest) => {
      // gọi login
      const response = await authApi.login(loginRequest);
      savePrincipal(response.data);

      if (principal && principal.userType === UserType.LISTENER) {
        await handleSubscriptionInfo(principal.userType);
      }

      return response; // React Query sẽ coi mutation thành công khi cả 2 xong
    },
  });
}
