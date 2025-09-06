import {Cloud, CloudRain, Moon, Snowflake, Sun, Thermometer} from "lucide-react";
import {WeatherCondition} from "@/const/WeatherCondition";

export const getWeatherIcon = (condition: WeatherCondition | undefined, isDay: boolean) => {
  switch (condition) {
    case 'sunny':
      if (!isDay) return <Moon className="text-indigo-300 w-6 h-6" />; // Clear night
      return <Sun className="text-yellow-300 w-4 h-4"/>;
    case 'cloudy':
      return <Cloud className="text-gray-300 w-6 h-6"/>;
    case 'rainy':
      return <CloudRain className="text-blue-300 w-6 h-6"/>;
    case 'snowy':
      return <Snowflake className="text-cyan-300 w-6 h-6"/>;
    default:
      return <Thermometer className="text-neutral-200 w-6 h-6"/>;
  }
};

export const getIconBgColor = (condition: WeatherCondition | undefined, isDay: boolean, premium: boolean) => {
  if (!premium) return 'bg-gray-600/50';
  switch (condition) {
    case 'sunny':
      if (!isDay) return 'bg-gradient-to-br from-indigo-400/70 to-purple-400/80'; // Clear night
      return 'bg-gradient-to-br from-yellow-400/70 to-orange-400/80';
    case 'cloudy':
      return 'bg-gradient-to-br from-gray-400/70 to-slate-400/80';
    case 'rainy':
      return 'bg-gradient-to-br from-blue-400/70 to-indigo-400/80';
    case 'snowy':
      return 'bg-gradient-to-br from-cyan-400/70 to-blue-400/80';
    default:
      return 'bg-gray-600/50';
  }
};

export const getWeatherBgClass = (condition: WeatherCondition | undefined, isDay: boolean, isHovered = false, premium: boolean) => {
  if (!premium) return 'bg-gray-800/60';
  if (isHovered) {
    switch (condition) {
      case 'sunny':
        if (!isDay) return 'bg-gradient-to-br from-indigo-500/25 via-purple-500/20 to-indigo-400/25'; // Clear night hover
        return 'bg-gradient-to-br from-yellow-500/25 via-orange-500/20 to-yellow-400/25';
      case 'cloudy':
        return 'bg-gradient-to-br from-gray-500/25 via-slate-400/20 to-gray-400/25';
      case 'rainy':
        return 'bg-gradient-to-br from-blue-500/25 via-indigo-500/20 to-blue-400/25';
      case 'snowy':
        return 'bg-gradient-to-br from-cyan-500/25 via-blue-500/20 to-cyan-400/25';
      default:
        return 'bg-gray-800/60';
    }
  } else {
    switch (condition) {
      case 'sunny':
        if (!isDay) return 'bg-gradient-to-br from-gray-800/40 via-indigo-900/30 to-purple-900/30'; // Clear night
        return 'bg-gradient-to-br from-gray-800/40 via-yellow-900/30 to-orange-900/30';
      case 'cloudy':
        return 'bg-gradient-to-br from-gray-800/40 via-slate-700/30 to-gray-700/30';
      case 'rainy':
        return 'bg-gradient-to-br from-gray-800/40 via-blue-900/30 to-indigo-900/30';
      case 'snowy':
        return 'bg-gradient-to-br from-gray-800/40 via-cyan-900/30 to-blue-900/30';
      default:
        return 'bg-gray-800/60';
    }
  }
};

export const getWeatherBorderClass = (condition: WeatherCondition | undefined, isDay: boolean, isHovered = false, premium: boolean) => {
  if (!premium) return isHovered ? 'border-gray-400/60' : 'border-gray-600/40';
  if (isHovered) {
    switch (condition) {
      case 'sunny':
        if (!isDay) return 'border-indigo-300/15'; // Clear night hover
        return 'border-yellow-300/15';
      case 'cloudy':
        return 'border-gray-300/15';
      case 'rainy':
        return 'border-blue-300/15';
      case 'snowy':
        return 'border-cyan-200/15';
      default:
        return 'border-gray-400/60';
    }
  } else {
    switch (condition) {
      case 'sunny':
        if (!isDay) return 'border-indigo-500/30'; // Clear night
        return 'border-yellow-500/30';
      case 'cloudy':
        return 'border-gray-500/30';
      case 'rainy':
        return 'border-blue-500/30';
      case 'snowy':
        return 'border-cyan-400/30';
      default:
        return 'border-gray-600/40';
    }
  }
};

