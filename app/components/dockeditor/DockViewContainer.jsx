import React from 'react'
import DockView from 'DockView'
import ShoreView from 'ShoreView'

class DockViewContainer extends React.Component {

  componentDidMount() {
    // scroll to bottom
    var element = $(".dock-shore-panel-body")
    element.scrollTop( element[0].scrollHeight)
  }

  render() {
    return (
      <div className="dock-view-container">
        <div className="panel panel-default">
          <div className="panel-body dock-shore-panel-body">
            <div className="dock-shore-parent">
              <DockView/>
              <ShoreView/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = DockViewContainer
