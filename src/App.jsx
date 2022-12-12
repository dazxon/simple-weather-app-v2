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
import { FLAG_URL } from "./apiData/search-city-api";
import { HeaderWeather } from "./components/header-weather";
import { useGeolocated } from "react-geolocated";


function App() {


  // current weather useState
  const [currentWeather, setCurrentWeather] = useState(null);

  // forecast weather useState
  const [forecastWeather, setForecastWeather] = useState(null);

  // country flag useState
  const [country, setCountry] = useState(" ");

  // geoWeather useState
  const [geoWeather, setGeoWeather] = useState(null);

  // geo location available
  const [geoLocationEnabled, setGeoLocationEnabled] = useState(false);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =

    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });


  const handleOnSearchChange = (searchData) => {
    // reseting the value as null, so when searchBar change value, also re renders them
    setCurrentWeather(null);
    setForecastWeather(null);

    //extracting las 2 digits of country name. example: Buenos Aires, AR - extracting: AR
    setCountry(searchData.label.slice(-2).toString());

    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_CURRENT_URL}lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}`
    );

    const forecastWeatherFetch = fetch(
      `${WEATHER_FORECAST_URL}lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}`
    );

    // I DO THIS BECAUSE IN SOME DEVICES THE GEOLOCATION OF DE PACKAGE REACT-GEOLOCATED CAN'T BE USED
    let geoWeatherFetch = 0
    if (coords !== undefined) {
      geoWeatherFetch = fetch(
        `${WEATHER_CURRENT_URL}lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${WEATHER_KEY}`
      );
    }

    Promise.all([currentWeatherFetch, forecastWeatherFetch, geoWeatherFetch])
      .then(async (response) => {
        const currentResponse = await response[0].json();
        const forecastResponse = await response[1].json();


        // IF GEOLOCATED IS ENABLED
        if (response[2] !== 0) {
          setGeoLocationEnabled(true)
          const geoResponse = await response[2].json();
          console.log(geoResponse)
          setGeoWeather({
            city: geoResponse.name,
            icon: geoResponse.weather[0].icon,
            weather_description: geoResponse.weather[0].description,
            current_temp: geoResponse.main.temp,
            feels_like: geoResponse.main.feels_like,
            humidity: geoResponse.main.humidity,
            pressure: geoResponse.main.pressure,
            visibility: geoResponse.visibility,
            wind_speed: geoResponse.wind.speed,
            clouds: geoResponse.clouds.all,

          });
        } else {
          console.log('Geolocation not available');
        }


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
        });

        //console.log(forecastResponse)
        setForecastWeather({ ...forecastResponse });

      })
      .catch((err) => console.log(err));
  };

  // FOR TESTING
  // console.log(currentWeather);
  // console.log(forecastWeather);
  // console.log(geoWeather);

  // this set the style for de background country flag
  const countryBg = {
    backgroundImage: `url('${FLAG_URL}${country}')`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="App" style={countryBg}>

      {geoWeather && <HeaderWeather data={geoWeather} />}

      <SearchCity onSearchChange={handleOnSearchChange} />

      {currentWeather && <CardWeather data={currentWeather} />}

      {forecastWeather && <ForecastWeatherV2 forecast={forecastWeather} />}

    </div>
  );
}

export default App;