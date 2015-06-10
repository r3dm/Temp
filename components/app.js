import React from 'react'
import { RouteHandler } from 'react-router'
import fetchWeather from '../weather.js'
import weatherColor from '../weatherColor.js'

let App = React.createClass({
  getInitialState () {
    return {
      temp: Number.NaN,
      mainColor: 'white'
    }
  },

  componentDidMount () {
    fetchWeather((result) => {
      let temp = Math.round(result.body.main.temp)
      let mainColor = weatherColor(temp)

      this.setState({
        temp,
        mainColor
      })
    })
  },

  render () {
    return (
      <RouteHandler
        color={ this.state.mainColor }
        temp={ this.state.temp }
      />
    )
  }
})

export default App
