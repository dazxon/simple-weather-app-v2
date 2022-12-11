import React from "react";
import { WeatherExtended } from "../weather-extended";
import "./forecast-weather-v2.css";

const ForecastWeatherV2 = ({ forecast }) => {
  function getDay(timestamp) {
    const day = new Date(timestamp);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day.getDay()];
  }

  function getDayNumber(timestamp) {
    const day = new Date(timestamp);
    return day.getDate();
  }

  function getData(day, string) {
    let aux = 0;

    switch (string) {
      case "feels_like":
        for (let i = day * 8; i < day * 8 + 8; i++) {
          aux += forecast.list[i].main.feels_like;
        }
        aux = aux / 8;
        return aux;

      case "max_temp":
        let minNumber = Number.MIN_SAFE_INTEGER;

        for (let i = day * 8; i < day * 8 + 8; i++) {
          aux = forecast.list[i].main.temp_max;

          if (aux > minNumber) {
            minNumber = aux;
          }
        }
        return Math.round(minNumber);

      case "min_temp":
        let maxNum = Number.MAX_SAFE_INTEGER;

        for (let i = day * 8; i < day * 8 + 8; i++) {
          aux = forecast.list[i].main.temp_min;

          if (aux < maxNum) {
            maxNum = aux;
          }
        }

        return Math.round(maxNum);

      case "humidity":
        for (let i = day * 8; i < day * 8 + 8; i++) {
          aux += forecast.list[i].main.humidity;
        }
        aux = aux / 8;
        return Math.round(aux);

      case "visibility":
        for (let i = day * 8; i < day * 8 + 8; i++) {
          aux += forecast.list[i].visibility;
        }
        aux = aux / 8;
        return Math.round(aux);

      case "wind_speed":
        for (let i = day * 8; i < day * 8 + 8; i++) {
          aux += forecast.list[i].wind.speed;
        }
        aux = aux / 8;
        return Math.round(aux);

      case "clouds":
        for (let i = day * 8; i < day * 8 + 8; i++) {
          aux += forecast.list[i].clouds.all;
        }
        aux = aux / 8;
        return Math.round(aux);

      case "pressure":
        for (let i = day * 8; i < day * 8 + 8; i++) {
          aux += forecast.list[i].main.pressure;
        }
        aux = aux / 8;
        return Math.round(aux);

      default:
        break;
    }
  }

  let handleForecast = (e) => {
    return {
      feels_like: getData(e, "feels_like"),
      humidity: getData(e, "humidity"),
      pressure: getData(e, "pressure"),
      visibility: getData(e, "visibility"),
      wind_speed: getData(e, "wind_speed"),
      clouds: getData(e, "clouds"),
    };
  };

  function handleToggle(i) {
    document.getElementById(i).classList.toggle("hide");
  }

  function getBgImage(e) {
    switch (e) {

      case "01d":
        return "img-sunny-day";

      case "01n":
        return "img-sunny-day";

      case "02d":
        return "img-scattered-day";

      case "02n":
        return "img-scattered-day";

      case "03d":
        return "img-few-day";

      case "03n":
        return "img-few-day";

      default:
        break;
    }
  }

  function forecastDayCreator() {
    let result = [];

    for (let i = 0; i < 5; i++) {
      result.push(
        <div
          className={`CardWeather animation ${getBgImage(forecast.list[i * 8].weather[0].icon)}`}
          key={i}
          onClick={() => handleToggle(i)}
          forecast-day={i}
        >
          <div className="weather-forecast-container">
            <img
              className="weather-img"
              src={`icons/${forecast.list[i * 8].weather[0].icon}.png`}
              alt=""
            />
            <h3 className="weather-bottom-day">
              {getDay(forecast.list[i * 8].dt_txt)}{" "}
              {getDayNumber(forecast.list[i * 8].dt_txt)}
              <p>{forecast.list[i * 8].weather[0].description}</p>
            </h3>
            <div className="weather-max-min-container">
              <h4 className="weather-bottom-max-temp">
                {getData(i, "max_temp")}°
              </h4>
              <h6 className="weather-bottom-min-temp">
                {getData(i, "min_temp")}°
              </h6>
            </div>
          </div>

          <div id={i} className="hide">
            <WeatherExtended data={handleForecast(i)} />
          </div>
        </div>
      );
    }

    return [result];
  }
  return [forecastDayCreator()];
};

export { ForecastWeatherV2 };
