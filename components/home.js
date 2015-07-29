import React from 'react'
import Radium from 'radium'
import Header from './header.js'
import ForecastToday from './forecastToday.js'
import ForecastFiveDay from './forecastFiveDay.js'

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
          humidity = { this.props.state.weather.main.humidity }
          temp={ this.props.state.temp }
          units={ this.props.state.units } />
        <div style={styles.footer} >
          { fiveDayForecast.map((f, index) => {
            return (
              <ForecastFiveDay
                conditionsId={f.weather[0].id}
                high={f.temp.max}
                key={index}
                low={f.temp.min}
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
