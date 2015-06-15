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
          cityName={ this.props.state.cityName }
          country={ this.props.state.country }
          temp={ this.props.state.temp } />
        <ForecastToday
          currentConditions = { this.props.state.currentConditions }
          forecasts = { this.props.state.fiveDayForecast }
          temp={ this.props.state.temp } />
        <ForecastFooter temp={ this.props.state.temp } />
      </div>
    )
  }
}
Home.propTypes = {
  state: React.PropTypes.object
}

export default new Radium(Home)
