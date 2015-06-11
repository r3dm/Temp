import React from 'react'
import Radium from 'radium'
import Header from './header.js'
import ForecastToday from './forecastToday.js'
import ForecastFooter from './forecastFooter.js'

var styles = {
  base: {
    height: '100%',
    color: 'white',
    fontFamily: '"Comfortaa-Light", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap'
  }
}

class Home extends React.Component {
  render() {
    return (
      <div style={styles.base} >
        <Header
          cityName={ this.props.forecast.cityName }
          temp={ this.props.temp } />
        <ForecastToday
          currentConditions = { this.props.forecast.currentConditions }
          temp={ this.props.temp } />
        <ForecastFooter temp={ this.props.temp } />
      </div>
    )
  }
}
Home.propTypes = {
  forecast: React.PropTypes.object,
  temp: React.PropTypes.number
}

export default new Radium(Home)
