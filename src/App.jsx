import "./App.css";
import { CardWeather } from "./components/card-weather";
import { SearchCity } from "./components/search-city";
import {
  WEATHER_CURRENT_URL,
  WEATHER_FORECAST_URL,
  WEATHER_KEY,
} from "./apiData/search-city-api";
import { useState } from "react";

import { ForecastWeatherV2 } from "./components/forecast-weather-v2";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    setCurrentWeather(null)
    setForecastWeather(null)
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_CURRENT_URL}lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}`
    );
    const forecastWeatherFetch = fetch(
      `${WEATHER_FORECAST_URL}lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const currentResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        //console.log(currentResponse)
        // setCurrentWeather({ ...currentResponse });
        setCurrentWeather({
          city: searchData.label,
          icon: currentResponse.weather[0].icon,
          weather_description: currentResponse.weather[0].description,
          current_temp: currentResponse.main.temp,
          feels_like: currentResponse.main.feels_like,
          humidity: currentResponse.main.humidity,
          pressure: currentResponse.main.pressure,
          visibility: currentResponse.visibility,
          wind_speed: currentResponse.wind.speed,
          clouds: currentResponse.clouds.all,
        })

        //console.log(forecastResponse)
        setForecastWeather({ ...forecastResponse, });
        
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecastWeather);


  return (
    <div className="App">
      <SearchCity onSearchChange={handleOnSearchChange} />

      {currentWeather && <CardWeather data={ currentWeather } />}

      {/* {forecastWeather && <ForecastWeather forecast={forecastWeather} />} */}

      {forecastWeather && <ForecastWeatherV2 forecast={ forecastWeather } />}
      
    </div>
  );
}

export default App;
