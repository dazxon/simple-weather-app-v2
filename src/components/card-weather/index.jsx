import React from "react";
import "./card-weather.css";
import { useState } from "react";
import { WeatherExtended } from "../weather-extended";

function CardWeather({ data }) {
  const [toggleContainer, setToggleContainer] = useState(false);

  function getBgImage() {
    switch (data.icon) {

      case "01d":
        return "img-sunny-day";

      case "01n":
        return "img-sunny-night";

      case "02d":
        return "img-scattered-day";

      case "02n":
        return "img-scattered-night";

      case "03d":
        return "img-few-day";

      case "03n":
        return "img-few-night";

      default:
        break;
    }
  }

  return (
    <>
      <div
        className={`CardWeather slide-in-top ${getBgImage()}`}
        onClick={() => setToggleContainer(!toggleContainer)}
      >
        <div className="weather-top-container ">
          <div className="weather-top">
            <div className="weather-top-left-left">
              <img
                className="weather-img"
                src={`icons/${data.icon}.png`}
                alt="weather"
              />
            </div>

            <div className="weather-top-left-right">
              <h3 className="weather-description">
                {data.weather_description}
              </h3>
              <h5 className="weather-location">{data.city}</h5>
            </div>

            <div className="weather-top-right">
              <h2 className="weather-temp">
                {Math.round(data.current_temp)}°C
              </h2>
            </div>
          </div>

          {toggleContainer && <WeatherExtended data={data} />}
        </div>
      </div>
    </>
  );
}

export { CardWeather };
