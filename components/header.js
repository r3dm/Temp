import React from 'react'
import Radium from 'radium'
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
  mixins: [Navigation],

  render() {
    styles.base.backgroundColor = weatherColor(this.props.temp)
    var cityState = this.props.cityName + ', ' + this.props.country
    if(cityState.length > 22) {
      cityState = cityState.slice(0, 22) + ' ...'
    }

    return (
      <div style={styles.base} >
        <div style={styles.cityTimeWrapper}>
          <p style={styles.cityState} >
            { cityState }
          </p>
          <p style={styles.headerDate} >tuesday, june 26</p>
        </div>
        <i className="fa fa-gears"
           style={styles.settingsIcon}
           onClick={() => this.transitionTo('settings')}></i>
      </div>
    )
  }
})
Header.propTypes = {
  cityName: React.PropTypes.string,
  country: React.PropTypes.string,
  temp: React.PropTypes.number
}

export default new Radium(Header)