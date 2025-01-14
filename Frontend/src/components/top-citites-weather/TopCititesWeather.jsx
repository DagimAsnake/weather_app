import React, { useEffect, useState } from 'react';
import { WEATHER_API_URL } from '../../apis/Api';

const WeatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY;

const cities = [
  { name: 'New York', country: 'US' },
  { name: 'London', country: 'GB' },
  { name: 'Tokyo', country: 'JP' },
  { name: 'Paris', country: 'FR' },
  { name: 'Sydney', country: 'AU' },
  { name: 'Dubai', country: 'AE' },
  { name: 'Singapore', country: 'SG' },
  { name: 'Istanbul', country: 'TR' },
  { name: 'Rome', country: 'IT' },
];

const TopCitiesWeather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityWeather = async () => {
      if (!WeatherAPIKey) {
        setError(
          'API key is missing. Please check your environment variables.'
        );
        return;
      }

      try {
        const promises = cities.map((city) =>
          fetch(
            `${WEATHER_API_URL}/weather?q=${city.name},${city.country}&appid=${WeatherAPIKey}&units=metric`
          ).then((response) => response.json())
        );

        const results = await Promise.all(promises);
        setWeatherData(results);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again.');
      }
    };

    fetchCityWeather();
  }, []);

  if (error) {
    return <p className='text-red-500 text-center'>{error}</p>;
  }

  return (
    <div className='container mx-auto mt-6'>
      <h2 className='text-3xl font-bold text-center mb-5 text-black'>
        Today's Weather in Top Cities
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {weatherData.map((cityWeather, index) => (
          <div
            key={index}
            className='w-full bg-black text-white rounded-xl shadow-lg p-6'
          >
            <div className='flex justify-between items-center'>
              <div>
                <h1 className='text-2xl font-bold'>{cityWeather.name}</h1>
                <p className='text-sm capitalize'>
                  {cityWeather.weather?.[0]?.description}
                </p>
              </div>
              <img
                alt='weather'
                className='w-20 h-20'
                src={`https://openweathermap.org/img/wn/${cityWeather.weather?.[0]?.icon}@2x.png`}
              />
            </div>
            <div className='mt-6'>
              <p className='text-6xl font-bold'>
                {Math.round(cityWeather.main?.temp)}°C
              </p>
              <div className='mt-4 space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-sm'>Feels like:</span>
                  <span className='text-sm font-semibold'>
                    {Math.round(cityWeather.main?.feels_like)}°C
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm'>Wind:</span>
                  <span className='text-sm font-semibold'>
                    {cityWeather.wind?.speed} m/s
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm'>Humidity:</span>
                  <span className='text-sm font-semibold'>
                    {cityWeather.main?.humidity}%
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm'>Pressure:</span>
                  <span className='text-sm font-semibold'>
                    {cityWeather.main?.pressure} hPa
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCitiesWeather;
