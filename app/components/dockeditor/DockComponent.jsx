import React from 'react'

class DockComponent extends React.Component {

  constructor( props ) {
    super( props )

    // bind onDragStart so props can be accessed
    this.onDrop = this.onDrop.bind( this )
    this.onDragOver = this.onDragOver.bind( this )
  }

  onDrop( event ) {
    let data = JSON.parse( event.dataTransfer.getData( "text" ))

    // new component can't be dropped here ( for now )
    if( data.source == "newComponent") {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  onDragOver( event ) {
    event.stopPropagation()
  }

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
      <div className="dock-component" style={ style } onDrop={ this.onDrop }
        onDragOver={ this.onDragOver }></div>
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
