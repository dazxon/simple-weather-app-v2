import React from "react";
import "./search-city.css";
import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import {
  WEATHER_GEO_MIN_POPULATION,
  WEATHER_GEO_URL,
} from "../../apiData/search-city-api";

function SearchCity({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "939cc349c5msha4623937a7cd2e6p1ff222jsn994beeaf6335",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  const loadOptions = (inputValue) => {
    return (
      fetch(
        `${WEATHER_GEO_URL}minPopulation=${WEATHER_GEO_MIN_POPULATION}&namePrefix=${inputValue}`,
        options
      )
        .then((response) => response.json())
        // GeoDB needs an array of objects as options to work properly
        .then((response) => {
          return {
            options: response.data.map((city) => {
              return {
                //We need latitud and longitud for OpenWeatherApi, we get that from de GeoDB from RapidApi
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name}, ${city.countryCode}`,
              };
            }),
          };
        })
        .catch((err) => console.error(err))
    );
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    //WITH ASYNCPAGINATE
    <AsyncPaginate
      placeholder="Search city"
      // debounce so it take time to make de api request
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      className="searchBar scale-up-top"
    />
  );
}

export { SearchCity };
