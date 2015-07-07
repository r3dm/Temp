import React from 'react'
import Radium from 'radium'
import { weatherColor } from '../utils/weatherColor.js'
import moment from 'moment'
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
  timeStyle: {
    fontSize: '1.5em',
    flexBasis: '20vw',
    flexGrow: 1,
    textAlign: 'center'
  },
  tempStyle: {
    fontSize: '1.5em',
    flexBasis: '10vw',
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
    styles.base.backgroundColor = weatherColor(this.props.temp, this.props.units)
    var timeObj = moment(this.props.time + ' +0000', 'YYYY-MM-DD HH:mm:ss Z')

    return (
      <div style={styles.base} >
        <div style={styles.timeStyle} >
          {timeObj.format('h:mm a')}
        </div>
        <i className={`wi wi-${ mapWeather(this.props.conditionId)}`}
           style={styles.iStyle}></i>
        <div style={styles.tempStyle} >
          { Math.round(this.props.temp) }&deg;
        </div>
      </div>
    )
  }
}
ForecastHourly.propTypes = {
  temp: React.PropTypes.number,
  time: React.PropTypes.string,
  units: React.PropTypes.string,
  conditionId: React.PropTypes.number
}

export default new Radium(ForecastHourly)
