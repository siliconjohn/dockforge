import React from 'react'
import DockView from 'DockView'

class DockViewContainer extends React.Component {

  render() {
    return (
      <div className="dock-view-container">
        <div className="panel panel-default">
          <div className="panel-heading">Dock Editor</div>
          <div className="panel-body">
            <DockView/>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = DockViewContainer
