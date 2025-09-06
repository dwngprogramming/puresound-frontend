import {useEffect, useRef, useState} from "react";
import {RotateCcw} from "lucide-react";
import WeatherPopup from "@/components/Listener/Common/Header/Weather/WeatherPopup";
import WeatherDropdown from "@/components/Listener/Common/Header/Weather/WeatherDropdown";
import {useTranslations} from "next-intl";
import {useWeatherStyle} from "@/hooks/common/useWeatherStyle";
import ReactCountryFlag from "react-country-flag";
import {useQuery} from "@tanstack/react-query";
import {WeatherResponse} from "@/models/weather/WeatherResponse";
import currentWeatherApi from "@/apis/main/weather/currentWeather.api";
import {getCurrentPosition} from "@/utils/getCurrentPosition";
import {ApiResponse} from "@/models/ApiResponse";
import {Skeleton} from "@heroui/react";

const WeatherMood = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDecorativeHovered, setIsDecorativeHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Listener.Common.weather');
  const [loading, setLoading] = useState(true);

  const {data: coordinates, isLoading: isGeoLoading} = useQuery({
    queryKey: ['geolocation'],
    queryFn: getCurrentPosition,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: 24 * 60 * 60 * 1000, // 1 ngày refetch 1 lần
    staleTime: 23.9 * 60 * 60 * 1000, // 23.9h thì coi là stale
    retry: 1
  });

  const {
    data: currentWeather,
    isLoading: isLoadingWeather,
    isFetching: isFetchingWeather,
    refetch: refetchWeather,
  } = useQuery<
    ApiResponse<WeatherResponse>,
    Error,
    WeatherResponse
  >({
    queryKey: ['currentWeather', coordinates?.latitude, coordinates?.longitude],
    queryFn: async () => {
      if (!coordinates) {
        return Promise.reject('No coordinates available');
      }
      return await currentWeatherApi.getCurrentWeather(coordinates.latitude, coordinates.longitude);
    },
    select: (apiResponse) => apiResponse.data,
    enabled: !!coordinates && !isGeoLoading,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: 20 * 60 * 1000, // 20 phút tự động refetch
    staleTime: 19 * 60 * 1000, // 19 phút thì coi là stale
    retry: 1,
  });

  useEffect(() => {
    setLoading(isFetchingWeather || isLoadingWeather || isGeoLoading);
  }, [isFetchingWeather, isLoadingWeather, isGeoLoading]);

  const {
    icon,
    iconBgClass,
    bgClass,
    decorativeBarClass,
    borderClass,
    weatherGlowClass,
    highlightLineClass,
    skeletonBgClass,
    isPremium
  } = useWeatherStyle(currentWeather?.current?.condition, currentWeather?.current?.isDay ?? false, isHovered || showDropdown);

  // Simplified event handlers
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    // Nếu data đang load thì không hover được
    if (!loading && !showDropdown) {
      setIsHovered(true);
      setShowPopup(true);
    }
  };

  const handleMouseLeave = () => {
    if (!showDropdown) {
      timeoutRef.current = setTimeout(() => {
        setIsHovered(false);
        setShowPopup(false);
      }, 100);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!showDropdown && currentWeather) {
      setShowPopup(false);
      setIsHovered(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleDecorativeMouseEnter = () => {
    setIsDecorativeHovered(true);
  };

  const handleDecorativeMouseLeave = () => {
    setIsDecorativeHovered(false);
  };

  const handleRefreshWeather = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await refetchWeather();
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Weather Component */}
      <div
        className={`
          relative group cursor-pointer w-[210px]
          ${bgClass}
          backdrop-blur-xl border ${borderClass}
          rounded-full px-4 py-0.5
          shadow-2xl shadow-black/50
          transition-all duration-300 ease-out
          hover:shadow-3xl
          ${showDropdown ? 'ring-2 ring-white/10' : ''}
        `}
        onClick={isPremium ? handleClick : undefined}
      >
        {/* Weather-specific glowing effect on hover */}
        <div className={`
          absolute inset-0 rounded-full
          bg-gradient-to-r ${weatherGlowClass}
          opacity-0 group-hover:opacity-100
          blur-xl transition-opacity duration-300
          -z-10
          ${showDropdown ? 'opacity-100' : ''}
        `}/>

        {/* Glass overlay with weather tint */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-full"/>

        {/* Content */}
        <div className="relative z-10 flex items-center space-x-4">
          {/* Weather Icon Circle */}
          {loading ?
            <Skeleton
              className={`rounded-full w-8 h-8 [&::after]:!bg-transparent dark:[&::after]:!bg-transparent ${skeletonBgClass}`}/> :
            <div className={`
              relative flex-shrink-0 w-8 h-8 rounded-full 
              ${iconBgClass}
              flex items-center justify-center
              shadow-lg
              transition-all duration-300
              ${isHovered || showDropdown ? 'shadow-xl' : ''}
            `}>
              {icon}

              {/* Icon glow effect */}
              <div className={`
              absolute inset-0 rounded-full
              ${iconBgClass}
              opacity-0 group-hover:opacity-30
              blur-md transition-opacity duration-300
              ${showDropdown ? 'opacity-30' : ''}
            `}/>
            </div>
          }

          {/* Weather Info */}
          <div className="flex-1 min-w-0">
            {!currentWeather ? <p className="text-[13px] py-3">{t('error.noData')}</p> :
              <>
                {/* Temperature & Status */}
                <div className="flex items-baseline space-x-2">
                  {loading ? <Skeleton
                      className={`rounded-lg w-10 h-5 my-1 [&::after]:!bg-transparent dark:[&::after]:!bg-transparent ${skeletonBgClass}`}/> :
                    <span className="text-lg font-bold text-white transition-all duration-300">
                      {currentWeather?.current.tempC}°C
                    </span>
                  }

                  {loading ? <Skeleton
                      className={`rounded-lg w-8.5 h-4 my-1 [&::after]:!bg-transparent dark:[&::after]:!bg-transparent ${skeletonBgClass}`}/> :
                    <span className="text-xs font-medium text-gray-300 transition-colors duration-300">
                      {t(`status.${currentWeather?.current.condition}`)}
                    </span>
                  }

                </div>

                {/* Location */}
                <div className="flex items-center space-x-1">
                  {loading ? <Skeleton
                      className={`w-4 h-3 mb-0.5 [&::after]:!bg-transparent dark:[&::after]:!bg-transparent ${skeletonBgClass}`}/> :
                    <ReactCountryFlag
                      countryCode="vn"
                      svg
                      style={{
                        width: '1rem',
                        height: '1rem',
                      }}
                    />
                  }

                  {loading ? <Skeleton
                      className={`rounded-lg w-15 h-2.75 mb-0.25 [&::after]:!bg-transparent dark:[&::after]:!bg-transparent ${skeletonBgClass}`}/> :
                    <span
                      className={`text-xs text-gray-400 font-medium transition-colors duration-300 ${isHovered || showDropdown ? 'text-gray-300' : ''}`}>
                      {currentWeather?.location.district}
                    </span>
                  }
                </div>
              </>
            }

          </div>

          <div
            className="relative w-6 h-8 flex items-center justify-center"
            onMouseEnter={handleDecorativeMouseEnter}
            onMouseLeave={handleDecorativeMouseLeave}
          >
            {/* Decorative bar với fade + scale */}
            <div className={`
               absolute w-2 h-8 rounded-full
               ${decorativeBarClass}
               transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
               ${isDecorativeHovered ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}
             `}/>

            <RotateCcw
              size={24}
              className={`absolute text-white/80 transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) cursor-pointer 
                  ${isDecorativeHovered ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 -rotate-45'}`}
              onClick={handleRefreshWeather}
            />
          </div>
        </div>

        {/* Bottom highlight line with weather color */}
        <div className={`
          absolute bottom-0 left-4 right-4 h-px
          ${highlightLineClass}
          transition-all duration-500
          ${isHovered || showDropdown ? 'opacity-100' : 'opacity-70'}
        `}/>
      </div>

      {/* Weather Dropdown */}
      <WeatherDropdown
        currentWeather={currentWeather}
        showDropdown={showDropdown}
        handleShowDropdown={setShowDropdown}
      />

      {!showDropdown && showPopup && (
        <>
          <div className="absolute top-0 left-full w-3 h-full z-999"/>
          {/* Invisible bridge để tránh mouse leave */}
          <WeatherPopup
            isVisible={showPopup}
            currentWeather={currentWeather}
            icon={icon}
          />
        </>
      )}
    </div>
  );
}

export default WeatherMood;
