import { useState, useCallback } from 'react';
import Search from './components/search/Search';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Forecast from './components/forecast/Forecast.jsx';
import { WEATHER_API_URL } from './apis/Api.js';

const WeatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY;

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOnSearchChange = useCallback((searchData) => {
    if (!WeatherAPIKey) {
      setError('API key is missing. Please check your environment variables.');
      return;
    }

    const [lat, lon] = searchData.value.split(' ');

    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [currentWeatherResponse, forecastResponse] = await Promise.all([
          fetch(
            `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WeatherAPIKey}&units=metric`
          ),
          fetch(
            `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WeatherAPIKey}&units=metric`
          ),
        ]);

        if (!currentWeatherResponse.ok || !forecastResponse.ok) {
          throw new Error('Failed to fetch weather data.');
        }

        const weatherData = await currentWeatherResponse.json();
        const forecastData = await forecastResponse.json();

        setCurrentWeather({ city: searchData.label, ...weatherData });
        setForecast({ city: searchData.label, ...forecastData });
      } catch (err) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <Search onSearchChange={handleOnSearchChange} />
      {loading && <p className='text-center text-blue-500'>Loading...</p>}
      {error && <p className='text-center text-red-500'>{error}</p>}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}
