import React from 'react'

let Header = React.createClass({
  render() {
    return (
      <div className="header-wrapper">
        <i className="settings-icon fa fa-gears"></i>
        <p className="city-state">san francisco, ca</p>
        <p className="header-date">tuesday, june 26</p>
      </div>
    )
  }
})

export default Header
