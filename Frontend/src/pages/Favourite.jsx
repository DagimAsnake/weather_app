import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavourite,
  removeFavourite,
  getFavourites,
} from '../state/favourite/favouriteSlice';
import { WEATHER_API_URL } from '../apis/Api';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';
import { AiOutlineCloud } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';

const WeatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY;

const Favourite = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );
  const favourites = useSelector((state) => state.favourite.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch]);

  useEffect(() => {
    const fetchCityWeather = async () => {
      if (!WeatherAPIKey) {
        setError(
          'API key is missing. Please check your environment variables.'
        );
        return;
      }

      try {
        const promises = favourites.map((fav) =>
          fetch(
            `${WEATHER_API_URL}/weather?q=${fav.city},${fav.country}&appid=${WeatherAPIKey}&units=metric`
          ).then((response) => {
            if (!response.ok) {
              console.error(
                `Error fetching weather for ${fav.city}, ${fav.country}`
              );
              return { name: fav.city, error: true }; // Fallback for missing data
            }
            return response.json();
          })
        );

        const results = await Promise.all(promises);
        setWeatherData(results);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch weather data. Please try again.');
      }
    };

    if (favourites.length > 0) {
      fetchCityWeather();
    }
  }, [favourites]);

  const isCityFavourite = (city) => {
    return favourites.some(
      (fav) => fav.city === city.name && fav.country === city.sys.country
    );
  };

  const handleFavouriteToggle = (city) => {
    if (!isAuthenticated) {
      toast.warning('Please log in to manage your favourite locations!');
      return;
    }

    if (isCityFavourite(city)) {
      dispatch(removeFavourite({ city: city.name, country: city.sys.country }));
    } else {
      dispatch(addFavourite({ city: city.name, country: city.sys.country }));
    }
  };

  if (error) {
    return <p className='text-red-500 text-center'>{error}</p>;
  }

  return (
    <>
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar />
      <div className='container mx-auto mt-6 min-h-screen bg-white p-6'>
        <h2 className='text-3xl font-bold text-center mb-5 text-black'>
          Favourite Locations
        </h2>
        {weatherData.length === 0 ? (
          <div className='flex flex-col items-center justify-center text-center py-20'>
            <AiOutlineCloud className='text-gray-400' size={60} />
            <p className='mt-4 text-lg font-medium text-gray-700'>
              No favourite locations selected yet.
            </p>
            <p className='text-gray-500'>
              Add your favourite cities to track their weather instantly.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {weatherData.map((cityWeather, index) => (
              <div
                key={index}
                className='w-full bg-black text-white rounded-xl shadow-lg p-6'
              >
                <div className='flex justify-between items-center'>
                  <div>
                    <h1 className='text-2xl font-bold'>
                      {cityWeather.name}, {cityWeather.sys.country}
                    </h1>
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
                <div
                  onClick={() => handleFavouriteToggle(cityWeather)}
                  className='cursor-pointer flex justify-center items-center mt-4'
                >
                  {isCityFavourite(cityWeather) ? (
                    <BsFillHeartFill className='text-red-500' size={30} />
                  ) : (
                    <BsHeart className='text-white' size={30} />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favourite;
