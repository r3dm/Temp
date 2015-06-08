import React from 'react'
import Radium from 'radium'
import Common from '../../styles/common.js'

class ForecastHourly extends React.Component {
  render() {
    styles.base.backgroundColor = this.props.color

    return (
      <div style={styles.base} >
        <div style={styles.divStyle} >
          { this.props.time }
        </div>
        <i style={styles.iStyle}
           className="wi wi-rain"></i>
        <div style={styles.divStyle} >
          { this.props.temperature }&deg;
        </div>
      </div>
    )
  }
}

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
    fontSize: '1.2em',
    flexGrow: 1,
    textAlign: 'center'
  },

  iStyle: {
    fontSize: '3em',
    flexGrow: 1,
    textAlign: 'center'
  }
}

export default Radium(ForecastHourly)
