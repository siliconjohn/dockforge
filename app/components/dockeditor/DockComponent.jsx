import React from 'react'

class DockComponent extends React.Component {

  render() {
    let { left, bottom, width, height } = this.props

    // setup the position as an inline style
    let style = {
      left: `${left}px`,
      bottom: `${bottom}px`,
      width: `${width}px`,
      height: `${height}px`,
    }
    return (
      <div className="dock-component" style={ style }></div>
    )
  }
}

DockComponent.propTypes = {
  bottom: React.PropTypes.number.isRequired,
  left: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
}

module.exports = DockComponent
