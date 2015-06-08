import React from 'react'
import Radium from 'radium'
import Common from '../../styles/common.js'

class ForecastFooter extends React.Component {
  render() {
    return (
      <div style={styles.base} >
        <div style={styles.oneDayForecast} >
          <h3 style={styles.dayName} >tue</h3>
          <i style={styles.icon}
             className="wi wi-rain"></i>
          <p style={styles.highLow} >66/58</p>
        </div>
        <div style={styles.oneDayForecast} >
          <h3 style={styles.dayName} >wed</h3>
          <i style={styles.icon}
             className="wi wi-cloudy"></i>
          <p style={styles.highLow} >66/58</p>
        </div>
        <div style={styles.oneDayForecast} >
          <h3 style={styles.dayName} >thu</h3>
          <i style={styles.icon}
             className="wi wi-day-cloudy"></i>
          <p style={styles.highLow} >66/58</p>
        </div>
        <div style={styles.oneDayForecast} >
          <h3 style={styles.dayName} >fri</h3>
          <i style={styles.icon}
             className="wi wi-day-sunny"></i>
          <p style={styles.highLow} >66/58</p>
        </div>
      </div>
    )
  }
}

var styles = {
  base: {
    color: 'white',
    background: Common.tempBlue,
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'row',
    borderTop: '2px solid ' + Common.borderColor,
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

export default Radium(ForecastFooter)
