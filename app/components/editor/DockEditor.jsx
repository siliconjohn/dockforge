import React from 'react'
import DockPicker from 'DockPicker'
import DockView from 'DockView'

class DockEditor extends React.Component {

  render() {
    return (
      <div className="dock-editor container-fluid height-100">
        <div className="row height-100">
          <div className="col-xs-8 col-sm-9 col-lg-10 dock-view-column">
            <DockView/>
          </div>
          <div className="col-xs-4 col-sm-3 col-lg-2 dock-picker-column">
            <DockPicker/>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = DockEditor
