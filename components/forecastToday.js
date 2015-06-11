import React from 'react'
import ForecastHourly from './forecastHourly.js'
import ForecastNow from './forecastNow.js'
import Radium from 'radium'
// import Color from 'color'

var styles = {
  base: {
    flexGrow: 1,
    overflowX: 'scroll',
    overflowY: 'hidden'
  },

  overflowDiv: {
    overflowX: 'scroll',
    overflowY: 'hidden',
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

    return (
      <div
        id="todayDiv"
        style={styles.base}
      >
        <ForecastNow
          currentConditions = { this.props.currentConditions }
          temp = { this.props.temp } />

        <div style={styles.overflowDiv} >
          <ForecastHourly color="#4c869b" forecast="rain" temperature={65} time="3:00pm" />
          <ForecastHourly color="#5aa0ba" forecast="cloudy" temperature={66} time="4:00pm" />
          <ForecastHourly color="#5aa0ba" forecast="cloudy" temperature={66} time="5:00pm" />
          <ForecastHourly color="#77b3c9" forecast="day-cloudy" temperature={67} time="6:00pm" />
          <ForecastHourly color="#77b3c9" forecast="day-cloudy" temperature={67} time="7:00pm" />
          <ForecastHourly color="#94cade" forecast="day-sunny" temperature={68} time="8:00pm" />
          <ForecastHourly color="#94cade" forecast="day-sunny" temperature={68} time="9:00pm" />
          <ForecastHourly color="#b6e5f7" forecast="cloudy" temperature={69} time="10:00pm" />
          <ForecastHourly color="#b6e5f7" forecast="cloudy" temperature={69} time="11:00pm" />
        </div>
      </div>
    )
  }
}
ForecastToday.propTypes = {
  currentConditions: React.PropTypes.string,
  temp: React.PropTypes.number
}

export default new Radium(ForecastToday)
