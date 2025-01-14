import { useState, useCallback } from 'react';
import Search from '../search/Search.jsx';
import CurrentWeather from '../current-weather/CurrentWeather.jsx';
import Forecast from '../forecast/Forecast.jsx';
import { WEATHER_API_URL } from '../../apis/Api.js';
import TopCitiesWeather from '../top-citites-weather/TopCititesWeather.jsx';

const WeatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY;

const Home = () => {
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
    <div className='min-h-screen bg-white flex flex-col items-center justify-center p-6'>
      <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-2xl'>
        <Search onSearchChange={handleOnSearchChange} />
      </div>
      {loading && <p className='text-center text-blue-600 mt-4'>Loading...</p>}
      {error && <p className='text-center text-red-600 mt-4'>{error}</p>}
      <div className='mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-4xl'>
        {currentWeather && (
          <div className=' rounded-lg'>
            <CurrentWeather data={currentWeather} />
          </div>
        )}
        {forecast && (
          <div className='bg-white shadow-md rounded-lg p-6'>
            <Forecast data={forecast} />
          </div>
        )}
      </div>
      <TopCitiesWeather />
    </div>
  );
};

export default Home;
