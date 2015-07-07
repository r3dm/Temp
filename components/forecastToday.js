import React from 'react'
import ForecastHourly from './forecastHourly.js'
import ForecastNow from './forecastNow.js'
import Radium from 'radium'
import convertTemp from '../utils/convertTemp.js'

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
  componentDidMount() {
    var todayDivHeight = document.getElementById('todayDiv').clientHeight
    var mainDividerHeight = document.getElementById('mainDivider').clientHeight
    this.setState({
      overflowHeight: todayDivHeight - mainDividerHeight - 30
    })
  }

  constructor(props) {
    super(props)
    this.state = { overflowHeight: '55vh' }
  }

  render() {
    styles.overflowDiv.height = this.state.overflowHeight
    var forecasts = this.props.forecasts
    if(forecasts && forecasts.length > 8) {
      forecasts = forecasts.slice(1, 9)
    }

    return (
      <div
        id='todayDiv'
        style={styles.base} >

        <ForecastNow
          conditionsId={ this.props.conditionsId }
          currentConditions={ this.props.currentConditions }
          temp={ this.props.temp }
          units={ this.props.units } />

        <div style={styles.overflowDiv} >
          {forecasts.map((f, index) => {
            let temp = this.props.units === 'metric' ?
                                        convertTemp.toCelsius(f.main.temp) :
                                        f.main.temp
            return (
              <ForecastHourly
                key={index}
                temp={temp}
                time={f.dt_txt}
                units={ this.props.units }
                conditionId={f.weather[0].id} />
            )
          })}
        </div>
      </div>
    )
  }
}
ForecastToday.propTypes = {
  conditionsId: React.PropTypes.number,
  currentConditions: React.PropTypes.string,
  forecasts: React.PropTypes.array,
  temp: React.PropTypes.number,
  units: React.PropTypes.string
}

export default new Radium(ForecastToday)
