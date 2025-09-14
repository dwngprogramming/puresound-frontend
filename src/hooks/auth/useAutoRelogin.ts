import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslations} from 'next-intl';
import {showErrorNotification} from "@/libs/redux/features/notification/notificationAction";
import {store} from "@/libs/redux/store";
import {tryRelogin} from "@/libs/auth/tryRelogin";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useAutoRelogin = (router: AppRouterInstance) => {
  const [isTryingRelogin, setIsTryingRelogin] = useState(false);
  const dispatch = useDispatch();
  const t = useTranslations("Listener.Login");
  const accessToken = store.getState().auth.token;

  const relogin = async () => {
    if (accessToken) {
      router.replace('/');
      return;
    }

    setIsTryingRelogin(true);

    try {
      const success = await tryRelogin();

      if (success) {
        router.replace('/');
        dispatch(showErrorNotification(t('needLogout')));
      }
    } finally {
      setIsTryingRelogin(false);
    }
  };

  return {relogin, isTryingRelogin};
};
