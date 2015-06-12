import React from 'react'
import ForecastHourly from './forecastHourly.js'
import ForecastNow from './forecastNow.js'
import Radium from 'radium'
import Color from 'color'

var styles = {
  base: {
    flexGrow: 1,
    overflowY: 'scroll',
    overflowX: 'hidden'
  },

  overflowDiv: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: '55vh'
  }
}

class ForecastToday extends React.Component {
  constructor(props) {
    super(props)
    this.state = { overflowHeight: '55vh' }
  }

  componentDidMount() {
    var todayDivHeight = document.getElementById('todayDiv').clientHeight
    var mainDividerHeight = document.getElementById('mainDivider').clientHeight
    this.setState({
      overflowHeight: todayDivHeight - mainDividerHeight - 30
    })
  }

  render() {
    styles.overflowDiv.height = this.state.overflowHeight
    var forecasts = this.props.forecasts
    if(forecasts && forecasts.length > 8) {
      forecasts = forecasts.slice(1, 9)
    }

    return (
      <div
        id="todayDiv"
        style={styles.base} >

        <ForecastNow
          currentConditions = { this.props.currentConditions }
          temp = { this.props.temp } />

        <div style={styles.overflowDiv} >
          {forecasts.map((f, index) => {
            return (
              <ForecastHourly
                key={index}
                temp={f.main.temp}
                time={f.dt_txt}
                weather={f.weather[0].main} />
            )
          })}
        </div>
      </div>
    )
  }
}
ForecastToday.propTypes = {
  currentConditions: React.PropTypes.string,
  forecasts: React.PropTypes.array,
  temp: React.PropTypes.number
}

export default new Radium(ForecastToday)
