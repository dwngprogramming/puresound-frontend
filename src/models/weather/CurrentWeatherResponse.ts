import {WeatherCondition} from "@/const/WeatherCondition";

export interface CurrentWeatherResponse {
  tempC: number,
  tempF: number,
  isDay: boolean,
  condition: WeatherCondition,
}
