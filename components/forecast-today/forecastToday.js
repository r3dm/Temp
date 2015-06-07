import React from 'react'
import ForecastHourly from '../forecast-hourly/forecastHourly.js'

let ForecastToday = React.createClass({
  render() {
    return (
      <div className="forecast-top-offset">
        <div className="forecast-today-wrapper">
          <div className="main-temp-wrapper">
            <span className="temperature">
              { this.props.temp }
            </span>
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

        <div className="main-bars">
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="overflow-div">
          <ForecastHourly color="#4c869b" time="3:00pm" temperature="65" forecast="rain" />
          <ForecastHourly color="#5aa0ba" time="4:00pm" temperature="66" forecast="cloudy" />
          <ForecastHourly color="#5aa0ba" time="5:00pm" temperature="66" forecast="cloudy" />
          <ForecastHourly color="#77b3c9" time="6:00pm" temperature="67" forecast="day-cloudy" />
          <ForecastHourly color="#77b3c9" time="7:00pm" temperature="67" forecast="day-cloudy" />
          <ForecastHourly color="#94cade" time="8:00pm" temperature="68" forecast="day-sunny" />
          <ForecastHourly color="#94cade" time="9:00pm" temperature="68" forecast="day-sunny" />
          <ForecastHourly color="#b6e5f7" time="10:00pm" temperature="69" forecast="cloudy" />
          <ForecastHourly color="#b6e5f7" time="11:00pm" temperature="69" forecast="cloudy" />
        </div>
      </div>
    )
  }
})

export default ForecastToday
