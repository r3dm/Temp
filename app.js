require('./styles/style.styl')

import React from 'react'
import Router from 'react-router'
import { Route, DefaultRoute, RouteHandler } from 'react-router'
import Home from './components/home.js'
import Splash from './components/splash.js'
import Settings from './components/settings.js'
import moment from 'moment'
import LocalStorageMixin from 'react-localstorage'
import { fetchWeather } from './utils/weather.js'
import EventListener from 'react-event-listener'
import Modal from 'boron/FadeModal'

const dtFmtStr = 'YYYY-MM-DD HH:00:00'
const oneHourMs = 60 * 60 * 1000
// const oneMinMs = 60 * 1000
// const tenSecondsMs = 10 * 1000

/*
 * Top level Component
 */
let App = React.createClass({
  mixins: [
    EventListener,
    LocalStorageMixin
  ],
  getInitialState() {
    return {
      cityName: 'none',
      country: 'N/A',
      currentConditions: 'thunderstorm with light drizzle',
      temp: 89,
      timestamp: null,
      lat: NaN,
      lon: NaN,
      units: 'imperial',
      hourlyForecast: [
        { dt_txt: moment().add( 1, 'h').format(dtFmtStr), weather: [{id: 800, description: 'light rain'}], main: {temp: 89} },
        { dt_txt: moment().add( 4, 'h').format(dtFmtStr), weather: [{id: 800, description: 'scattered clouds'}], main: {temp: 99} },
        { dt_txt: moment().add( 7, 'h').format(dtFmtStr), weather: [{id: 800, description: 'light rain'}], main: {temp: 89} },
        { dt_txt: moment().add(10, 'h').format(dtFmtStr), weather: [{id: 800, description: 'sky is clear'}], main: {temp: 79} },
        { dt_txt: moment().add(13, 'h').format(dtFmtStr), weather: [{id: 800, description: 'scattered clouds'}], main: {temp: 69} },
        { dt_txt: moment().add(16, 'h').format(dtFmtStr), weather: [{id: 800, description: 'light rain'}], main: {temp: 59} },
        { dt_txt: moment().add(19, 'h').format(dtFmtStr), weather: [{id: 800, description: 'few clouds'}], main: {temp: 69} },
        { dt_txt: moment().add(22, 'h').format(dtFmtStr), weather: [{id: 800, description: 'sky is clear scattered clouds'}], main: {temp: 79} },
        { dt_txt: moment().add(25, 'h').format(dtFmtStr), weather: [{id: 800, description: 'sky is clear'}], main: {temp: 89} }
      ],
      fiveDayForecast: [
        { dt: parseInt(moment().add( 0, 'd').format('X')), temp: { max: 92, min: 65 }, weather: [{id: 800}]},
        { dt: parseInt(moment().add( 1, 'd').format('X')), temp: { max: 83, min: 65 }, weather: [{id: 801}]},
        { dt: parseInt(moment().add( 2, 'd').format('X')), temp: { max: 92, min: 69 }, weather: [{id: 802}]},
        { dt: parseInt(moment().add( 3, 'd').format('X')), temp: { max: 89, min: 70 }, weather: [{id: 803}]},
        { dt: parseInt(moment().add( 4, 'd').format('X')), temp: { max: 89, min: 65 }, weather: [{id: 804}]}
      ],
      weather: {
        main: {
          humidity: 80
        },
        weather: [
          { id: 800 }
        ]
      }
    }
  },
  componentDidUpdate: function() {
    this.testStaleAndUpdate()
  },
  listeners: {
    document: {
      resume: 'testStaleAndUpdate',
      visibilitychange: 'onVisibilityChange'
    }
  },
  onVisibilityChange: function() {
    if(!document.hidden) {
      console.log('recieved focus')
      this.testStaleAndUpdate()
    }
  },
  saveSettings: function(newState) {
    this.setState(newState)
  },
  testStaleAndUpdate: function() {
    if(Date.now() - this.state.timestamp > oneHourMs) {
      console.log('state is stale')
      fetchWeather().then(this.saveSettings)
    }
  },
  render() {
    return (
      <RouteHandler
        state = { this.state }
        syncFunc={ this.saveSettings } />
    )
  }
})

let routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Splash} />
    <Route handler={Home}
           name="home"
           path="/home" />
    <Route handler={Settings}
           name="settings"
           path="/settings" />
  </Route>
)

// React app initializer
function startApp() {
  Router.run(routes, function (Handler) {
    React.initializeTouchEvents(true)
    React.render(<Handler/>, document.getElementById('content'))
  })
}

// Cordova delay
if (window.cordova) {
  console.log('wait for deviceready')
  document.addEventListener('deviceready', startApp, false)
} else {
  startApp()
}
