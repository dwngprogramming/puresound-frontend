import publicApiClient from "@/libs/axios/publicApiClient";
import {WeatherResponse} from "@/models/weather/WeatherResponse";
import {ApiResponse} from "@/models/ApiResponse";

const currentWeatherApi = {
  getCurrentWeather: (latitude: number, longitude: number) =>
    publicApiClient.get<ApiResponse<WeatherResponse>>('/v1/weather/current', {
      params: {latitude: latitude, longitude: longitude}
    }),
}

export default currentWeatherApi;
