import React from 'react'
import { RouteHandler } from 'react-router'
import Weather from '../weather.js'

let App = React.createClass({
  getInitialState () {
    return {
      temp: ''
    }
  },

  componentDidMount () {
    Weather((result) => {
      // this.setState(result.body)
      this.setState({ temp: Math.round(result.body.main.temp) })
    })
  },

  render () {
    return (
      <RouteHandler temp={ this.state.temp } />
    )
  }
})

export default App
