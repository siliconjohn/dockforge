import React from 'react'
import DockComponent from 'DockComponent'

class DockView extends React.Component {

  render() {
    return (
      <div className="dock-view">
        <DockComponent><DockComponent></DockComponent></DockComponent>
      </div>
    )
  }
}

module.exports = DockView
