import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect, dispatch } from 'react-redux'
import { setMouseDraggingElement, moveDockComponent } from 'actions'

class Draggable extends React.Component {

  constructor( props ) {
    super( props )

    this.state = {
      isDraggingOver: false,
      isDragging: false,
      draggingStartX: 0,
      draggingStartY: 0,
    }

    // used in drag
    this.lastMouseDragXDistance = 0
    this.lastMouseDragYDistance = 0

    // bind functions so props can be accessed
    this.onDrop = this.onDrop.bind( this )
    this.onDragOver = this.onDragOver.bind( this )
    this.onDragLeave = this.onDragLeave.bind( this )
    this.onDragEnter = this.onDragEnter.bind( this )
    this.onMouseDown = this.onMouseDown.bind( this )
    this.onMouseUp = this.onMouseUp.bind( this )
    this.onTouchStart = this.onTouchStart.bind( this )
    this.onTouchEnd = this.onTouchEnd.bind( this )
    this.onTouchCancel = this.onTouchCancel.bind( this )
    this.performMouseDrag = this.performMouseDrag.bind( this )
  }

  shouldComponentUpdate( nextProps, nextState ) {
    // determines if this component should update based on
    // if dragging = true and if the mouseMoveXY changed
    if( nextProps.mouseMoveXY !== this.props.mouseMoveXY ) {
      if( this.state.isDragging == true ) {
        this.performMouseDrag( nextProps.mouseMoveXY )
      }
      return false
    }
    return true
  }

  componentWillReceiveProps ( nextProps, nextState ) {
    // if mouseDraggingElement changed, turn off drag in this.state, and
    // update element's transform attr
    if( this.props.mouseDraggingElement !== nextProps.mouseDraggingElement ) {
      if( nextProps.mouseDraggingElement == false) {
        // turn off and reset drag to original position
        this.setState({
          isDragging:false,
          draggingStartX: 0,
          draggingStartY: 0,
        })

        // remove transform attr
        findDOMNode(this).setAttribute('transform',"")

        return true
      }
    }
  }

  ////////////////////////////////////////////////////////
  // these are for the html 5 drag and drop functionality
  // which is used to drop NEW componets from outside the
  // main svg element
  ////////////////////////////////////////////////////////

  onDrop( event ) {
    try {
      let data = this.props.draggingComponent

      // new component can't be dropped here ( for now )
      if( data.source == "newComponent") {
        event.preventDefault()
        event.stopPropagation()
      }
    } catch( e ) { }
  }

  onDragEnter( event ) {
    try {
      let data = this.props.draggingComponent

      // new component can't be dropped here ( for now )
      if( data.source == "newComponent") {
        this.setState({
          isDraggingOver:true
        })
        event.stopPropagation()
      }
    } catch( e ) { }
  }

  //USE THIS LATER FOR ADDING CONNECTED COMPONENTS
  onDragOver( event ) {
    event.stopPropagation()

    // let data = this.props.draggingComponent
    //
    // // just incase
    // if( typeOf data  === undefined ) return
    //
    // // new component can't be dropped here ( for now )
    // if( data.source == "newComponent") {
    //
    //   event.stopPropagation()
    // }
  }

  onDragLeave( event ) {
    if( this.state.isDraggingOver == true ) {
      this.setState({
        isDraggingOver:false
      })
    }
  }

  ////////////////////////////////////////////////////////
  // these are for the draging this components within the
  // svg element
  ////////////////////////////////////////////////////////

  // moves this component by adding a transform attribute,
  // this is only to be used for dragging
  performMouseDrag( xy ) {
    let rotate = this.context.svgRotation
    let { draggingStartX, draggingStartY } = this.state
    let x = 0
    let y = 0
    let multX = 1
    let multY = 1

    ////////////////////////////////////////////
    // adjust the point to accomadate svgRotation
    ////////////////////////////////////////////

    switch( rotate ) {
      case 90:
        multX = -1
        multY = 1
        y = xy[0] * multX - draggingStartX * multX
        x = xy[1] * multY - draggingStartY * multY
        break
      case 180:
        multX = -1
        multY = -1
        x = xy[0] * multX - draggingStartX * multX
        y = xy[1] * multY - draggingStartY * multY
        break
      case 270:
        multX = 1
        multY = -1
        y = xy[0] * multX - draggingStartX * multX
        x = xy[1] * multY - draggingStartY * multY
        break
      default:
        x = xy[0] - draggingStartX
        y = xy[1] - draggingStartY
    }

    this.lastMouseDragXDistance = x
    this.lastMouseDragYDistance = y
    findDOMNode( this ).setAttribute( 'transform',`translate(${x},${y})` )
  }

