import publicApi from "@/libs/axios/publicApi";
import {WeatherResponse} from "@/models/weather/WeatherResponse";
import {ApiResponse} from "@/models/ApiResponse";

const currentWeatherApi = {
  getCurrentWeather: (latitude: number, longitude: number) =>
    publicApi.get<ApiResponse<WeatherResponse>>('/v1/weather/current', {
      params: {latitude: latitude, longitude: longitude}
    }),
}

export default currentWeatherApi;
