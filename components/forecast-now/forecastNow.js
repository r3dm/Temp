import React from 'react'
import Radium from 'radium'
import Divider from '../divider/divider.js'
import Color from 'color'

var styles = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65vh',
    borderBottom: '2px solid',
    zIndex: 0,
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
  render() {
    let colorDark = new Color(this.props.color).darken(0.1).hslaString()
    let colorLight = new Color(this.props.color).lighten(0.1).hslaString()

    styles.base.backgroundColor = this.props.color
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
            <i className="wi wi-rain"
               style={styles.icon}></i>
            <p>rainy</p>
          </div>

          <div style={styles.verticalDivider} ></div>

          <div style={styles.forecastAndChanceChild} >
            <i className="wi wi-sprinkles"
               style={styles.icon}></i>
            <p>100%</p>
          </div>
        </div>

        <div style={styles.flexGrow} ></div>

        <Divider />
      </div>
    )
  }
}
ForecastNow.propTypes = {
  color: React.PropTypes.string,
  temp: React.PropTypes.number
}

export default new Radium(ForecastNow)
