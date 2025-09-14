import {LocationResponse} from "@/models/location/LocationResponse";
import {CurrentWeatherResponse} from "@/models/weather/CurrentWeatherResponse";

export interface WeatherResponse {
  location: LocationResponse;
  current: CurrentWeatherResponse;
}
