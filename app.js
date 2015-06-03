require('./styles/style.styl')
require('./styles/weather-icons.css')
require('./components/splash/splash.styl')
require('./components/home/home.styl')
require('./components/header/header.styl')
require('./components/forecast-today/forecastToday.styl')
require('./components/forecast-footer/forecastFooter.styl')

import React from 'react'
import Router from 'react-router'
import { Route, DefaultRoute, Link, RouteHandler } from 'react-router'

import App from './components/app.js'
import Home from './components/home/home.js'
import Splash from './components/splash/splash.js'
import Settings from './components/settings.js'

let routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Splash} />

    <Route name="home" path="/home" handler={Home} />
  </Route>
)

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'))
})
