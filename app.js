require('./styles/style.styl')

import React from 'react'
import Router from 'react-router'
import { Route, DefaultRoute, RouteHandler } from 'react-router'
import Home from './components/home/home.js'
import Splash from './components/splash/splash.js'
// import Settings from './components/settings.js'
import fetchWeather from './utils/weather.js'

/*
 * we let state reside in App so async weather can be fetched on the splash
 * screen. This way when the user visits home we likely already have the info
 */
let App = React.createClass({
  getInitialState() {
    return { temp: Number.NaN }
  },
  componentDidMount() {
    fetchWeather((result) => {
      this.setState({ temp: Math.round(result.body.main.temp) })
    })
  },
  render() {
    return <RouteHandler temp={ this.state.temp } />
  }
})

let routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Splash} />
    <Route handler={Home}
           name="home"
           path="/home" />
  </Route>
)

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'))
})