export const getWeatherGlowColor = (condition: WeatherCondition | undefined, isDay: boolean, premium: boolean) => {
  if (!premium) return 'from-transparent via-transparent to-transparent';
  switch (condition) {
    case 'sunny':
      if (!isDay) return 'from-indigo-400/20 via-purple-400/20 to-indigo-400/20'; // Clear night
      return 'from-yellow-400/20 via-orange-400/20 to-yellow-400/20';
    case 'cloudy':
      return 'from-gray-400/20 via-slate-400/20 to-gray-400/20';
    case 'rainy':
      return 'from-blue-400/20 via-indigo-400/20 to-blue-400/20';
    case 'snowy':
      return 'from-cyan-400/20 via-blue-400/20 to-cyan-400/20';
    default:
      return 'from-transparent via-transparent to-transparent';
  }
};

export const getDecorativeBarClass = (condition: WeatherCondition | undefined, isDay: boolean, premium: boolean) => {
  if (!premium) return 'bg-gray-500/40';
  switch (condition) {
    case 'sunny':
      if (!isDay) return 'bg-gradient-to-b from-indigo-400/60 to-purple-400/60'; // Clear night
      return 'bg-gradient-to-b from-yellow-400/60 to-orange-400/60';
    case 'cloudy':
      return 'bg-gradient-to-b from-gray-400/60 to-slate-400/60';
    case 'rainy':
      return 'bg-gradient-to-b from-blue-400/60 to-indigo-400/80';
    case 'snowy':
      return 'bg-gradient-to-b from-cyan-400/60 to-blue-400/60';
    default:
      return 'bg-gray-500/40';
  }
};

export const getHighlightLineClass = (condition: WeatherCondition | undefined, isDay: boolean, premium: boolean) => {
  if (!premium) return '';
  switch (condition) {
    case 'sunny':
      if (!isDay) return 'bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent'; // Clear night
      return 'bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent';
    case 'cloudy':
      return 'bg-gradient-to-r from-transparent via-gray-500/50 to-transparent';
    case 'rainy':
      return 'bg-gradient-to-r from-transparent via-blue-500/50 to-transparent';
    case 'snowy':
      return 'bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent';
    default:
      return '';
  }
};

export const getPopupBgColor = (condition: WeatherCondition | undefined, isDay: boolean, premium: boolean) => {
  if (!premium) return 'bg-gray-700/50';
  switch (condition) {
    case 'sunny':
      if (!isDay) return 'bg-gradient-to-br from-indigo-500/25 via-purple-500/20 to-indigo-400/25'; // Clear night
      return 'bg-gradient-to-br from-yellow-500/25 via-orange-500/20 to-yellow-400/25';
    case 'cloudy':
      return 'bg-gradient-to-br from-gray-500/25 via-slate-400/20 to-gray-400/25';
    case 'rainy':
      return 'bg-gradient-to-br from-blue-500/25 via-indigo-500/20 to-blue-400/25';
    case 'snowy':
      return 'bg-gradient-to-br from-cyan-500/25 via-blue-500/20 to-cyan-400/25';
    default:
      return 'bg-gray-700/50';
  }
};

export const getPopupBorderColor = (condition: WeatherCondition | undefined, isDay: boolean, premium: boolean) => {
  if (!premium) return 'border-gray-500/30';
  switch (condition) {
    case 'sunny':
      if (!isDay) return 'border-indigo-300/15'; // Clear night
      return 'border-yellow-300/15';
    case 'cloudy':
      return 'border-gray-300/15';
    case 'rainy':
      return 'border-blue-300/15';
    case 'snowy':
      return 'border-cyan-200/15';
    default:
      return 'border-gray-500/30';
  }
};

export const getAccentColor = (condition: WeatherCondition | undefined, isDay: boolean, premium: boolean) => {
  if (!premium) return 'text-gray-300';
  switch (condition) {
    case 'sunny':
      if (!isDay) return 'text-indigo-400'; // Clear night
      return 'text-yellow-400';
    case 'cloudy':
      return 'text-gray-400';
    case 'rainy':
      return 'text-blue-400';
    case 'snowy':
      return 'text-cyan-400';
    default:
      return 'text-gray-300';
  }
};

export const getGlowColor = (condition: WeatherCondition | undefined, isDay: boolean, premium: boolean) => {
  if (!premium) return 'from-transparent via-transparent to-transparent';
  switch (condition) {
    case 'sunny':
      if (!isDay) return 'from-indigo-400/10 via-purple-400/15 to-indigo-400/10'; // Clear night
      return 'from-yellow-400/10 via-orange-400/15 to-yellow-400/10';
    case 'cloudy':
      return 'from-gray-400/10 via-slate-400/15 to-gray-400/10';
    case 'rainy':
      return 'from-blue-400/10 via-indigo-400/15 to-blue-400/10';
    case 'snowy':
      return 'from-cyan-400/10 via-blue-400/15 to-cyan-400/10';
    default:
      return 'from-transparent via-transparent to-transparent';
  }
};

