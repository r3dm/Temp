import React from 'react'
import Radium from 'radium'
import { Navigation } from 'react-router'
import Color from 'color'
import { weatherColor } from '../utils/weatherColor.js'
import convertTemp from '../utils/convertTemp.js'

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
    fontFamily: '"Comfortaa-Light", sans-serif',
    flexDirection: 'column',
    padding: '10px'
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  optionText: {
    fontSize: '2em',
    padding: '10px 10px 10px 15vw'
  },
  input: {
    display: 'none'
  },
  radio: {
    display: 'flex',
    flexDirection: 'column',
    width: '2em',
    height: '2em',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1em',
    marginRight: '10vw'
  },
  check: {
    width: '1em',
    height: '1em',
    backgroundColor: 'grey',
    borderRadius: '1em'
  }
}

let Settings = React.createClass({
  getInitialState: function() {
    return {
      units: this.props.state.units,
      temp: this.props.state.temp
    }
  },
  mixins: [Navigation],

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      units: nextProps.state.units,
      temp: nextProps.state.temp
    });
  },

  handleChange: function(event) {
    this.setState({
      units: event.target.value,
      temp: convertTemp.convertUnits(this.state.temp, event.target.value)
    })
  },
  transitionSync: function() {
    this.props.syncFunc(this.state)
    this.transitionTo('home')
  },

  render: function() {
    let mainColor = weatherColor(this.state.temp, this.state.units)
    styles.base.backgroundColor = mainColor

    var check = <div style={styles.check} ></div>
    return (
      <div style={styles.base} >

        <i className="fa fa-angle-double-left"
           style={styles.backIcon}
           onClick={() => this.transitionSync()}></i>
        <div style={styles.navigation} >
          <p style={styles.header}>
            Settings
          </p>
        </div>

        <div style={styles.body} >
          <label style={styles.label}>
            <input
              type="radio"
              name="unitsSelect"
              checked={this.state.units === 'metric'}
              onChange={this.handleChange}
              style={styles.input}
              value="metric" />

            <span style={styles.optionText}>Celsius</span>
            <div style={ styles.radio }>
              <div style={ this.state.units === 'metric' ? styles.check : null }></div>
            </div>
          </label>
          <label style={styles.label}>
            <input
              type="radio"
              name="unitsSelect"
              checked={this.state.units === 'imperial'}
              onChange={this.handleChange}
              style={styles.input}
              value="imperial" />

            <span style={styles.optionText}>Fahrenheit</span>
            <div style={ styles.radio }>
              <div style={ this.state.units === 'imperial' ? styles.check : null }></div>
            </div>
          </label>

        </div>

      </div>
    )
  }
})
Settings.propTypes = {
  state: React.PropTypes.object,
  syncFunc: React.PropTypes.func
}

export default new Radium(Settings)
