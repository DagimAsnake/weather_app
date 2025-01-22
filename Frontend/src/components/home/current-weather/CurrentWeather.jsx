import React from "react";

const CurrentWeather = ({ data }) => {
  return (
    <div className="max-w-md mx-auto bg-black text-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{data.city}</h1>
          <p className="text-sm capitalize">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="w-20 h-20"
          src={`https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`}
        />
      </div>
      <div className="mt-6">
        <p className="text-6xl font-bold">{Math.round(data.main.temp)}°C</p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Feels like:</span>
            <span className="text-sm font-semibold">{Math.round(data.main.feels_like)}°C</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Wind:</span>
            <span className="text-sm font-semibold">{data.wind.speed} m/s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Humidity:</span>
            <span className="text-sm font-semibold">{data.main.humidity}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Pressure:</span>
            <span className="text-sm font-semibold">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
