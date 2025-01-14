import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <div className="max-w-md mx-auto mt-6">
    <h2 className="text-xl font-bold text-center mb-4">Weekly Forecast</h2>
    <Accordion allowZeroExpanded>
      {data.list.slice(0, 7).map((item, idx) => (
        <AccordionItem key={idx}>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="flex items-center bg-white rounded-lg shadow-md p-4 mb-2">
                <img
                  src={`icons/${item.weather[0].icon}.png`}
                  className="w-12"
                  alt="weather"
                />
                <span className="ml-4 text-gray-800 font-semibold flex-1">{forecastDays[idx]}</span>
                <span className="text-gray-600">{item.weather[0].description}</span>
                <span className="ml-4 text-gray-800 font-semibold">
                  {Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C
                </span>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="grid grid-cols-2 gap-4 text-sm p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between">
                <span>Pressure:</span>
                <span>{item.main.pressure} hPa</span>
              </div>
              <div className="flex justify-between">
                <span>Humidity:</span>
                <span>{item.main.humidity}%</span>
              </div>
              <div className="flex justify-between">
                <span>Clouds:</span>
                <span>{item.clouds.all}%</span>
              </div>
              <div className="flex justify-between">
                <span>Wind Speed:</span>
                <span>{item.wind.speed} m/s</span>
              </div>
              <div className="flex justify-between">
                <span>Sea Level:</span>
                <span>{item.main.sea_level}m</span>
              </div>
              <div className="flex justify-between">
                <span>Feels Like:</span>
                <span>{item.main.feels_like}°C</span>
              </div>
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
  );
};

export default Forecast;
