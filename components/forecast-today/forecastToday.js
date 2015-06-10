import React from 'react'
import ForecastHourly from '../forecast-hourly/forecastHourly.js'
import Radium from 'radium'
import Common from '../../styles/common.js'
import weatherColor from '../../weatherColor.js'
import Color from 'color'

var styles = {
  base: {
    backgroundColor: Common.tempBlue.hslString(),
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
    height: '65vh'
  },

  mainTempWrapper: {
    fontSize: '7em',
    maxWidth: '50%'
  },

  degrees: {
    fontSize: '0.8em',
    verticalAlign: 'top'
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

  divider: {
    height: '6em',
    width: 0,
    border: '1px solid'
  },

  mainBars: {
    padding: '7px 0',
    borderBottom: '2px solid'
  },

  mainBarsChild: {
    width: '40px',
    paddingBottom: '3px',
    margin: '0 auto',
    borderTop: '2px solid white'
  },

  overflowDiv: {
    overflow: 'auto',
    height: '55vh',
    borderTop: '2px solid',
    borderBottom: '3px solid'
  }
}

class ForecastToday extends React.Component {
  render() {
    var mainColor = new Color(weatherColor(this.props.temp))
    var mainColorDark = mainColor.clone().darken(0.3)
    var mainColorLight = mainColor.clone().lighten(0.3)
    styles.base.backgroundColor = mainColor.hslaString()
    styles.divider.color = mainColorDark.hslaString()
    styles.mainBars.borderBottomColor = mainColorDark.hslaString()
    styles.overflowDiv.borderTopColor = mainColorLight.hslaString()
    styles.overflowDiv.borderBottomColor = mainColorDark.hslaString()

    return (
      <div style={styles.base} >
        <div style={styles.forecastTodayWrapper} >
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
        </div>

        <div style={styles.mainBars} >
          <div style={styles.mainBarsChild} ></div>
          <div style={styles.mainBarsChild} ></div>
          <div style={styles.mainBarsChild} ></div>
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
ForecastToday.propTypes = { temp: React.PropTypes.number }

export default new Radium(ForecastToday)
