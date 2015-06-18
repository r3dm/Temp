import React from 'react'
import Radium from 'radium'
import Color from 'color'
import ForecastFiveDay from './forecastFiveDay.js'
import { weatherColor } from '../utils/weatherColor.js'

var styles = {
  base: {
    color: 'white',
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'row',
    zIndex: 1
  }
}

class ForecastFooter extends React.Component {
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

    let forecasts = this.props.forecasts.slice(0, 4)
    return (
      <div style={styles.base} >
        { forecasts.map((f, index) => {
          return <ForecastFiveDay
            key={index}
            high={f.high}
            low={f.low}
            units={this.props.units} />
        })}
      </div>
    )
  }
}
ForecastFooter.propTypes = {
  forecasts: React.PropTypes.array,
  temp: React.PropTypes.number,
  units: React.PropTypes.string
}

export default new Radium(ForecastFooter)
