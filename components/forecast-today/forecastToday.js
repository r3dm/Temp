import React from 'react'

let ForecastToday = React.createClass({
  render() {
    return (
      <div className="forecast-today-wrapper">
        <div className="main-temp-wrapper">
          <span className="temperature">64</span>
          <span className="degrees">&deg;</span>
        </div>

        <div className="forecast-and-chance">
          <div>
            <i className="cloudy"></i>
            <p>rainy</p>
          </div>
          <i className="wi wi-day-lightning"></i>

          <span className="divider">|</span>

          <div>
            <i className="cloudy"></i>
            <p>100%</p>
          </div>
        </div>
      </div>
    )
  }
})

export default ForecastToday
