import React from 'react'

class DockComponent extends React.Component {

  render() {
    let { children } = this.props

    return (
      <div className="dock-component">
      { children }
      </div>
    )
  }
}

DockComponent.propTypes = {
  children: React.PropTypes.object
}

module.exports = DockComponent
