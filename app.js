require('./styles/style.styl')

import React from 'react'
import Router from 'react-router'
import { Route, DefaultRoute, RouteHandler } from 'react-router'
import Home from './components/home.js'
import Splash from './components/splash.js'
// import Settings from './settings.js'
import { fetchWeather } from './utils/weather.js'

/*
 * we let state reside in App so async weather can be fetched on the splash
 * screen. This way when the user visits home we likely already have the info
 */
let App = React.createClass({
  getInitialState() {
    return {
      temp: Number.NaN,
      lat: 40.730610,
      lon: -73.935242,
      units: 'imperial'
    }
  },
  weatherCallback(results) {
    var weather = results[0].body
    var fiveDayForecast = results[1].body

    // weather api may return an array here, so we check
    var currentWeather = Array.isArray(weather.weather) ?
                    weather.weather[0] :
                    weather.weather
    this.setState({
      weather,
      fiveDayForecast,
      temp: Math.round(weather.main.temp),
      cityName: weather.name,
      sunrise: weather.sys.sunrise,
      sunset: weather.sys.sunset,
      currentConditions: currentWeather.main,
      country: weather.sys.country
    })
  },
  componentDidMount() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });

          fetchWeather(this.state.lat, this.state.lon, this.state.units)
            .then(this.weatherCallback)
        },
        (error) => {
          fetchWeather(this.state.lat, this.state.lon, this.state.units)
            .then(this.weatherCallback)
        }
      )
    } else { console.log('no geolocation available') }
  },
  render() {
    return (
      <RouteHandler
        forecast = { this.state }
        temp = { this.state.temp } />
    )
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