export const getArrowBorderColor = (condition: WeatherCondition | undefined, isDay: boolean, premium: boolean) => {
  if (!premium) return 'border-r-gray-500/30';
  switch (condition) {
    case 'sunny':
      if (!isDay) return 'border-r-indigo-300/15'; // Clear night
      return 'border-r-yellow-300/15';
    case 'cloudy':
      return 'border-r-gray-300/15';
    case 'rainy':
      return 'border-r-blue-300/15';
    case 'snowy':
      return 'border-r-cyan-200/15';
    default:
      return 'border-r-gray-500/30';
  }
};

export const getButtonHoverBg = (condition: WeatherCondition | undefined, isDay: boolean, premium: boolean) => {
  if (!premium) return 'hover:bg-gray-600/60';
  switch (condition) {
    case 'sunny':
      if (!isDay) return 'hover:bg-gradient-to-br hover:from-indigo-500/20 hover:via-purple-500/15 hover:to-indigo-400/20'; // Clear night
      return 'hover:bg-gradient-to-br hover:from-yellow-500/20 hover:via-orange-500/15 hover:to-yellow-400/20';
    case 'cloudy':
      return 'hover:bg-gradient-to-br hover:from-gray-500/20 hover:via-slate-400/15 hover:to-gray-400/20';
    case 'rainy':
      return 'hover:bg-gradient-to-br hover:from-blue-500/20 hover:via-indigo-500/15 hover:to-blue-400/20';
    case 'snowy':
      return 'hover:bg-gradient-to-br hover:from-cyan-500/20 hover:via-blue-500/15 hover:to-cyan-400/20';
    default:
      return 'hover:bg-gray-600/60';
  }
};

export const getHeaderBg = (condition: WeatherCondition | undefined, isDay: boolean, premium: boolean) => {
  if (!premium) return 'bg-gray-700/50';
  switch (condition) {
    case 'sunny':
      if (!isDay) return 'bg-gradient-to-br from-indigo-600/40 via-purple-600/35 to-indigo-500/40'; // Clear night
      return 'bg-gradient-to-br from-yellow-600/40 via-orange-600/35 to-yellow-500/40';
    case 'cloudy':
      return 'bg-gradient-to-br from-gray-600/40 via-slate-500/35 to-gray-500/40';
    case 'rainy':
      return 'bg-gradient-to-br from-blue-600/40 via-indigo-600/35 to-blue-500/40';
    case 'snowy':
      return 'bg-gradient-to-br from-cyan-600/40 via-blue-600/35 to-cyan-500/40';
    default:
      return 'bg-gray-700/50';
  }
};

export const getDropdownBgClass = (condition: WeatherCondition | undefined, isDay: boolean, premium: boolean) => {
  if (!premium) return 'bg-gray-700/50';
  switch (condition) {
    case 'sunny':
      if (!isDay) return 'bg-gradient-to-br from-indigo-500/25 via-purple-500/20 to-indigo-400/25'; // Clear night
      return 'bg-gradient-to-br from-yellow-500/25 via-orange-500/20 to-yellow-400/25';
    case 'cloudy':
      return 'bg-gradient-to-br from-gray-500/25 via-slate-400/20 to-gray-400/25';
    case 'rainy':
      return 'bg-gradient-to-br from-blue-500/25 via-indigo-500/20 to-blue-400/25';
    case 'snowy':
      return 'bg-gradient-to-br from-cyan-500/25 via-blue-500/20 to-cyan-400/25';
    default:
      return 'bg-gray-700/50';
  }
};

export const getDropdownBorderClass = (condition: WeatherCondition | undefined, isDay: boolean, premium: boolean) => {
  if (!premium) return 'border-gray-500/30';
  switch (condition) {
    case 'sunny':
      if (!isDay) return 'border-indigo-300/15'; // Clear night
      return 'border-yellow-300/15';
    case 'cloudy':
      return 'border-gray-300/15';
    case 'rainy':
      return 'border-blue-300/15';
    case 'snowy':
      return 'border-cyan-200/15';
    default:
      return 'border-gray-500/30';
  }
};

export const getSkeletonBgClass = (condition: WeatherCondition | undefined, isDay: boolean, premium: boolean) => {
  if (!premium) return 'bg-gray-700/60';

  switch (condition) {
    case 'sunny':
      if (!isDay) return 'bg-gradient-to-br from-indigo-700/35 via-purple-700/30 to-indigo-600/35'; // Clear night skeleton
      return 'bg-gradient-to-br from-yellow-700/35 via-orange-700/30 to-yellow-600/35';
    case 'cloudy':
      return 'bg-gradient-to-br from-gray-600/35 via-slate-500/30 to-gray-500/35';
    case 'rainy':
      return 'bg-gradient-to-br from-blue-700/35 via-indigo-700/30 to-blue-600/35';
    case 'snowy':
      return 'bg-gradient-to-br from-cyan-700/35 via-blue-700/30 to-cyan-600/35';
    default:
      return 'bg-gray-700/60';
  }
};

