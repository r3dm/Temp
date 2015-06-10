import React from 'react'
import Radium from 'radium'

/*
 * main horizontal divider for app
 */
var styles = {
  base: {
    padding: '7px 0 5px 0',
    width: '100%'
  },

  mainBarsChild: {
    width: '40px',
    paddingBottom: '3px',
    margin: '0 auto',
    borderTop: '2px solid white'
  }
}

class Divider extends React.Component {
  render() {
    return (
      <div
        id="mainDivider"
        style={styles.base}
      >
        <div style={styles.mainBarsChild} ></div>
        <div style={styles.mainBarsChild} ></div>
        <div style={styles.mainBarsChild} ></div>
      </div>
    )
  }
}

export default new Radium(Divider)
