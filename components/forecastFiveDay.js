import React from 'react'
import Radium from 'radium'
import Color from 'color'
import { weatherColor } from '../utils/weatherColor.js'

var styles = {
  base: {
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

class ForecastFiveDay extends React.Component {
  render() {
    let mainColor = weatherColor(this.props.temp, this.props.units)
    let colorDark = 'white'
    let colorLight = 'white'

    if(mainColor !== 'white') {
      colorDark = new Color(mainColor).darken(0.2).hslaString()
      colorLight = new Color(mainColor).lighten(0.3).hslaString()
    }

    styles.base.backgroundColor = mainColor
    styles.base.borderTop = `2px solid ${colorLight}`
    styles.base.boxShadow = `0 -2px ${colorDark}`

    return (
      <div style={styles.base} >
        <h3 style={styles.dayName} >tue</h3>
        <i className="wi wi-rain"
           style={styles.icon}></i>
        <p style={styles.highLow} >66/58</p>
      </div>
    )
  }
}
ForecastFiveDay.propTypes = {
  temp: React.PropTypes.number,
  units: React.PropTypes.string
}

export default new Radium(ForecastFiveDay)
