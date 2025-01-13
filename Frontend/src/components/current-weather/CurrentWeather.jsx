import React from "react";

const CurrentWeather = ({ data }) => {
  return (
    <div className="max-w-xs bg-gray-800 text-white rounded-lg shadow-xl mx-auto mt-5 p-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg tracking-wide m-0">{data.city}</p>
          <p className="text-sm font-normal m-0">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="w-24"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="flex justify-between items-center mt-5">
        <p className="text-6xl font-bold tracking-tighter">
          {Math.round(data.main.temp)}°C
        </p>
        <div className="w-full pl-5">
          <div className="flex justify-between border-b border-white pb-1">
            <span className="text-xs font-medium">Details</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs font-medium">Feels like</span>
            <span className="text-xs font-semibold">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs font-medium">Wind</span>
            <span className="text-xs font-semibold">{data.wind.speed} m/s</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs font-medium">Humidity</span>
            <span className="text-xs font-semibold">{data.main.humidity}%</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs font-medium">Pressure</span>
            <span className="text-xs font-semibold">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
