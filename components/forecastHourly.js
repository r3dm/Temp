import React from 'react'
import Radium from 'radium'

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

class ForecastHourly extends React.Component {
  render() {
    styles.base.backgroundColor = this.props.color

    return (
      <div style={styles.base} >
        <div style={styles.divStyle} >
          { this.props.time }
        </div>
        <i className="wi wi-rain"
           style={styles.iStyle}></i>
        <div style={styles.divStyle} >
          { this.props.temperature }&deg;
        </div>
      </div>
    )
  }
}
ForecastHourly.propTypes = {
  color: React.PropTypes.string,
  temperature: React.PropTypes.number,
  time: React.PropTypes.string
}

export default new Radium(ForecastHourly)
