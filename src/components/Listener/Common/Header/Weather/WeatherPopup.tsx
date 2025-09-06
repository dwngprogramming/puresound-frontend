import React from 'react';
import {useTranslations} from "next-intl";
import {useWeatherStyle} from "@/hooks/common/useWeatherStyle";
import {Crown} from "lucide-react";
import {Button} from "@heroui/react";
import {WeatherResponse} from "@/models/weather/WeatherResponse";

interface WeatherPopupProps {
  isVisible: boolean;
  currentWeather: WeatherResponse | undefined;
  onClose?: () => void;
  icon: React.ReactNode;
}

const tagKey: Record<string, string> = {
  sunny: 'premium.tag.sunny',
  cloudy: 'premium.tag.cloudy',
  rainy: 'premium.tag.rainy',
  snowy: 'premium.tag.snowy',
  clear_night: 'premium.tag.clear_night',
  error_default: 'premium.tag.clear_night', // default case
}

const getKeyMood = (condition: string | undefined) => {
  switch (condition) {
    case 'sunny':
      return 'mood.sunny';
    case 'cloudy':
      return 'mood.cloudy';
    case 'rainy':
      return 'mood.rainy';
    case 'snowy':
      return 'mood.snowy';
    case 'clear_night':
      return 'mood.clear_night';
    default:
      return 'mood.sunny';
  }
}

const WeatherPopup: React.FC<WeatherPopupProps> = ({
                                                     isVisible,
                                                     currentWeather,
                                                     icon,
                                                   }) => {
  const t = useTranslations('Listener.Common');
  const {
    popupBgClass,
    popupBorderClass,
    weatherGlowClass,
    arrowBorderClass,
    headerBgClass,
    accentColor,
    isPremium
  } = useWeatherStyle(currentWeather?.current.condition, currentWeather?.current.isDay ?? false);

  const handlePlaylistGenerate = () => {
    console.log('Generate playlist for weather:', currentWeather?.current.condition);
  };

  if (!isVisible) return null;

  const tag = t(tagKey[currentWeather?.current.condition ?? 'error_default']);

  return (
    <>
      {/* Invisible bridge để tránh khoảng trống */}
      <div className="absolute top-0 left-full w-3 h-full z-999"/>

      {/* Main popup */}
      <div className={`
      absolute top-0 left-full ml-3 z-1000
      w-72 px-4 py-3
      ${popupBgClass}
      backdrop-blur-xl border ${popupBorderClass}
      rounded-2xl shadow-2xl shadow-black/30
      transform transition-all duration-300 ease-out
      ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
    `}>

        {/* Glow effect */}
        <div className={`
        absolute inset-0 rounded-2xl 
        bg-gradient-to-r ${weatherGlowClass}
        blur-xl -z-10
      `}/>

        {/* Arrow pointer */}
        <div className={`
        absolute left-0 top-6 transform -translate-x-2
        w-0 h-0 
        border-t-8 border-t-transparent
        border-b-8 border-b-transparent
        border-r-8 ${arrowBorderClass}
      `}/>

        {/* Content */}
        <div className="relative">
          {/* Header with chat bubble icon */}
          <div className="flex items-center space-x-2 mb-3">
            <div className={`
            p-2 rounded-full 
            ${headerBgClass}
            border ${popupBorderClass}
          `}>
              {icon}
            </div>
            <div className="flex-1">
              <h3 className={`
              font-semibold text-sm
              ${isPremium && accentColor}
            `}>
                {currentWeather ?
                  t(`weather.${getKeyMood(currentWeather.current.condition)}`) :
                  t('weather.error.oops')
                }
              </h3>
              <p className="text-gray-400 text-xs">
                {currentWeather ?
                  t('weather.playlist') :
                  t('weather.error.notFound')
                }
              </p>
            </div>
          </div>

          {/* Main message */}
          <div className="mb-4">
            <p className="text-gray-200 text-sm leading-relaxed">
              {currentWeather ?
                (isPremium ? t('weather.click') : t('freemium.weatherPopup')) :
                t('weather.error.description')
              }
            </p>
          </div>

          {/* Update to Premium button */}
          {currentWeather && !isPremium && (
            <div>
              <Button className={`w-full bg-yellow-600 border border-yellow-600`}>
                {t('freemium.upgrade')}
              </Button>
            </div>
          )}

          <div className="absolute top-0 right-0">
            <div className={`flex items-center space-x-2 px-1.5 py-0.5 rounded-full text-xs
             ${currentWeather ? (isPremium ? popupBgClass : "bg-yellow-600") : null}
            `}>
              {currentWeather ?
                (isPremium ? tag : (
                  <>
                    <Crown size={14}/>
                    <p>Premium</p>
                  </>
                )) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherPopup;
