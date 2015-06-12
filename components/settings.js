import React from 'react'
import Radium from 'radium'
import { Navigation } from 'react-router'

let Settings = React.createClass({
  mixins: [Navigation],

  render: function () {
    return (
      <div>
        <h2>
          Settings
        </h2>
        <div onClick={() => this.transitionTo('home')}>
          Go Back
        </div>
      </div>
    )
  }
})

export default new Radium(Settings)
