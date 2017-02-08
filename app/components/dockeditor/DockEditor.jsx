import React from 'react'
import ComponentPicker from 'ComponentPicker'
import DockViewContainer from 'DockViewContainer'

class DockEditor extends React.Component {

  render() {
    return (
      <div className="dock-editor container-fluid height-100">
        <div className="row height-100">
          <div className="col-xs-8 col-sm-9 col-lg-10 dock-view-column">
            <DockViewContainer/>
          </div>
          <div className="col-xs-4 col-sm-3 col-lg-2 component-picker-column">
            <ComponentPicker/>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = DockEditor
