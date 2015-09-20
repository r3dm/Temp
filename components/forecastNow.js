import React from 'react'
import Radium from 'radium'
import Divider from './divider.js'
import Color from 'color'
import { weatherColor } from '../utils/weatherColor.js'
import { mapWeather } from '../utils/weather.js'
import convertTemp from '../utils/convertTemp.js'

var styles = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '2px solid',
    position: 'relative'
  },
  mainTempWrapper: {
    fontSize: '25vw',
    maxWidth: '50%'
  },
  flexGrow: {
    flexGrow: 1
  },
  degrees: {
    fontSize: '0.8em',
    verticalAlign: 'top'
  },
  forecastAndChance: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  verticalDivider: {
    width: '1vw',
    borderRadius: '5px'
  },
  forecastAndChanceChildL: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40vw'
  },
  forecastAndChanceChildR: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40vw'
  },
  icon: {
    fontSize: '10vw',
    padding: '0 2vw'
  },
  metric: {
    fontSize: '5vw'
  },
  caption: {
    padding: '5px 1em 0 1em',
    fontSize: '5vw',
    textAlign: 'center'
  }
}

class ForecastNow extends React.Component {
  componentDidMount() {
    // ~ 8 px to account for footer-padding + this-padding
    this.setState({
      height: document.getElementById('todayDiv').clientHeight
    })
  }

  constructor(props) {
    super(props)
    this.state = { height: '65vh' }
  }

  render() {
    styles.base.height = this.state.height
    let mainColor = weatherColor(this.props.temp)
    let colorDark = 'white'
    let colorLight = 'white'

    if(mainColor !== 'white') {
      colorDark = new Color(mainColor).darken(0.2).hslaString()
      colorLight = new Color(mainColor).lighten(0.2).hslaString()
    }

    styles.base.backgroundColor = mainColor
    styles.verticalDivider.backgroundColor = colorDark

    styles.base.borderBottomColor = colorDark
    styles.base.boxShadow = `0 2px ${colorLight}`
    let temp = this.props.units === 'imperial' ? this.props.temp
                                        : convertTemp.toCelsius(this.props.temp)

    return (
      <div
        id="forecastNowContainer"
        style={styles.base} >
        <div style={styles.flexGrow} ></div>

        <div style={styles.mainTempWrapper} >
          <span>
            { temp }
          </span>
          <span style={styles.degrees} >&deg;</span>
        </div>

        <div style={styles.forecastAndChance} >

          <div style={styles.forecastAndChanceChildL} >
            <i className={`wi wi-${ mapWeather(this.props.conditionsId)}`}
               style={styles.icon}></i>
            <div style={styles.caption}>
              { this.props.currentConditions }
            </div>
          </div>

          <div style={styles.verticalDivider} ></div>

          <div style={styles.forecastAndChanceChildR} >
            <div style={styles.metric}>
              humidity
            </div>
            <div style={styles.caption}>
              { this.props.humidity }%
            </div>
          </div>

        </div>

        <div style={styles.flexGrow} ></div>

        <Divider />
      </div>
    )
  }
}
ForecastNow.propTypes = {
  conditionsId: React.PropTypes.number,
  currentConditions: React.PropTypes.string,
  humidity: React.PropTypes.number,
  temp: React.PropTypes.number,
  units: React.PropTypes.string
}

export default new Radium(ForecastNow)
