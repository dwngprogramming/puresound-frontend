"use client";

import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import tokenApi from "@/apis/auth/token.api";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setCredentials} from "@/libs/redux/features/auth/authSlice";
import {CustomJwtPayload} from "@/models/auth/CustomJwtPayload";
import {jwtDecode} from "jwt-decode";
import {UserPrincipal} from "@/models/auth/UserPrincipal";

const Home = () => {
  const t = useTranslations("Listener.Home");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const principal = useAppSelector(state => state.auth.principal);

  const exchangeTokenMutation = useMutation({
    mutationFn: (code: string,) => tokenApi.exchangeToken(code),
    onSuccess: (response) => {
      const locale = localStorage.getItem('locale') || 'en';
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

      window.history.replaceState({}, "", `/${locale}`);
    },
    onError: () => {
      router.push('/login');
    }
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("token");

    if (code) {
      exchangeTokenMutation.mutate(code);
    }
  }, []);

  return (
    <div>
      <h1>{t('title')}</h1>
      {principal && <p>{`${t('name')} ${principal?.fullname}`}</p>}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push('/me')}>Go to Me page</button>
    </div>
  );
}

export default Home
