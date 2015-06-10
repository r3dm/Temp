import React from 'react'
import ForecastHourly from '../forecast-hourly/forecastHourly.js'
import ForecastNow from '../forecast-now/forecastNow.js'
import Radium from 'radium'
import weatherColor from '../../weatherColor.js'
// import Color from 'color'

var styles = {
  base: {
    flexGrow: 1,
    overflow: 'scroll'
  },

  overflowDiv: {
    overflow: 'auto',
    height: '55vh'
  }
}

class ForecastToday extends React.Component {
  /*
   * set component height after initial render. Due to Flexbox there's no
   * way to know the parent's size before runtime
   */
  componentDidMount() {
    var todayDivHeight = document.getElementById('todayDiv').clientHeight
    var mainDividerHeight = document.getElementById('mainDivider').clientHeight
    styles.overflowDiv.height = todayDivHeight - mainDividerHeight - 8
  }

  render() {
    return (
      <div
        id="todayDiv"
        style={styles.base}
      >
        <ForecastNow
          temp={ this.props.temp }
        />

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
  temp: React.PropTypes.number
}

export default new Radium(ForecastToday)
