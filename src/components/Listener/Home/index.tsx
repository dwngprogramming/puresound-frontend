"use client";

import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import tokenApi from "@/apis/auth/token.api";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {deleteCredentials, setCredentials} from "@/libs/redux/features/auth/authSlice";
import {CustomJwtPayload} from "@/models/auth/CustomJwtPayload";
import {jwtDecode} from "jwt-decode";
import {UserPrincipal} from "@/models/auth/UserPrincipal";
import Cookies from 'js-cookie';
import authApi from "@/apis/auth/auth.api";
import {showInfoNotification} from "@/libs/redux/features/notification/notificationAction";

const Home = () => {
  const t = useTranslations("Listener.Home");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const principal = useAppSelector(state => state.auth.principal);

  const exchangeTokenMutation = useMutation({
    mutationFn: (code: string) => tokenApi.exchangeToken(code),
    onSuccess: (response) => {
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

      handleFacebookHash();
      handleLinkedOAuth2();
    },
    onError: () => {
      Cookies.remove('linkedProvider');
      router.push('/login');
    }
  });

  const handleLinkedOAuth2 = () => {
    const provider = Cookies.get('linkedProvider');

    if (!provider) {
      return;
    }

    const message = atob(provider as string);
    // If linked provider, show message
    if (message) {
      dispatch(showInfoNotification(message));
      Cookies.remove('linkedProvider');
    }
  }

  const handleFacebookHash = () => {
    if (window.location.hash === '#_=_') {
      const url = window.location.href.replace(/#_=_$/, '')
      window.history.replaceState(null, '', url)
    }
  }
  const handleLogout = async () => {
    await authApi.logout();
    dispatch(deleteCredentials());
    // router.push('/login');
  }

  // Using for OAuth 2. Exchange code -> access token
  useEffect(() => {
    const code = Cookies.get('exchangeCode');

    if (code) {
      exchangeTokenMutation.mutate(code);
    }
  }, []);

  return (
    <div>
      <h1>{t('title')}</h1>
      {principal && (
        <>
          <p>{`${t('name')} ${principal?.fullname}`}</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.push('/me')}>Go to Me page
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-4 rounded"
                  onClick={() => handleLogout()}>Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Home
