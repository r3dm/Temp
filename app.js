require('./style.styl')
import React from 'react'
import Router from 'react-router'
import { Route, DefaultRoute, Link, RouteHandler } from 'react-router'

import App from './app/app.js'
import Home from './app/home.js'
import Splash from './app/splash.js'
import Settings from './app/settings.js'

let routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Splash} />
    <Route name="splash" path="/splash" handler={Splash} />
  </Route>
)

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'))
})
