import React from 'react'
import { RouteHandler } from 'react-router'
import Weather from '../weather.js'
import WeatherColor from '../weatherColor.js'

let App = React.createClass({
  getInitialState () {
    return {
      temp: '',
      mainColor: 'white'
    }
  },

  componentDidMount () {
    Weather((result) => {
      this.setState({
        temp: Math.round(result.body.main.temp),
        mainColor: WeatherColor(result.body.main.temp)
      })
    })
  },

  render () {
    return (
      <RouteHandler temp={ this.state.temp }
                    mainColor={ this.state.mainColor } />
    )
  }
})

export default App
