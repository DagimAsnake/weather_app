const WeatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY;
const RapidAPIkey = import.meta.env.VITE_RAPID_API_kEY;

export const GeoApiOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": RapidAPIkey,
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };
  export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
  
  export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
  export const WEATHER_API_KEY = WeatherAPIKey
  