  onMouseUp( event ) {
    let { draggingStartX, draggingStartY } = this.state
    let { left, bottom, uuid } = this.props

    // turn off isDragging
    if( this.state.isDragging == true ) {
      this.setState({
        isDragging: false,
        draggingStartX: 0,
        draggingStartY: 0,
      })
      this.props.dispatch( setMouseDraggingElement( false ))

      // move the component
      let options = {}
      options.uuid = uuid
      options.left = this.lastMouseDragXDistance
      options.bottom = this.lastMouseDragYDistance
      this.props.dispatch( moveDockComponent( options ))

      // reset values
      this.lastMouseDragXDistance = 0
      this.lastMouseDragYDistance = 0

      event.stopPropagation()
    } else {
      this.props.dispatch( setMouseDraggingElement( false ))
    }
  }

  onMouseDown( event ) {
    // turn on isDragging
    if( this.state.isDragging == false ) {
      let svg = document.getElementById( "svg-el" )
      let point = svg.createSVGPoint()

      // translate the screen point to svg's point, this enable the
      // svg to be scaled to any size and the drag will still work
      // accurately
      point.x = event.clientX
      point.y = event.clientY;
      point = point.matrixTransform( svg.getScreenCTM().inverse() )

      this.setState({
        isDragging: true,
        draggingStartX: point.x,
        draggingStartY: point.y,
      })

      this.props.dispatch( setMouseDraggingElement( true ))
      event.stopPropagation()
    }
  }

  onTouchStart( event ){
    let svg = document.getElementById( "svg-el" )
    let point = svg.createSVGPoint()
    let touch = event.touches[0]

    // translate the screen point to svg's point, this enable the
    // svg to be scaled to any size and the drag will still work
    // accurately
    point.x = touch.clientX
    point.y = touch.clientY;
    point = point.matrixTransform( svg.getScreenCTM().inverse() )

    this.setState({
      isDragging: true,
      draggingStartX: point.x,
      draggingStartY: point.y,
    })

    this.props.dispatch( setMouseDraggingElement( true ))
  }

  onTouchCancel() {
    if( this.state.isDragging == true ) {
      this.setState({
        isDragging: false
      })
    }
  }

  onTouchEnd() {
    let { draggingStartX, draggingStartY } = this.state
    let { left, bottom, uuid } = this.props

    // turn off isDragging
    if( this.state.isDragging == true ) {
      this.setState({
        isDragging: false,
        draggingStartX: 0,
        draggingStartY: 0,
      })

      this.props.dispatch( setMouseDraggingElement( false ))

      // move the component
      let options = {}
      options.uuid = uuid
      options.left = this.lastMouseDragXDistance
      options.bottom = this.lastMouseDragYDistance
      this.props.dispatch( moveDockComponent( options ))

      // reset values
      this.lastMouseDragXDistance = 0
      this.lastMouseDragYDistance = 0
    }
  }

  ////////////////////////////////////////////////////////

  render() {
    //3let { left, bottom, width, height, draggingComponent } = this.props
    // let { isDragging, isDraggingOver } = this.state
    //
    // let noDragClass = ''
    // if( isDraggingOver == true ) {
    //   noDragClass = ' red'
    // }

    return (
      <g onMouseDown={ this.onMouseDown }
        onMouseUp={ this.onMouseUp }
        onTouchStart={ this.onTouchStart }
        onTouchEnd={ this.onTouchEnd }
        onTouchMove={ this.onTouchMove }
        onTouchCancel={ this.onTouchCancel }
        onDrop={ this.onDrop }
        onDragOver={ this.onDragOver }
        onDragLeave={ this.onDragLeave }
        onDragEnter={ this.onDragEnter }>
        {this.props.children}
      </g>
    )
  }
}

Draggable.propTypes = {
  dock: React.PropTypes.object,
  bottom: React.PropTypes.number,
  left: React.PropTypes.number,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  uuid: React.PropTypes.string.isRequired,
  draggingComponent: React.PropTypes.object,
  children: React.PropTypes.array
}

Draggable.contextTypes = {
  svgRotation: React.PropTypes.number
}

export default connect (( state ) => {
  return {
    draggingComponent: state.draggingComponent,
    mouseDraggingElement: state.mouseDraggingElement,
    mouseMoveXY: state.mouseMoveXY,
  }
})( Draggable )
