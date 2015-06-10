import React from 'react'
import Radium from 'radium'
import { Navigation } from 'react-router'
import { splashRed } from '../../utils/weatherColor.js'

var sunIconKeyframes = Radium.keyframes({
  '100%': { transform: 'rotate(360deg)'}
})
var styles = {
  base: {
    height: '100%',
    color: 'white',
    background: splashRed.hslaString(),
    textAlign: 'center',
    fontFamily: '"Comfortaa-Light", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  sunIcon: {
    fontSize: '7em',
    animation: `${sunIconKeyframes} 5s ease 0s infinite`
  },

  splash: {
    fontSize: '3em',
    padding: '10px 0 0 10px',
    margin: '0'
  },

  splashFiller: {
    height: '10vh'
  },

  splashDegree: {
    position: 'relative',
    left: '-3px'
  }
}

let Splash = React.createClass({
  mixins: [Navigation],

  render: function() {
    return (
      <div onClick={() => this.transitionTo('home')}
           style={styles.base} >
        <i className="wi wi-day-sunny"
           style={styles.sunIcon} ></i>
        <h1 style={styles.splash} >
          temp
          <span style={styles.splashDegree} >&deg;</span>
        </h1>
        <div style={styles.splashFiller} ></div>
      </div>
    )
  }
})

export default new Radium(Splash)
