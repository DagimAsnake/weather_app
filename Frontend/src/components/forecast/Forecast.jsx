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
    <>
      <label className="text-xl font-bold">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="flex items-center bg-gray-100 rounded-lg h-10 my-2 px-5 cursor-pointer text-sm">
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    className="w-10"
                    alt="weather"
                  />
                  <label className="flex-1 ml-4 font-semibold text-gray-800">
                    {forecastDays[idx]}
                  </label>
                  <label className="flex-1 text-right mr-4 text-gray-600">
                    {item.weather[0].description}
                  </label>
                  <label className="text-gray-500">
                    {Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="grid grid-cols-2 gap-x-4 px-4 py-2">
                <div className="flex justify-between items-center h-8">
                  <label className="text-gray-500">Pressure:</label>
                  <label className="text-gray-800">{item.main.pressure}</label>
                </div>
                <div className="flex justify-between items-center h-8">
                  <label className="text-gray-500">Humidity:</label>
                  <label className="text-gray-800">{item.main.humidity}</label>
                </div>
                <div className="flex justify-between items-center h-8">
                  <label className="text-gray-500">Clouds:</label>
                  <label className="text-gray-800">{item.clouds.all}%</label>
                </div>
                <div className="flex justify-between items-center h-8">
                  <label className="text-gray-500">Wind speed:</label>
                  <label className="text-gray-800">{item.wind.speed} m/s</label>
                </div>
                <div className="flex justify-between items-center h-8">
                  <label className="text-gray-500">Sea level:</label>
                  <label className="text-gray-800">{item.main.sea_level}m</label>
                </div>
                <div className="flex justify-between items-center h-8">
                  <label className="text-gray-500">Feels like:</label>
                  <label className="text-gray-800">{item.main.feels_like}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
