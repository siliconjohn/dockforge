import React from 'react'
import ScaleButtons from 'ScaleButtons'

class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
             Dock Tool
            </a>
            <ScaleButtons/>           
          </div>
        </div>
      </nav>
    )
  }
}

module.exports = Navbar
