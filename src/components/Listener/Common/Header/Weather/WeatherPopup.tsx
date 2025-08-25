import React from 'react';
import {
  getArrowBorderColor,
  getGlowColor,
  getHeaderBg,
  getPopupBgColor,
  getPopupBorderColor
} from "@/utils/weatherCssPreset";
import {useTranslations} from "next-intl";

interface WeatherPopupProps {
  isVisible: boolean;
  weatherCondition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  onClose?: () => void;
  icon: React.ReactNode;
  getKeyMood: (condition: string) => string;
}

const WeatherPopup: React.FC<WeatherPopupProps> = ({
                                                     isVisible,
                                                     weatherCondition,
                                                     onClose,
                                                     icon,
                                                     getKeyMood
                                                   }) => {
  const t = useTranslations('Listener.Common.weather');

  const handlePlaylistGenerate = () => {
    console.log('Generate playlist for weather:', weatherCondition);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={`
      absolute top-0 left-full ml-3 z-1000
      w-72 px-4 py-3
      ${getPopupBgColor(weatherCondition)}
      backdrop-blur-xl border ${getPopupBorderColor(weatherCondition)}
      rounded-2xl shadow-2xl shadow-black/30
      transform transition-all duration-300 ease-out
      ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
    `}>

      {/* Glow effect */}
      <div className={`
        absolute inset-0 rounded-2xl 
        bg-gradient-to-r ${getGlowColor(weatherCondition)}
        blur-xl -z-10
      `}/>

      <div className={`
        absolute left-0 top-6 transform -translate-x-2
        w-0 h-0 
        border-t-8 border-t-transparent
        border-b-8 border-b-transparent
        border-r-8 ${getArrowBorderColor(weatherCondition)}
      `}/>

      {/* Content */}
      <div className="relative">

        {/* Header with chat bubble icon */}
        <div className="flex items-center space-x-2 mb-3">
          <div className={`
            p-2 rounded-full 
            ${getHeaderBg(weatherCondition)}
            border ${getPopupBorderColor(weatherCondition)}
          `}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm">{t(`${getKeyMood(weatherCondition)}`)}</h3>
            <p className="text-gray-400 text-xs">{t('playlist')}</p>
          </div>
        </div>

        {/* Main message */}
        <div className="mb-4">
          <p className="text-gray-200 text-sm leading-relaxed">
            {t('click')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherPopup;
