import React from 'react'
import Radium from 'radium'
import { Navigation } from 'react-router'
import { weatherColor } from '../utils/weatherColor.js'
import { fetchWeather } from '../utils/weather.js'
import Color from 'color'
import classNames from 'classnames'
import Modal from 'boron/FadeModal'
import modalStyles from '../utils/modalStyles.js'

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
    backgroundColor: 'white',
    borderRadius: '1em'
  },
  geoRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1em 0'
  },
  geoButton: {
    width: '1.3em',
    height: '1.3em',
    fontSize: '2em',
    color: 'white',
    background: 'none',
    border: '3px solid white',
    borderRadius: '10px',
    marginRight: '9vw',
    flexShrink: 0,
    textAlign: 'center'
  },
  geoLabelContainer: {
    fontSize: '1.8em',
    flexGrow: 1,
    flexShrink: 1
  },
  geoLabel: {
    padding: '5px 0 0 15vw'
  },
  location: {
    fontSize: '1.5em',
    textAlign: 'center'
  }
}

let Settings = React.createClass({
  propTypes: {
    state: React.PropTypes.object,
    syncFunc: React.PropTypes.func
  },
  mixins: [Navigation],

  getInitialState: function() {
    return {
      online: window.navigator.onLine,
      temp: this.props.state.temp,
      units: this.props.state.units
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      units: nextProps.state.units,
      temp: nextProps.state.temp
    })
  },

  // updates settings component state upon user input to form
  handleChange: function(event) {
    this.setState({
      units: event.target.value
    })
  },

  // synchronizes the settings component state object with the app's topmost
  // state object
  transitionSync: function() {
    this.props.syncFunc(this.state)
    this.transitionTo('home')
  },
  fetchNewWeather() {
    this.showSpinner()
    fetchWeather().then((result) => {
      this.setState(result)
      this.hideSpinner()
    })
  },
  showSpinner() {
    this.refs.modal.show()
  },
  hideSpinner() {
    this.refs.modal.hide()
  },
  warnOffline() {
    if(navigator.notification) {
      navigator.notification.alert('you are currently offline', // message
                                   null, // callback
                                   'Warning', // title
                                   'OK') // button name
    }
  },

  render: function() {
    let mainColor = weatherColor(this.state.temp)
    let shadow = 'white'
    if(mainColor !== 'white') {
      shadow = new Color(mainColor).darken(0.3).hslaString()
    }
    styles.base.backgroundColor = mainColor
    styles.radio.backgroundImage = `radial-gradient(circle, ${mainColor} 10%, ${shadow} 80%)`
    modalStyles.modalText.backgroundColor = new Color(mainColor).darken(0.2).hslaString()

    // radio button check-fill object
    var check = <div style={styles.check} ></div>

    // Cordova-specific check
    if(window.device && device.platform === 'iOS') {
      styles.base.paddingTop = '23px'
    }

    // cityName has two sources of truth - give precedence to local state object
    var cityName = 'N/A'
    if(this.state.cityName) {
      cityName = this.state.cityName
    } else if (this.props.state.cityName) {
      cityName = this.props.state.cityName
    }

    return (
      <div style={styles.base} >

        <nav>
          <i
            className="fa fa-angle-double-left"
            onClick={() => this.transitionSync()}
            onTouchEnd={() => this.transitionSync()}
            style={styles.backIcon}></i>

          <div style={styles.navigation} >
            <p style={styles.header}>
              Settings
            </p>
          </div>
        </nav>

        <div style={styles.body} >

          <label style={styles.label}>
            <input
              checked={this.state.units === 'metric'}
              name="unitsSelect"
              onChange={this.handleChange}
              style={styles.input}
              type="radio"
              value="metric" />

            <span style={styles.optionText}>Celsius</span>
            <div style={ styles.radio }>
              { this.state.units === 'metric' ? check : null }
            </div>
          </label>
          <label style={styles.label}>
            <input
              checked={this.state.units === 'imperial'}
              name="unitsSelect"
              onChange={this.handleChange}
              style={styles.input}
              type="radio"
              value="imperial" />

            <span style={styles.optionText}>Fahrenheit</span>
            <div style={ styles.radio }>
              { this.state.units === 'imperial' ? check : null }
            </div>
          </label>

          <div style={styles.geoRow} >
            <div style={styles.geoLabelContainer}>
              <div style={styles.geoLabel}>
                Geolocation
              </div>
            </div>
            <div
              onClick={() => {
                if(this.state.online) {
                  this.fetchNewWeather()
                } else {
                  this.warnOffline()
                }
              }}
              style={styles.geoButton}
              >
              <i className='fa fa-location-arrow' />
            </div>
          </div>

          <div style={styles.location} >
            <div>Your location:</div>
            <div>{ cityName }</div>
          </div>

        </div>
        <Modal ref="modal" >
          <div style={modalStyles.modal} >
            <h2 style={modalStyles.modalText} >
              <i className='fa fa-circle-o-notch fa-spin' />
            </h2>
          </div>
        </Modal>
      </div>
    )
  }
})

export default new Radium(Settings)
