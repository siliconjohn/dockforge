import React from 'react'
import ToolbarButtons from 'ToolbarButtons'

class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="navbar-brand">Dock Tool</div>
            <ToolbarButtons/>
          </div>
        </div>
      </nav>
    )
  }
}

module.exports = Navbar
