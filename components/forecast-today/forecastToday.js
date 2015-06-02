import React from 'react'

let ForecastToday = React.createClass({
  render() {
    return (
      <div className="forecast-today-wrapper">
        <h2 className="temperature">64 &deg;</h2>
        <i className="cloudy"></i>
        <p>rainy</p>
        <i className="cloudy"></i>
        <p>100%</p>
      </div>
    )
  }
})

export default ForecastToday
