import React from 'react'
import { RouteHandler } from 'react-router'
import fetchWeather from '../utils/weather.js'

/*
 * we let state reside here so async weather can be fetched on the splash
 * screen. This way when the user visits home we likely already have the info
 */
let App = React.createClass({
  getInitialState() {
    return {
      temp: Number.NaN
    }
  },

  componentDidMount() {
    fetchWeather((result) => {
      let temp = Math.round(result.body.main.temp)

      this.setState({ temp })
    })
  },

  render() {
    return (
      <RouteHandler
        temp={ this.state.temp }
      />
    )
  }
})

export default App
