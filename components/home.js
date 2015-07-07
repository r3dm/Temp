import React from 'react'
import Radium from 'radium'
import Header from './header.js'
import ForecastToday from './forecastToday.js'
import ForecastFiveDay from './forecastFiveDay.js'
import convertTemp from '../utils/convertTemp.js'

var styles = {
  base: {
    height: '100%',
    color: 'white',
    fontFamily: '"Comfortaa-Light", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap'
  },
  footer: {
    color: 'white',
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'row',
    zIndex: 1
  }
}

class Home extends React.Component {
  render() {
    let fiveDayForecast = this.props.state.fiveDayForecast.slice(1, 5)
    return (
      <div style={styles.base} >
        <Header
          cityName={ this.props.state.cityName }
          country={ this.props.state.country }
          temp={ this.props.state.temp }
          units={ this.props.state.units } />
        <ForecastToday
          conditionsId = { this.props.state.weather.weather[0].id }
          currentConditions = { this.props.state.currentConditions }
          forecasts = { this.props.state.hourlyForecast }
          temp={ this.props.state.temp }
          units={ this.props.state.units } />
        <div style={styles.footer} >
          { fiveDayForecast.map((f, index) => {
            let high = this.props.state.units === 'metric' ?
                                  convertTemp.toCelsius(f.temp.max) :
                                  Math.round(f.temp.max)
            let low = this.props.state.units === 'metric' ?
                                  convertTemp.toCelsius(f.temp.min) :
                                  Math.round(f.temp.min)
            return (
              <ForecastFiveDay
                conditionsId={f.weather[0].id}
                high={high}
                key={index}
                low={low}
                time={f.dt}
                units={this.props.state.units} />
            )
          })}
        </div>
      </div>
    )
  }
}
Home.propTypes = {
  state: React.PropTypes.object
}

export default new Radium(Home)
