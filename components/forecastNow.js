import React from 'react'
import Radium from 'radium'
import Divider from './divider.js'
import Color from 'color'
import { weatherColor } from '../utils/weatherColor.js'
import { mapWeather } from '../utils/weather.js'

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
    maxWidth: '50%',
    textAlign: 'center'
  },

  verticalDivider: {
    height: '6em',
    width: 0,
    border: '1px solid'
  },

  icon: {
    fontSize: '3em'
  },

  forecastAndChanceChild: {
    width: '20vw'
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
    let mainColor = weatherColor(this.props.temp, this.props.units)
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

    return (
      <div style={styles.base} >
        <div style={styles.flexGrow} ></div>

        <div style={styles.mainTempWrapper} >
          <span>
            { this.props.temp }
          </span>
          <span style={styles.degrees} >&deg;</span>
        </div>

        <div style={styles.forecastAndChance} >
          <div style={styles.forecastAndChanceChild} >
            <i className={`wi wi-${ mapWeather(this.props.conditionsId)}`}
               style={styles.icon}></i>
            <p>{ this.props.currentConditions }</p>
          </div>

          <div style={styles.verticalDivider} ></div>

          <div style={styles.forecastAndChanceChild} >
            <i className="wi wi-sprinkles"
               style={styles.icon}></i>
            <p>50%</p>
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
