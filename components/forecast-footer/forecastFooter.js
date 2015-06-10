import React from 'react'
import Radium from 'radium'
import Common from '../../styles/common.js'

var styles = {
  base: {
    color: 'white',
    background: Common.tempBlue.hslString(),
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'row',
    borderTop: `2px solid ${Common.borderColor.hslString()}`,
    zIndex: 1
  },

  oneDayForecast: {
    flexGrow: 1,
    textAlign: 'center'
  },

  dayName: {
    fontFamily: '"Comfortaa-Regular", sans-serif',
    margin: '2px 0 6px 0'
  },

  icon: {
    fontSize: '2em'
  },

  highLow: {
    margin: '5px 0'
  }
}

class ForecastFooter extends React.Component {
  render() {
    return (
      <div style={styles.base} >
        <div style={styles.oneDayForecast} >
          <h3 style={styles.dayName} >tue</h3>
          <i className="wi wi-rain"
             style={styles.icon}></i>
          <p style={styles.highLow} >66/58</p>
        </div>
        <div style={styles.oneDayForecast} >
          <h3 style={styles.dayName} >wed</h3>
          <i className="wi wi-cloudy"
             style={styles.icon}></i>
          <p style={styles.highLow} >66/58</p>
        </div>
        <div style={styles.oneDayForecast} >
          <h3 style={styles.dayName} >thu</h3>
          <i className="wi wi-day-cloudy"
             style={styles.icon}></i>
          <p style={styles.highLow} >66/58</p>
        </div>
        <div style={styles.oneDayForecast} >
          <h3 style={styles.dayName} >fri</h3>
          <i className="wi wi-day-sunny"
             style={styles.icon}></i>
          <p style={styles.highLow} >66/58</p>
        </div>
      </div>
    )
  }
}

export default new Radium(ForecastFooter)
