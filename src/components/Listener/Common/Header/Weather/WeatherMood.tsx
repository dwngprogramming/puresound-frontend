import {useEffect, useRef, useState} from "react";
import {MapPin} from "lucide-react";
import WeatherPopup from "@/components/Listener/Common/Header/Weather/WeatherPopup";
import {
  getDecorativeBarClass,
  getHighlightLineClass,
  getIconBgColor,
  getWeatherBgClass,
  getWeatherBorderClass,
  getWeatherGlowColor,
  getWeatherIcon
} from "@/utils/weatherCssPreset";
import WeatherDropdown from "@/components/Listener/Common/Header/Weather/WeatherDropdown";

export interface WeatherInfo {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  temp: number; // Temperature in Celsius
  location: string;
  status: string; // e.g., "Sunny", "Cloudy"
}

const getKeyMood = (condition: string) => {
  switch (condition) {
    case 'sunny':
      return 'mood.sunny';
    case 'cloudy':
      return 'mood.cloudy';
    case 'rainy':
      return 'mood.rainy';
    case 'snowy':
      return 'mood.snowy';
    default:
      return 'mood.sunny';
  }
}

const WeatherMood = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [weather, setWeather] = useState<WeatherInfo>({
    condition: 'sunny',
    temp: 28,
    location: 'Ho Chi Minh',
    status: 'Sunny'
  });

  // Event handlers for popup
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!showDropdown) { // Chỉ hiện popup khi dropdown không mở
      setIsHovered(true);
      setShowPopup(true);
    }
  };

  const handleMouseLeave = () => {
    if (!showDropdown) { // Chỉ ẩn popup khi dropdown không mở
      timeoutRef.current = setTimeout(() => {
        setIsHovered(false);
        setShowPopup(false);
      }, 100);
    }
  };

  // Event handlers for dropdown
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
    // Ẩn popup khi mở dropdown
    if (!showDropdown) {
      setShowPopup(false);
      setIsHovered(false);
    }
  };

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

  const handleContainerMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!showDropdown) {
      setIsHovered(true);
      setShowPopup(true);
    }
  };

  const handleContainerMouseLeave = () => {
    if (!showDropdown) {
      timeoutRef.current = setTimeout(() => {
        setIsHovered(false);
        setShowPopup(false);
      }, 100);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setIsHovered(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
    >
      <div
        className={`
          relative group cursor-pointer
          ${getWeatherBgClass(weather.condition, isHovered || showDropdown)}
          backdrop-blur-xl border ${getWeatherBorderClass(weather.condition, isHovered || showDropdown)}
          rounded-full px-4 py-0.5
          shadow-2xl shadow-black/50
          transition-all duration-300 ease-out
          hover:shadow-3xl
          ${showDropdown ? 'ring-2 ring-white/10' : ''}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >

        {/* Weather-specific glowing effect on hover */}
        <div className={`
          absolute inset-0 rounded-full 
          bg-gradient-to-r ${getWeatherGlowColor(weather.condition)}
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
          <div className={`
            relative flex-shrink-0 w-8 h-8 rounded-full 
            ${getIconBgColor(weather.condition)}
            flex items-center justify-center
            shadow-lg
            transition-all duration-300
            ${isHovered || showDropdown ? 'shadow-xl' : ''}
          `}>
            {getWeatherIcon(weather.condition)}

            {/* Icon glow effect */}
            <div className={`
              absolute inset-0 rounded-full
              ${getIconBgColor(weather.condition)}
              opacity-0 group-hover:opacity-30
              blur-md transition-opacity duration-300
              ${showDropdown ? 'opacity-30' : ''}
            `}/>
          </div>

          {/* Weather Info */}
          <div className="flex-1 min-w-0">

            {/* Temperature & Status */}
            <div className="flex items-baseline space-x-3">
              <span className="text-lg font-bold text-white transition-all duration-300">
                {weather.temp}°C
              </span>
              <span className="text-xs font-medium text-gray-300 transition-colors duration-300">
                {weather.status}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-1">
              <MapPin className={`
                w-3 h-3 text-gray-400
                transition-colors duration-300
                ${isHovered || showDropdown ? 'text-gray-300' : ''}
              `}/>
              <span className={`
                text-xs text-gray-400 font-medium
                transition-colors duration-300
                ${isHovered || showDropdown ? 'text-gray-300' : ''}
              `}>
                {weather.location}
              </span>
            </div>
          </div>

          {/* Decorative element with weather color */}
          <div className={`
            w-2 h-8 rounded-full ml-2
            ${getDecorativeBarClass(weather.condition)}
            transition-all duration-300
            ${isHovered || showDropdown ? 'opacity-80' : ''}
          `}/>
        </div>

        {/* Bottom highlight line with weather color */}
        <div className={`
          absolute bottom-0 left-4 right-4 h-px
          ${getHighlightLineClass(weather.condition)}
          transition-all duration-500
          ${isHovered || showDropdown ? 'opacity-100' : 'opacity-70'}
        `}/>
      </div>

      <WeatherDropdown
        weather={weather}
        showDropdown={showDropdown}
        handleShowDropdown={setShowDropdown}
      />

      {/* Weather Popup - chỉ hiện khi không có dropdown */}
      {!showDropdown && (
        <WeatherPopup
          isVisible={showPopup}
          weatherCondition={weather.condition}
          onClose={handlePopupClose}
          icon={getWeatherIcon(weather.condition)}
          getKeyMood={getKeyMood}
        />
      )}
    </div>
  );
}

export default WeatherMood;
