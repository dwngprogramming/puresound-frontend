import {
  getAccentColor,
  getButtonHoverBg,
  getDropdownBgClass,
  getDropdownBorderClass,
  getWeatherGlowColor
} from "@/utils/weatherCssPreset";
import {WeatherInfo} from "@/components/Listener/Common/Header/Weather/WeatherMood";
import {Music, RefreshCw, Settings} from "lucide-react";

interface WeatherDropdownProps {
  weather: WeatherInfo;
  showDropdown: boolean;
  handleShowDropdown: (show: boolean) => void;
}

const WeatherDropdown = ({weather, showDropdown, handleShowDropdown}: WeatherDropdownProps) => {
  const dropdownItems = [
    {
      icon: <Music className="w-4 h-4" />,
      label: 'Generate Playlist',
      action: () => {
        console.log('Generate playlist for weather:', weather.condition);
        handleShowDropdown(false);
      }
    },
    {
      icon: <RefreshCw className="w-4 h-4" />,
      label: 'Refresh Weather',
      action: () => {
        console.log('Refresh weather data');
        handleShowDropdown(false);
      }
    },
    {
      icon: <Settings className="w-4 h-4" />,
      label: 'Weather Settings',
      action: () => {
        console.log('Open weather settings');
        handleShowDropdown(false);
      }
    }
  ];

  return (
    <div className={`
        absolute top-full left-0 right-0 mt-2 z-50
        ${getDropdownBgClass(weather.condition)}
        backdrop-blur-xl border ${getDropdownBorderClass(weather.condition)}
        rounded-2xl shadow-2xl shadow-black/30
        overflow-hidden
        transform transition-all duration-300 ease-out origin-top
        ${showDropdown
      ? 'opacity-100 scale-y-100 translate-y-0'
      : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
    }
      `}>

      {/* Dropdown glow effect */}
      <div className={`
          absolute inset-0 rounded-2xl 
          bg-gradient-to-r ${getWeatherGlowColor(weather.condition)}
          blur-xl -z-10
        `}/>

      {/* Dropdown Items */}
      <div className="relative p-2">
        {dropdownItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className={`
                w-full flex items-center space-x-3
                px-4 py-3 rounded-xl
                text-white text-sm font-medium
                ${getButtonHoverBg(weather.condition)}
                border border-transparent hover:border-white/10
                transition-all duration-200
                group
              `}
          >
              <span className={`
                ${getAccentColor(weather.condition)} 
                group-hover:scale-110 transition-transform duration-200
              `}>
                {item.icon}
              </span>
            <span className="flex-1 text-left">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Bottom decoration line */}
      <div
        className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
    </div>
  )
}

export default WeatherDropdown;
