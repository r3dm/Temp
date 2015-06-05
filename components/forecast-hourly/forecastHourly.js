import React from 'react'

let ForecastHourly = React.createClass({
  render() {
    var divStyle = {
      backgroundColor: this.props.color
    }

    return (
      <div className="forecast-hourly-wrapper"
           style={ divStyle } >
        <div>
          { this.props.time }
        </div>
        <i className="wi wi-rain"></i>
        <div>
          { this.props.temperature }&deg;
        </div>
      </div>
    )
  }
})

export default ForecastHourly
