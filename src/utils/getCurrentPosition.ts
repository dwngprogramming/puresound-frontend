import {GeocodingRequest} from "@/models/location/GeocodingRequest";

export const getCurrentPosition = (): Promise<GeocodingRequest> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: Number(position.coords.latitude.toFixed(2)),
          longitude: Number(position.coords.longitude.toFixed(2))
        });
      },
      (error) => {
        console.log("Error getting geolocation:", error);
        reject(error);
      },
      {timeout: 10000}
    );
  });
};
