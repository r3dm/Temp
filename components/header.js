import React from 'react'
import Radium from 'radium'
import moment from 'moment'
import { Navigation } from 'react-router'
import { weatherColor } from '../utils/weatherColor.js'

var styles = {
  base: {
    padding: '7px 0px 7px 7px',
    flexShrink: '0',
    display: 'flex',
    flexDirection: 'row'
  },
  cityTimeWrapper: {
    flexGrow: 1
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
    fontSize: '2em',
    padding: '10px 10px'
  }
}

let Header = React.createClass({
  propTypes: {
    cityName: React.PropTypes.string,
    country: React.PropTypes.string,
    temp: React.PropTypes.number,
    units: React.PropTypes.string
  },
  mixins: [Navigation],

  render() {
    styles.base.backgroundColor = weatherColor(this.props.temp, this.props.units)
    var cityState = this.props.cityName + ', ' + this.props.country
    if(cityState.length > 20) {
      cityState = cityState.slice(0, 18) + ' ...'
    }

    return (
      <div style={styles.base} >
        <div style={styles.cityTimeWrapper}>
          <p style={styles.cityState} >
            { cityState }
          </p>
          <p style={styles.headerDate} >
            { moment().format('dddd, MMMM D') }
          </p>
        </div>
        <i
          className="fa fa-gears"
          onClick={() => this.transitionTo('settings')}
          style={styles.settingsIcon}></i>
      </div>
    )
  }
})

export default new Radium(Header)
