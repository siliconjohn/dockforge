import React from 'react'
import Navbar from 'Navbar'
import DockPicker from 'DockPicker'
import DockView from 'DockView'

class AppContainer extends React.Component {

  render() {
    return (
      <div>
        <Navbar/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-8 col-sm-9 col-lg-10">
              <DockView/>
            </div>
            <div className="col-xs-4 col-sm-3 col-lg-2">
              <DockPicker/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = AppContainer
