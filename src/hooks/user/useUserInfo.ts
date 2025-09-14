import {useAppSelector} from "@/libs/redux/hooks";
import {useMemo} from "react";

export const useUserInfo = () => {
  const auth = useAppSelector(state => state.auth);
  const subscription = useAppSelector(state => state.subscription);

  const verify = useMemo(() => ({
    isAuthenticated: auth.isAuthenticated,
    isSubscription: !!subscription.subscriptionType,
    isPremium: (auth.isAuthenticated && !!subscription.subscriptionType) || false
  }), [auth, subscription]);

  return {auth, subscription, ...verify}
}
