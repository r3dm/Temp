import React from 'react'
import Radium from 'radium'
import Color from 'color'
import moment from 'moment'
import { weatherColor } from '../utils/weatherColor.js'
import { mapWeather } from '../utils/weather.js'

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
    let avg = (this.props.high + this.props.low) / 2
    let mainColor = weatherColor(avg, this.props.units)
    let colorDark = 'white'
    let colorLight = 'white'

    if(mainColor !== 'white') {
      colorDark = new Color(mainColor).darken(0.2).hslaString()
      colorLight = new Color(mainColor).lighten(0.3).hslaString()
    }

    styles.base.backgroundColor = mainColor
    styles.base.borderTop = `2px solid ${colorLight}`
    styles.base.boxShadow = `0 -2px ${colorDark}`
    var timeObj = moment(this.props.time, 'X')

    return (
      <div style={styles.base} >
        <h3 style={styles.dayName} >
          { timeObj.format('ddd') }
        </h3>
        <i
          className={`wi wi-${ mapWeather(this.props.conditionsId)}`}
          style={styles.icon}></i>
        <p style={styles.highLow} >
          {this.props.high}/{this.props.low}
        </p>
      </div>
    )
  }
}
ForecastFiveDay.propTypes = {
  conditionsId: React.PropTypes.number,
  high: React.PropTypes.number,
  low: React.PropTypes.number,
  temp: React.PropTypes.number,
  time: React.PropTypes.number,
  units: React.PropTypes.string
}

export default new Radium(ForecastFiveDay)
