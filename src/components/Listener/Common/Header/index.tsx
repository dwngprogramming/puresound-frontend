'use client';

import Image from "next/image";
import {useRouter} from "next/navigation";
import SearchBar from "@/components/Listener/Common/Header/SearchBar";
import RightButton from "@/components/Listener/Common/Header/RightButton";
import {Button} from "@heroui/react";
import {Crown} from "lucide-react";
import {useTranslations} from "next-intl";
import WeatherMood from "@/components/Listener/Common/Header/Weather/WeatherMood";
import {useUserInfo} from "@/hooks/user/useUserInfo";
import PuresoundLogo from "@/components/Utility/PuresoundLogo";

const Header = () => {
  const t = useTranslations('Listener.Common');
  const router = useRouter();
  const {isPremium} = useUserInfo();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-700 h-20">
      <div className="relative flex items-center justify-between pl-4 pr-2 w-full h-full">
        {/* Logo bên trái */}
        <div className="flex-shrink-0 z-10">
          <div className="flex items-center space-x-25">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/")}>
              <PuresoundLogo size={50}/>
            </div>
            <WeatherMood/>
          </div>
        </div>

        <div className="absolute left-0 right-0 flex justify-center px-4">
          <div className="w-full max-w-md">
            <SearchBar/>
          </div>
        </div>

        {/* User menu bên phải */}
        <div className="flex-shrink-0 flex items-center space-x-2 z-10">
          {!isPremium && (
            <Button
              className="text-darkmod font-bold py-5.5 px-4 rounded-full justify-center items-center hover:text-darkmode bg-yellow-600 border border-yellow-600
                hover:border-yellow-700 hover:bg-yellow-700"
              onPress={() => router.push("/premium")}
            >
              <Crown size={20}/>
              {t('freemium.subscription')}
            </Button>
          )}

          <RightButton/>
        </div>
      </div>
    </header>
  )
}

export default Header;
