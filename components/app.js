import React from 'react'
import { RouteHandler } from 'react-router'
import fetchWeather from '../weather.js'

let App = React.createClass({
  getInitialState () {
    return {
      temp: Number.NaN,
      mainColor: 'white'
    }
  },

  componentDidMount () {
    fetchWeather((result) => {
      this.setState({
        temp: Math.round(result.body.main.temp)
      })
    })
  },

  render () {
    return (
      <RouteHandler temp={ this.state.temp } />
    )
  }
})

export default App
