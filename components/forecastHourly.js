import React from 'react'
import Radium from 'radium'
import Color from 'color'
import { weatherColor } from '../utils/weatherColor.js'
import Moment from 'moment'
import { mapWeather } from '../utils/weather.js'

var styles = {
  base: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90px'
  },

  divStyle: {
    fontSize: '1.5em',
    flexGrow: 1,
    textAlign: 'center'
  },

  iStyle: {
    fontSize: '3em',
    flexGrow: 1,
    textAlign: 'center'
  }
}

class ForecastHourly extends React.Component {
  render() {
    styles.base.backgroundColor = weatherColor(this.props.temp)
    var timeObj = new Moment(this.props.time + ' +0000', "YYYY-MM-DD HH:mm:ss Z")

    return (
      <div style={styles.base} >
        <div style={styles.divStyle} >
          {timeObj.format('h:mm a')}
        </div>
        <i className={`wi wi-${ mapWeather(this.props.weather)}`}
           style={styles.iStyle}></i>
        <div style={styles.divStyle} >
          { Math.round(this.props.temp) }&deg;
        </div>
      </div>
    )
  }
}
ForecastHourly.propTypes = {
  temp: React.PropTypes.number,
  time: React.PropTypes.string,
  weather: React.PropTypes.string
}

export default new Radium(ForecastHourly)
