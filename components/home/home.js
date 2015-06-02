import React from 'react'
import Header from '../header/header.js'
import ForecastToday from '../forecast-today/forecastToday.js'
import ForecastFooter from '../forecast-footer/forecastFooter.js'

let Home = React.createClass({
  render: function () {
    return (
      <div className="home-wrapper">
        <Header />
        <ForecastToday />
        <ForecastFooter />
      </div>
    )
  }
})

export default Home
