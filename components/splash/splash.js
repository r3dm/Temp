import React from 'react'

let Splash = React.createClass({
  render: function() {
    return (
      <div className="splash-wrapper">
        <img src="tempSun.png" id="sun-icon" />
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
