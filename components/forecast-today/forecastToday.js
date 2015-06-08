import React from 'react'
import ForecastHourly from '../forecast-hourly/forecastHourly.js'
import Radium from 'radium'
import Common from '../../styles/common.js'

class ForecastToday extends React.Component {
  render() {
    return (
      <div style={styles.base} >
        <div style={styles.forecastTodayWrapper} >
          <div style={styles.mainTempWrapper} >
            <span className="temperature">
              { this.props.temp }
            </span>
            <span style={styles.degrees} >&deg;</span>
          </div>

          <div style={styles.forecastAndChance} >
            <div style={styles.forecastAndChanceChild} >
              <i style={styles.icon}
                 className="wi wi-rain"></i>
              <p>rainy</p>
            </div>

            <div style={styles.divider} ></div>

            <div style={styles.forecastAndChanceChild} >
              <i style={styles.icon}
                 className="wi wi-sprinkles"></i>
              <p>100%</p>
            </div>
          </div>
        </div>

        <div style={styles.mainBars} >
          <div style={styles.mainBarsChild} ></div>
          <div style={styles.mainBarsChild} ></div>
          <div style={styles.mainBarsChild} ></div>
        </div>

        <div style={styles.overflowDiv} >
          <ForecastHourly color="#4c869b" time="3:00pm" temperature="65" forecast="rain" />
          <ForecastHourly color="#5aa0ba" time="4:00pm" temperature="66" forecast="cloudy" />
          <ForecastHourly color="#5aa0ba" time="5:00pm" temperature="66" forecast="cloudy" />
          <ForecastHourly color="#77b3c9" time="6:00pm" temperature="67" forecast="day-cloudy" />
          <ForecastHourly color="#77b3c9" time="7:00pm" temperature="67" forecast="day-cloudy" />
          <ForecastHourly color="#94cade" time="8:00pm" temperature="68" forecast="day-sunny" />
          <ForecastHourly color="#94cade" time="9:00pm" temperature="68" forecast="day-sunny" />
          <ForecastHourly color="#b6e5f7" time="10:00pm" temperature="69" forecast="cloudy" />
          <ForecastHourly color="#b6e5f7" time="11:00pm" temperature="69" forecast="cloudy" />
        </div>
      </div>
    )
  }
}

var styles = {
  base: {
    backgroundColor: Common.tempBlue,
    flexGrow: 1,
    overflow: 'scroll'
  },

  forecastTodayWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65vh'
  },

  mainTempWrapper: {
    fontSize: '7em',
    maxWidth: '50%'
  },

  degrees: {
    fontSize: '0.8em',
    verticalAlign: 'top'
  },

  forecastAndChance: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: '50%',
    textAlign: 'center',
  },

  icon: {
    fontSize: '3em'
  },

  forecastAndChanceChild: {
    width: '20vw'
  },

  divider: {
    height: '6em',
    width: 0,
    color: Common.altFontColor,
    border: '1px solid'
  },

  mainBars: {
    padding: '7px 0',
    borderBottom: '2px solid ' + Common.altFontColor
  },

  mainBarsChild: {
    width: '40px',
    paddingBottom: '3px',
    margin: '0 auto',
    borderTop: '2px solid white'
  },

  overflowDiv: {
    overflow: 'auto',
    height: '55vh',
    borderTop: '2px solid border-color',
    borderBottom: '2px solid alt-font-color'
  }
}

export default Radium(ForecastToday)
