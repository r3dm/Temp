import React from 'react'
import Radium from 'radium'
import { Navigation } from 'react-router'
import { weatherColor } from '../utils/weatherColor.js'
import convertTemp from '../utils/convertTemp.js'
import { fetchWeather } from '../utils/weather.js'
import Color from 'color'
import classNames from 'classnames'

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
      querying: false,
      temp: this.props.state.temp,
      units: this.props.state.units,
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

  // request geolocation data from browser
  // pass latitude/longitude to openweathermap.org api
  fetchWeather: function() {
    if(navigator.geolocation) {
      var promise = new Promise((resolve) => {
        console.log('browser supports geolocation, waiting for user')
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('browser gps given', position)
            var result = fetchWeather(position.coords.latitude,
                                      position.coords.longitude,
                                      'imperial')
                            .then(this.weatherCallback, this.fetchWeatherError)
            result.lat = position.coords.latitude
            result.lon = position.coords.longitude
            console.log('return value', result)

            resolve(result)
          },
          () => { // error
            console.log('geolocation error branch, fetch weather anyway')
            resolve(
              fetchWeather(this.state.lat, this.state.lon, this.state.units)
                .then(this.weatherCallback, this.fetchWeatherError)
            )
          }
        )
      })
      promise.then((result) => {
        this.setState(result)
      })
    } else {
      console.log('no geolocation available')
    }
  },

  // used for weather api callbacks, parses the raw response into the fields
  // we want
  weatherCallback(results) {
    console.log('response:', results)
    var weather = results[0].body
    var hourlyForecast = results[1].body.list
    var fiveDayForecast = results[2].body.list

    // weather api may return an array here, so we check
    var currentWeather = Array.isArray(weather.weather) ?
                    weather.weather[0] :
                    weather.weather
    this.hideSpinner()
    return {
      weather,
      hourlyForecast,
      fiveDayForecast,
      temp: Math.round(weather.main.temp),
      cityName: weather.name,
      sunrise: weather.sys.sunrise,
      sunset: weather.sys.sunset,
      currentConditions: currentWeather.main,
      country: weather.sys.country
    }
  },
  fetchWeatherError(reason) {
    console.log(reason)
  },
  showSpinner() {
    this.setState({ querying: true })
  },
  hideSpinner() {
    this.setState({ querying: false })
  },
  warnOffline() {
    if(navigator.notification) {
      navigator.notification.alert("you are currently offline", // message
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

    // radio button check-fill object
    var check = <div style={styles.check} ></div>

    // Cordova-specific check
    if(window.device && device.platform === 'iOS') {
      styles.base.paddingTop = '23px'
    }

    // cityName has two sources of truth - give precedence to local state object
    var cityName = 'N/A';
    if(this.state.cityName) {
      cityName = this.state.cityName
    } else if (this.props.state.cityName) {
      cityName = this.props.state.cityName
    }
    var spinnerClasses = classNames({
      'fa': true,
      'fa-location-arrow': !this.state.querying,
      'fa-circle-o-notch fa-spin': this.state.querying
    })

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
              style={styles.geoButton}
              onClick={() => {
                if(this.state.online) {
                  this.fetchWeather()
                  this.showSpinner()
                } else {
                  this.warnOffline()
                }
              }}>
              <i className={spinnerClasses} />
            </div>
          </div>

          <div style={styles.location} >
            <div>Your location:</div>
            <div>{ cityName }</div>
          </div>

        </div>
      </div>
    )
  }
})

export default new Radium(Settings)
