import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect, dispatch } from 'react-redux'
import { setMouseDraggingElement } from 'actions'

class DockComponent extends React.Component {

  constructor( props ) {
    super( props )

    this.state = {
      isDraggingOver: false,
      isDragging: false,
      draggingStartX: 0,
      draggingStartY: 0,
    }

    // bind functions so props can be accessed
    this.onDrop = this.onDrop.bind( this )
    this.onDragOver = this.onDragOver.bind( this )
    this.onDragLeave = this.onDragLeave.bind( this )
    this.onDragEnter = this.onDragEnter.bind( this )
    this.onMouseDown = this.onMouseDown.bind( this )
    this.onMouseUp = this.onMouseUp.bind( this )
    this.onTouchStart = this.onTouchStart.bind( this )
    this.onTouchEnd = this.onTouchEnd.bind( this )
    this.onTouchMove = this.onTouchMove.bind( this )
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
    let tempX = xy[0] - this.state.draggingStartX
    let tempY = xy[1] - this.state.draggingStartY
    findDOMNode(this).setAttribute('transform',`translate(${tempX},${tempY})`)
  }

  onMouseUp( event ) {
    // turn off isDragging
    if( this.state.isDragging == true ) {
      this.setState({
        isDragging: false,
        draggingStartX: 0,
        draggingStartY: 0,
      })
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
    }
  }

  onTouchStart( event ){
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
    });
  }

  onTouchCancel() {
    if( this.state.isDragging == true ) {
      this.setState({
        isDragging: false
      })
    }
  }

  onTouchEnd() {
    if( this.state.isDragging == true ) {
      this.setState({
        isDragging: false
      })
    }
  }

  onTouchMove( event ) {
    // TODO: finsh moving this element on touch
    // if( this.state.isDragging == true ) {
    //   let svg = document.getElementById( "svg-el" )
    //   let point = svg.createSVGPoint()

      // console.log(event);
      // // translate the screen point to svg's point, this enable the
      // point.x = event.clientX
      // point.y = event.clientY;
      // point = point.matrixTransform( svg.getScreenCTM().inverse() )
      //
      // let tempX = point.x - this.state.draggingStartX
      // let tempY = point.y - this.state.draggingStartY
      // findDOMNode(this).setAttribute('transform',`translate(${tempX},${tempY})`)
      // // this will rerender on drag, you can use this instead of

  }

  ////////////////////////////////////////////////////////

  render() {
    let { left, bottom, width, height, draggingComponent } = this.props
    let { isDragging, isDraggingOver } = this.state

    let noDragClass = ''
    if( isDraggingOver == true ) {
      noDragClass = ' red'
    }

    return (
      <g>
        <rect className={`dock-component${noDragClass}`}
          onMouseDown={ this.onMouseDown }
          onMouseUp={ this.onMouseUp }
          onTouchStart={ this.onTouchStart }
          onTouchEnd={ this.onTouchEnd }
          onTouchMove={ this.onTouchMove }
          onTouchCancel={ this.onTouchCancel }
          onDrop={ this.onDrop }
          onDragOver={ this.onDragOver }
          onDragLeave={ this.onDragLeave }
          onDragEnter={ this.onDragEnter }
          stroke="darkblue" strokeWidth="1"  fill="red"
          x={ left } y={ bottom } width={ width } height= { height }
          />
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
    draggingComponent: state.draggingComponent,
    mouseDraggingElement: state.mouseDraggingElement,
    mouseMoveXY: state.mouseMoveXY,
  }
})( DockComponent )
