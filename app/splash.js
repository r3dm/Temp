import React from 'react'

let Splash = React.createClass({
  render: function() {
    return (
      <div class="splash-wrapper">
        <img src="tempSun.png" id="sun-icon" />
        <h1 class="splash">
          temp
          <span class="splash-degree">&deg;</span>
        </h1>
      </div>
    )
  }
})

export default Splash
