import React from 'react'

class DockComponent extends React.Component {

  render() {
    return (
      <div className="dock-component">
      { this.props.children }
      </div>
    )
  }
}

DockComponent.propTypes = {
  children: React.PropTypes.object
}

module.exports = DockComponent
