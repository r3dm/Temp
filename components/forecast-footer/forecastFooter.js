import React from 'react'

let ForecastToday = React.createClass({
  render() {
    return (
      <div className="forecast-footer-wrapper">
        <div className="1-day-forecast">
          <h3>tue</h3>
          <i className="wi wi-rain"></i>
          <p>66/58</p>
        </div>
        <div className="1-day-forecast">
          <h3>wed</h3>
          <i className="wi wi-cloudy"></i>
          <p>66/58</p>
        </div>
        <div className="1-day-forecast">
          <h3>thu</h3>
          <i className="wi wi-day-cloudy"></i>
          <p>66/58</p>
        </div>
        <div className="1-day-forecast">
          <h3>fri</h3>
          <i className="wi wi-day-sunny"></i>
          <p>66/58</p>
        </div>
      </div>
    )
  }
})

export default ForecastToday
