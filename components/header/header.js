import React from 'react'
import Radium from 'radium'
import Common from '../../styles/common.js'

var styles = {
  base: {
    background: Common.tempBlue.hslString(),
    padding: '10px 10px',
    flexShrink: '0'
  },

  cityState: {
    fontFamily: '"Comfortaa-Bold", sans-serif',
    fontSize: '1.8em',
    margin: '0'
  },

  headerDate: {
    margin: '0',
    fontSize: '1.3em'
  },

  settingsIcon: {
    float: 'right',
    fontSize: '2em'
  }
}

class Header extends React.Component {
  render() {
    return (
      <div style={styles.base} >
        <i className="fa fa-gears"
           style={styles.settingsIcon} ></i>
        <p style={styles.cityState} >San Francisco, CA</p>
        <p style={styles.headerDate} >tuesday, june 26</p>
      </div>
    )
  }
}

export default new Radium(Header)
