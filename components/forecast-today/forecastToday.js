import React from 'react'
import ForecastHourly from '../forecast-hourly/forecastHourly.js'

let ForecastToday = React.createClass({
  render() {
    return (
      <div className="forecast-top-offset">
        <div className="forecast-today-wrapper">
          <div className="main-temp-wrapper">
            <span className="temperature">64</span>
            <span className="degrees">&deg;</span>
          </div>

          <div className="forecast-and-chance">
            <div>
              <i className="wi wi-rain"></i>
              <p>rainy</p>
            </div>

            <div className="divider"></div>

            <div>
              <i className="wi wi-sprinkles"></i>
              <p>100%</p>
            </div>
          </div>
        </div>
        <ForecastHourly />
        <ForecastHourly />
        <ForecastHourly />
        <ForecastHourly />
        <ForecastHourly />
        <ForecastHourly />
      </div>
    )
  }
})

export default ForecastToday
