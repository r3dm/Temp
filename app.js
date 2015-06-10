require('./styles/style.styl')

import React from 'react'
import Router from 'react-router'
import { Route, DefaultRoute } from 'react-router'

import App from './components/app.js'
import Home from './components/home/home.js'
import Splash from './components/splash/splash.js'
// import Settings from './components/settings.js'

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
