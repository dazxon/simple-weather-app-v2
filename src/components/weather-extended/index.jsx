import React from 'react';
import './weather-extended.css'

const WeatherExtended = ({ data }) => {

    return(

      <div className='WeatherExtended'>
      
            <div className="weather-top-extended">
              <div className="weather-top-extended-left">
                <p>
                  Sensation: <span>{Math.round(data.feels_like)}°C</span>
                </p>
                <p>
                  Humidity: <span>{data.humidity}%</span>
                </p>
                <p>
                  Pressure: <span>{data.pressure} hPa</span>
                </p>
              </div>

              <div className="weather-top-extended-right">
                <p>
                  Visibility: <span>{data.visibility} Mts</span>
                </p>
                <p>
                  Wind speed: <span>{data.wind_speed} m/s</span>
                </p>
                <p>
                  Clouds: <span>{data.clouds} </span>
                </p>
              </div>
            </div>



          {/* {toggleContainer && (
            <div className="toggle-container vibrate-1">
              <i
                className="fa-solid fa-angles-up toggle-button"
                onClick={() => setToggleContainer(!toggleContainer)}
              ></i>
            </div>
          )}

          {!toggleContainer && (
            <div className="toggle-container vibrate-1">
              <i
                className="fa-solid fa-angles-down toggle-button"
                onClick={() => setToggleContainer(!toggleContainer)}
              ></i>
            </div>
          )} */}
          </div>
    )
}

export { WeatherExtended }