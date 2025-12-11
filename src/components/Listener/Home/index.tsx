"use client";

import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import tokenApi from "@/apis/auth/token.api";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import Cookies from 'js-cookie';
import {showInfoNotification} from "@/libs/redux/features/notification/notificationAction";
import {UserType} from "@/const/user/UserType";
import {setSubscription} from "@/libs/redux/features/subscription/subscriptionSlice";
import meApi from "@/apis/main/listener/me.api";
import {useSavePrincipal} from "@/hooks/auth/useSavePrincipal";
import MediaSection, {SimplifiedItemResponse} from "@/components/Listener/Common/MusicComponent/MediaSection";
import {usePopularTracks} from "@/hooks/metadata/useTrackMetadata";
import {useFeaturedArtists} from "@/hooks/metadata/useArtistMetadata";

interface HomeMediaStructure {
  title: string
  numOfItems: number
  items: SimplifiedItemResponse[]
}

const Home = () => {
  const t = useTranslations("Listener.Home");
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const savePrincipal = useSavePrincipal();
  const principal = useAppSelector(state => state.auth.principal);
  
  // Fetch homepage data
  const {data: tracks} = usePopularTracks();
  const {data: artists} = useFeaturedArtists();
  
  const homeMediaStructure: HomeMediaStructure[] = [
    {
      title: 'media.popularTracks',
      numOfItems: 10,
      items: tracks || [],
    },
    {
      title: 'media.featuredArtists',
      numOfItems: 10,
      items: artists || [],
    }
  ]
  
  const exchangeTokenMutation = useMutation({
    mutationFn: (code: string) => tokenApi.exchangeToken(code),
  });
  
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
  
  // Sử dụng với OAuth 2
  useEffect(() => {
    const exchangeCode = async () => {
      const code = Cookies.get('exchangeCode');
      
      if (code) {
        try {
          const response = await exchangeTokenMutation.mutateAsync(code);
          savePrincipal(response.data); // Dispatch to Redux
          
          handleFacebookHash();
          handleLinkedOAuth2();
          
        } catch (error) {
          Cookies.remove('linkedProvider');
          router.push('/login');
        }
      }
    };
    
    exchangeCode();
  }, []);
  
  useEffect(() => {
    if (principal) {
      handleSubscriptionInfo(principal.userType);
    }
  }, [principal]);
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setTimeOfDay('morning');
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay('afternoon');
    } else if (hour >= 18 && hour < 22) {
      setTimeOfDay('evening');
    } else {
      setTimeOfDay('night');
    }
  }, []);
  
  return (
    <div className="grid grid-cols-1 gap-6">
      <h2>{t(`greeting.${timeOfDay}`)}</h2>
      {homeMediaStructure.map((section, index) => (
        <MediaSection
          key={index}
          title={t(section.title)}
          numOfItems={section.numOfItems}
          items={section.items}
        />
      ))}
    </div>
  );
}

export default Home
