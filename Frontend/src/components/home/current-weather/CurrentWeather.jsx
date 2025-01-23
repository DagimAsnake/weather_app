import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from '../../../state/favourite/favouriteSlice';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';

const CurrentWeather = ({ data }) => {
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );
  const favourites = useSelector((state) => state.favourite.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch]);

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

  return (
    <>
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar />
      <div className='max-w-md mx-auto bg-black text-white rounded-xl shadow-lg p-6'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-2xl font-bold'>{data.city}</h1>
            <p className='text-sm capitalize'>{data.weather[0].description}</p>
          </div>
          <img
            alt='weather'
            className='w-20 h-20'
            src={`https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`}
          />
        </div>
        <div className='mt-6'>
          <p className='text-6xl font-bold'>{Math.round(data.main.temp)}°C</p>
          <div className='mt-4 space-y-2'>
            <div className='flex justify-between'>
              <span className='text-sm'>Feels like:</span>
              <span className='text-sm font-semibold'>
                {Math.round(data.main.feels_like)}°C
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>Wind:</span>
              <span className='text-sm font-semibold'>
                {data.wind.speed} m/s
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>Humidity:</span>
              <span className='text-sm font-semibold'>
                {data.main.humidity}%
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>Pressure:</span>
              <span className='text-sm font-semibold'>
                {data.main.pressure} hPa
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={() => handleFavouriteToggle(data)}
          className='cursor-pointer flex justify-center items-center mt-4'
        >
          {isCityFavourite(data) ? (
            <BsFillHeartFill className='text-red-500' size={30} />
          ) : (
            <BsHeart className='text-white' size={30} />
          )}
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
