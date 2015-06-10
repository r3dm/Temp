import React from 'react'
import ForecastHourly from '../forecast-hourly/forecastHourly.js'
import Radium from 'radium'
import Color from 'color'
import Divider from '../divider/divider.js'

var styles = {
  base: {
    flexGrow: 1,
    overflow: 'scroll'
  },

  forecastTodayWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65vh',
    borderBottom: '2px solid',
    zIndex: 0,
    position: 'relative'
  },

  mainTempWrapper: {
    fontSize: '7em',
    maxWidth: '50%'
  },

  degrees: {
    fontSize: '0.8em',
    verticalAlign: 'top'
  },

  divider: {
    height: '6em',
    width: 0,
    border: '1px solid'
  },

  forecastAndChance: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: '50%',
    textAlign: 'center'
  },

  icon: {
    fontSize: '3em'
  },

  forecastAndChanceChild: {
    width: '20vw'
  },

  flexGrow: {
    flexGrow: 1
  },

  overflowDiv: {
    overflow: 'auto',
    height: '55vh'
  }
}

class ForecastToday extends React.Component {
  render() {
    let colorDark = new Color(this.props.color).darken(0.1).hslaString()
    let colorLight = new Color(this.props.color).lighten(0.1).hslaString()

    styles.base.backgroundColor = this.props.color
    styles.divider.color = colorDark
    styles.forecastTodayWrapper.borderBottomColor = colorDark
    styles.forecastTodayWrapper.boxShadow = `0 2px ${colorLight}`

    return (
      <div style={styles.base} >
        <div style={styles.forecastTodayWrapper} >
          <div style={styles.flexGrow} ></div>

          <div style={styles.mainTempWrapper} >
            <span className="temperature">
              { this.props.temp }
            </span>
            <span style={styles.degrees} >&deg;</span>
          </div>

          <div style={styles.forecastAndChance} >
            <div style={styles.forecastAndChanceChild} >
              <i className="wi wi-rain"
                 style={styles.icon}></i>
              <p>rainy</p>
            </div>

            <div style={styles.divider} ></div>

            <div style={styles.forecastAndChanceChild} >
              <i className="wi wi-sprinkles"
                 style={styles.icon}></i>
              <p>100%</p>
            </div>
          </div>

          <div style={styles.flexGrow} ></div>

          <Divider />
        </div>


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
  color: React.PropTypes.string,
  temp: React.PropTypes.number
}

export default new Radium(ForecastToday)
