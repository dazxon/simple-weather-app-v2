import React from "react";
import "./header-weather.css";

const HeaderWeather = ({ data }) => {

  return (
    <header className="HeaderWeather">
      <img src={`icons/${data.icon}.png`} alt="" className="icon"/>
      <p>{data.weather_description}</p>
      <p>{Math.trunc(data.feels_like)}°C</p>
      <p>{data.city}</p>
    </header>
  );
};

export { HeaderWeather };
