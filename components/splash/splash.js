import React from 'react'
import { Navigation } from 'react-router'

let Splash = React.createClass({
  mixins: [Navigation],

  render: function() {
    return (
      <div className="splash-wrapper"
           onClick={() => this.transitionTo('home')} >
        <i className="wi wi-day-sunny sun-icon"></i>
        <h1 className="splash">
          temp
          <span className="splash-degree">&deg;</span>
        </h1>
        <div className="splash-filler"></div>
      </div>
    )
  }
})

export default Splash
