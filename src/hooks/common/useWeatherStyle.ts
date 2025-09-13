import {WeatherCondition} from '@/const/WeatherCondition';
import {
  getAccentColor,
  getArrowBorderColor,
  getButtonHoverBg,
  getDecorativeBarClass,
  getDropdownBgClass,
  getDropdownBorderClass,
  getGlowColor,
  getHeaderBg,
  getHighlightLineClass,
  getIconBgColor,
  getPopupBgColor,
  getPopupBorderColor, getSkeletonBgClass,
  getWeatherBgClass,
  getWeatherBorderClass,
  getWeatherGlowColor,
  getWeatherIcon
} from '@/utils/weatherCssPreset';
import {useUserInfo} from "@/hooks/user/useUserInfo";

export const useWeatherStyle = (condition: WeatherCondition | undefined, isDay: boolean, isHovered = false) => {
  const {isPremium} = useUserInfo();

  return {
    // Icon & Visual Elements
    icon: getWeatherIcon(condition, isDay),
    iconBgClass: getIconBgColor(condition, isDay, isPremium),
    accentColor: getAccentColor(condition, isDay, isPremium),

    // Background Classes
    bgClass: getWeatherBgClass(condition, isDay, isHovered, isPremium),
    popupBgClass: getPopupBgColor(condition, isDay, isPremium),
    headerBgClass: getHeaderBg(condition, isDay, isPremium),
    dropdownBgClass: getDropdownBgClass(condition, isDay, isPremium),

    // Border Classes
    borderClass: getWeatherBorderClass(condition, isDay, isHovered, isPremium),
    popupBorderClass: getPopupBorderColor(condition, isDay, isPremium),
    dropdownBorderClass: getDropdownBorderClass(condition, isDay, isPremium),
    arrowBorderClass: getArrowBorderColor(condition, isDay, isPremium),

    // Glow & Effects
    glowClass: getGlowColor(condition, isDay, isPremium),
    weatherGlowClass: getWeatherGlowColor(condition, isDay, isPremium),

    // Decorative Elements
    decorativeBarClass: getDecorativeBarClass(condition, isDay, isPremium),
    highlightLineClass: getHighlightLineClass(condition, isDay, isPremium),

    // Interactive States
    buttonHoverClass: getButtonHoverBg(condition, isDay, isPremium),

    // Skeleton state
    skeletonBgClass: getSkeletonBgClass(condition, isDay, isPremium),

  };
};
