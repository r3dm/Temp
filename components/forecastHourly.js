import React from 'react'
import Radium from 'radium'
import { weatherColor } from '../utils/weatherColor.js'
import moment from 'moment'
import { mapWeather } from '../utils/weather.js'
import convertTemp from '../utils/convertTemp.js'

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
  },
  iconStyle: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '30vw',
    flexGrow: 1,
    justifyContent: 'center',
    textAlign: 'center'
  }
}

class ForecastHourly extends React.Component {
  render() {
    styles.base.backgroundColor = weatherColor(this.props.temp)
    var timeObj = moment(this.props.time + ' +0000', 'YYYY-MM-DD HH:mm:ss Z')
    let temp = this.props.units === "imperial" ? this.props.temp
                                  : convertTemp.toCelsius(this.props.temp)

    return (
      <div style={styles.base} >
        <div style={styles.timeStyle} >
          {timeObj.format(' h a')}
        </div>
        <div style={styles.iconStyle}>
          <i className={`wi wi-${ mapWeather(this.props.conditionId)}`}
             style={styles.iStyle}></i>
          { this.props.conditions }
        </div>
        <div style={styles.tempStyle} >
          { Math.round(temp) }&deg;
        </div>
      </div>
    )
  }
}
ForecastHourly.propTypes = {
  temp: React.PropTypes.number,
  time: React.PropTypes.string,
  units: React.PropTypes.string,
  conditionId: React.PropTypes.number,
  conditions: React.PropTypes.string
}

export default new Radium(ForecastHourly)
