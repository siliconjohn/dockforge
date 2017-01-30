import React from 'react'
import { connect, dispatch } from 'react-redux'

class DockComponent extends React.Component {

  constructor( props ) {
    super( props )
    
    this.state = {
      isDraggingOver: false,  // old

      isDragging: false,
      draggingStartX: 0,
      draggingStartY: 0,
      draggingCurrentX: 0,
      draggingCurrentY: 0,

    }

    // bind so props can be accessed
    this.onDrop = this.onDrop.bind( this )
    this.onDragOver = this.onDragOver.bind( this )
    this.onDragLeave = this.onDragLeave.bind( this )
    this.onDragEnter = this.onDragEnter.bind( this )
    this.onMouseOut = this.onMouseOut.bind( this )
    this.onMouseDown = this.onMouseDown.bind( this )
    this.onMouseMove = this.onMouseMove.bind( this )
    this.onMouseUp = this.onMouseUp.bind( this )
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




  onMouseDown( event ) {
    this.setState({
      isDragging: true,
      draggingStartX: event.clientX,
      draggingStartY: event.clientY,
      draggingCurrentX: event.clientX,
      draggingCurrentY: event.clientY,
    })
  }

  onMouseUp( event ) {
    if( this.state.isDragging == true ) {
      this.setState({
        isDragging: false
      })
    }
  }

  onMouseOut( event ) {
    if( this.state.isDragging == true ) {
      this.setState({
        isDragging: false
      })
    }
  }

  onMouseMove( event ) {
    if( this.state.isDragging == true ) {
      this.setState({
        draggingCurrentX: event.clientX,
        draggingCurrentY: event.clientY,
      })
    }
  }

  render() {
    let { left, bottom, width, height, draggingComponent } = this.props
    let { isDragging } = this.state

    // setup the position as an inline style
    let style = {
      left: `${left}px`,
      bottom: `${bottom}px`,
      width: `${width}px`,
      height: `${height}px`,
    }

    let noDragClass = ''
    // if( isDraggingOver == true ) {
    //   noDragClass = ' red'
    // }
    let translate = ""

    if( isDragging == true ) {
      let {draggingStartX,draggingCurrentX,draggingStartY,draggingCurrentY} = this.state
      translate = `translate(${draggingCurrentX - draggingStartX },${  draggingCurrentY - draggingStartY})`

    } else {
      console.log('render');
    }



    return (
      <g transform={ translate }>
        <rect onMouseMove= { this.onMouseMove } onMouseDown={ this.onMouseDown } onMouseUp={ this.onMouseUp }  onMouseOut={ this.onMouseOut }
          className={`dock-component${noDragClass}`} style={ style } onDrop={ this.onDrop }
          onDragOver={ this.onDragOver } onDragLeave={ this.onDragLeave }
          onDragEnter={ this.onDragEnter }
          x={ left } y={ bottom } width={ width } height= { height } stroke="darkblue" strokeWidth="1"  fill="red"/>
      </g>
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
