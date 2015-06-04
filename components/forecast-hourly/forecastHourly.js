import React from 'react'

let ForecastHourly = React.createClass({
  render() {
    return (
      <div className="forecast-hourly-wrapper">
        <div>
          3:00pm
        </div>
        <i className="wi wi-rain"></i>
        <div>
          65&deg;
        </div>
      </div>
    )
  }
})

export default ForecastHourly
