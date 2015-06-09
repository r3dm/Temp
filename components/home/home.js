import React from 'react'
import Radium from 'radium'
import Header from '../header/header.js'
import ForecastToday from '../forecast-today/forecastToday.js'
import ForecastFooter from '../forecast-footer/forecastFooter.js'

class Home extends React.Component {
  render() {
    return (
      <div style={styles.base} >
        <Header />
        <ForecastToday temp={ this.props.temp } />
        <ForecastFooter />
      </div>
    )
  }
}

var styles = {
  base: {
    height: '100%',
    color: 'white',
    fontFamily: '"Comfortaa-Light", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap'
  }
}

export default Radium(Home)
