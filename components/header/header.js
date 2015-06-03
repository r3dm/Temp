import React from 'react'

let Header = React.createClass({
  render() {
    return (
      <div className="header-wrapper">
        <div className="settings-icon">*</div>
        <p className="city-state">san francisco, ca</p>
        <p className="header-date">tuesday, june 26</p>
      </div>
    )
  }
})

export default Header
