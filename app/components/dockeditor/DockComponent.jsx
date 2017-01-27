import React from 'react'
import { connect, dispatch } from 'react-redux'

class DockComponent extends React.Component {

  constructor( props ) {
    super( props )

    this.state = {
      isDraggingOver: false
    }
    
    // bind so props can be accessed
    this.onDrop = this.onDrop.bind( this )
    this.onDragOver = this.onDragOver.bind( this )
    this.onDragLeave = this.onDragLeave.bind( this )
    this.onDragEnter = this.onDragEnter.bind( this )
  }

  onDrop( event ) {
    let data = this.props.draggingComponent

    // new component can't be dropped here ( for now )
    if( data.source == "newComponent") {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  onDragEnter( event ) {
    let data = this.props.draggingComponent

    // new component can't be dropped here ( for now )
    if( data.source == "newComponent") {
      this.setState({
        isDraggingOver:true
      })
      event.stopPropagation()
    }
  }

  onDragOver( event ) {
    let data = this.props.draggingComponent

    // new component can't be dropped here ( for now )
    if( data.source == "newComponent") {

      event.stopPropagation()
    }
  }

  onDragLeave( event ) {
    if( this.state.isDraggingOver == true ) {
      this.setState({
        isDraggingOver:false
      })
    }
  }

  render() {
    let { left, bottom, width, height, draggingComponent } = this.props
    let { isDraggingOver } = this.state

    // setup the position as an inline style
    let style = {
      left: `${left}px`,
      bottom: `${bottom}px`,
      width: `${width}px`,
      height: `${height}px`,
    }

    let noDragClass = ''
    if( isDraggingOver == true ) {
      noDragClass = ' red'
    }

    return (
      <div className={`dock-component${noDragClass}`} style={ style } onDrop={ this.onDrop }
        onDragOver={ this.onDragOver } onDragLeave={ this.onDragLeave }
        onDragEnter={ this.onDragEnter }></div>
    )
  }
}

DockComponent.propTypes = {
  bottom: React.PropTypes.number.isRequired,
  left: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  draggingComponent: React.PropTypes.object
}

export default connect (( state ) => {
  return {
    draggingComponent: state.draggingComponent
  }
})( DockComponent )
