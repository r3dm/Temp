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
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px'
  },
  option: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: '2em',
    padding: '10px 10px 10px 50px'
  },
  radio: {
    display: 'flex',
    alignItems: 'center',
    width: '2em',
    height: '2em',
    margin: '0 20px 0 0',
    padding: 0,
    borderRadius: '1em',
    backgroundColor: 'white'
  },
  check: {
    width: '1em',
    height: '1em',
    margin: '0 auto',
    padding: 0,
    borderRadius: '1em',
    backgroundColor: 'grey'
  }
}

let Settings = React.createClass({
  getInitialState: function() {
    return {
      units: ''
    }
  },

  mixins: [Navigation],

  render: function() {
    let mainColor = weatherColor(this.props.state.temp)
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
        <div style={styles.body} >
          <div style={styles.option} >
            <div style={styles.label}>Celsius</div>
            <div style={styles.radio} >
              <div style={styles.check} ></div>
            </div>
          </div>
          <div style={styles.option} >
            <span style={styles.label}>Farenheit</span>
            <div style={styles.radio} >
              <div style={styles.check} ></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
Settings.propTypes = {
  state: React.PropTypes.object
}

export default new Radium(Settings)
