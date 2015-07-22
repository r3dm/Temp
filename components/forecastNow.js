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
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '2px solid',
    position: 'relative'
  },
  mainTempWrapper: {
    fontSize: '7em',
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
    alignContent: 'center',
    textAlign: 'center'
  },
  icon: {
    fontSize: '15vw',
    padding: '0 2vw'
  },
  verticalDivider: {
    height: '20vh',
    width: 0,
    border: '2px solid',
    borderRadius: '5px',
    margin: '0 2vw'
  },
  forecastAndChanceChildL: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '40vw'
  },
  forecastAndChanceChildR: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '40vw'
  },
  iconCaption: {
    paddingTop: '10px',
    fontSize: '5.5vw',
    maxWidth: '25vw',
    maxHeight: '15vh',
    overflow: 'hidden'
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
    styles.verticalDivider.color = colorDark

    styles.base.borderBottomColor = colorDark
    styles.base.boxShadow = `0 2px ${colorLight}`
    let temp = this.props.units === "imperial" ? this.props.temp
                                  : convertTemp.toCelsius(this.props.temp)

    return (
      <div style={styles.base} >
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
            <div style={styles.iconCaption}>
              { this.props.currentConditions }
            </div>
          </div>

          <div style={styles.verticalDivider} ></div>

          <div style={styles.forecastAndChanceChildR} >
            <i className="wi wi-sprinkles"
               style={styles.icon}></i>
            <div style={styles.iconCaption}>
              50%
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
  temp: React.PropTypes.number,
  units: React.PropTypes.string
}

export default new Radium(ForecastNow)
