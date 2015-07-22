require('./styles/style.styl')

import React from 'react'
import Router from 'react-router'
import { Route, DefaultRoute, RouteHandler } from 'react-router'
import Home from './components/home.js'
import Splash from './components/splash.js'
import Settings from './components/settings.js'
import moment from 'moment'

const dtFmtStr = 'YYYY-MM-DD HH:00:00'
/*
 * we let state reside in App so async weather can be fetched on the splash
 * screen. This way when the user visits home we likely already have the info
 */
let App = React.createClass({
  getInitialState() {
    return {
      cityName: 'none',
      country: 'N/A',
      currentConditions: 'Clear',
      temp: 89,
      lat: NaN,
      lon: NaN,
      units: 'imperial',
      hourlyForecast: [
        { dt_txt: moment().add( 1, 'h').format(dtFmtStr), weather: [{id: 800}], main: {temp: 89} },
        { dt_txt: moment().add( 4, 'h').format(dtFmtStr), weather: [{id: 800}], main: {temp: 99} },
        { dt_txt: moment().add( 7, 'h').format(dtFmtStr), weather: [{id: 800}], main: {temp: 89} },
        { dt_txt: moment().add(10, 'h').format(dtFmtStr), weather: [{id: 800}], main: {temp: 79} },
        { dt_txt: moment().add(13, 'h').format(dtFmtStr), weather: [{id: 800}], main: {temp: 69} },
        { dt_txt: moment().add(16, 'h').format(dtFmtStr), weather: [{id: 800}], main: {temp: 59} },
        { dt_txt: moment().add(19, 'h').format(dtFmtStr), weather: [{id: 800}], main: {temp: 69} },
        { dt_txt: moment().add(22, 'h').format(dtFmtStr), weather: [{id: 800}], main: {temp: 79} },
        { dt_txt: moment().add(25, 'h').format(dtFmtStr), weather: [{id: 800}], main: {temp: 89} }
      ],
      fiveDayForecast: [
        { dt: parseInt(moment().add( 0, 'd').format('X')), temp: { max: 92, min: 65 }, weather: [{id: 800}]},
        { dt: parseInt(moment().add( 1, 'd').format('X')), temp: { max: 83, min: 65 }, weather: [{id: 801}]},
        { dt: parseInt(moment().add( 2, 'd').format('X')), temp: { max: 92, min: 69 }, weather: [{id: 802}]},
        { dt: parseInt(moment().add( 3, 'd').format('X')), temp: { max: 89, min: 70 }, weather: [{id: 803}]},
        { dt: parseInt(moment().add( 4, 'd').format('X')), temp: { max: 89, min: 65 }, weather: [{id: 804}]}
      ],
      weather: {
        weather: [
          { id: 800 }
        ]
      }
    }
  },
  saveSettings: function(newState) {
    this.setState(newState)
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

function startApp() {
  Router.run(routes, function (Handler) {
    React.initializeTouchEvents(true)
    React.render(<Handler/>, document.getElementById('content'))
  })
}

if (window.cordova) {
  console.log('wait for deviceready')
  document.addEventListener('deviceready', startApp, false);
} else {
  // browser, start asap
  startApp();
}
