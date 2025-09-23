import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslations} from 'next-intl';
import {showErrorNotification} from "@/libs/redux/features/notification/notificationAction";
import {store} from "@/libs/redux/store";
import {tryRelogin} from "@/libs/auth/tryRelogin";
import {useRouter} from "next/navigation";
import micromatch from 'micromatch';
import {needLogoutPath} from "@/utils/needLogoutPath";
import {usePathname} from "@/libs/i18n/navigation";

export const useAutoRelogin = () => {
  const [isTryingRelogin, setIsTryingRelogin] = useState(false);
  const dispatch = useDispatch();
  const t = useTranslations("Listener");
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = store.getState().auth.token;

  const isNeedLogoutPath = (path: string) => {
    return micromatch.isMatch(path, needLogoutPath);
  }

  const relogin = async () => {
    if (accessToken) {
      router.replace('/');
      return;
    }

    setIsTryingRelogin(true);

    try {
      const success = await tryRelogin();

      if (success && isNeedLogoutPath(pathname)) {
        // Hiển thị thông báo và chuyển hướng về trang chủ
        router.replace(`/`);
        dispatch(showErrorNotification(t('needLogout')));
        return;
      }
    } finally {
      setIsTryingRelogin(false);
    }
  }

  return {relogin, isTryingRelogin};
};
