import React from 'react'
import Radium from 'radium'
import { Navigation } from 'react-router'
import Color from 'color'
import { weatherColor } from '../utils/weatherColor.js'

var styles = {
  base: {
    height: '100%',
    color: 'white',
    fontFamily: '"Comfortaa-Regular", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap'
  },
  navigation: {
    display: 'flex',
    flexDirection: 'row'
  },
  backIcon: {
    fontSize: '3em',
    padding: '5px 15px',
    position: 'fixed'
  },
  header: {
    flexGrow: 1,
    textAlign: 'center',
    margin: 0,
    fontSize: '2em',
    padding: '10px 0'
  }
}

let Settings = React.createClass({
  mixins: [Navigation],

  render: function() {
    let mainColor = weatherColor(this.props.temp)
    styles.base.backgroundColor = mainColor

    return (
      <div style={styles.base} >
        <i className="fa fa-angle-double-left"
           style={styles.backIcon}
           onClick={() => this.transitionTo('home')}></i>
        <div style={styles.navigation} >
          <p style={styles.header}>
            Settings
          </p>
        </div>
      </div>
    )
  }
})
Settings.propTypes = {
  forecast: React.PropTypes.object,
  temp: React.PropTypes.number
}

export default new Radium(Settings)
