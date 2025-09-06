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
  getPopupBorderColor,
  getWeatherBgClass,
  getWeatherBorderClass,
  getWeatherGlowColor,
  getWeatherIcon
} from '@/utils/weatherCssPreset';

export const useWeatherStyle = (condition: WeatherCondition | undefined, isDay: boolean, isHovered = false) => {
  const premium = true; // Demo purpose, replace with actual state if needed

  return {
    // Icon & Visual Elements
    icon: getWeatherIcon(condition, isDay),
    iconBgClass: getIconBgColor(condition, isDay, premium),
    accentColor: getAccentColor(condition, isDay, premium),

    // Background Classes
    bgClass: getWeatherBgClass(condition, isDay, isHovered, premium),
    popupBgClass: getPopupBgColor(condition, isDay, premium),
    headerBgClass: getHeaderBg(condition, isDay, premium),
    dropdownBgClass: getDropdownBgClass(condition, isDay, premium),

    // Border Classes
    borderClass: getWeatherBorderClass(condition, isDay, isHovered, premium),
    popupBorderClass: getPopupBorderColor(condition, isDay, premium),
    dropdownBorderClass: getDropdownBorderClass(condition, isDay, premium),
    arrowBorderClass: getArrowBorderColor(condition, isDay, premium),

    // Glow & Effects
    glowClass: getGlowColor(condition, isDay, premium),
    weatherGlowClass: getWeatherGlowColor(condition, isDay, premium),

    // Decorative Elements
    decorativeBarClass: getDecorativeBarClass(condition, isDay, premium),
    highlightLineClass: getHighlightLineClass(condition, isDay, premium),

    // Interactive States
    buttonHoverClass: getButtonHoverBg(condition, isDay, premium),

    // Premium state
    isPremium: premium
  };
};
