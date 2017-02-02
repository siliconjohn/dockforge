import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect, dispatch } from 'react-redux'

class DockComponent extends React.Component {

  constructor( props ) {
    super( props )

    this.state = {
      isDraggingOver: false,

      isDragging: false,
      draggingStartX: 0,
      draggingStartY: 0,
      moveMeX:0,
      moveMeY:0,
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
    this.onTouchStart = this.onTouchStart.bind( this )
    this.onTouchEnd = this.onTouchEnd.bind( this )
    this.onTouchMove = this.onTouchMove.bind( this )
    this.onTouchCancel = this.onTouchCancel.bind( this )
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

  ////////////////////////////////////////////////////////
  // these are for the draging this componant within the
  // svg element
  ////////////////////////////////////////////////////////

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

  onMouseDown( event ) {
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
      moveMeX: 0,
      moveMeY: 0,
    })
  }

  onMouseMove( event ) {
    if( this.state.isDragging == true ) {
      let svg = document.getElementById( "svg-el" )
      let point = svg.createSVGPoint()

      // translate the screen point to svg's point, this enable the
      point.x = event.clientX
      point.y = event.clientY;
      point = point.matrixTransform( svg.getScreenCTM().inverse() )

      let tempX = point.x - this.state.draggingStartX
      let tempY = point.y - this.state.draggingStartY
      findDOMNode(this).setAttribute('transform',`translate(${tempX},${tempY})`)
      // this will rerender on drag, you can use this instead of
      // findDOMNode(this).setAttribute
      // this.setState({
      //   moveMeX: tempX ,
      //   moveMeY: tempY ,
      // })
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
      moveMeX: 0,
      moveMeY: 0,
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
      // findDOMNode(this).setAttribute
      // this.setState({
      //   moveMeX: tempX ,
      //   moveMeY: tempY ,
      // })
      //  }
  }

  render() {
    let { left, bottom, width, height, draggingComponent } = this.props
    let { isDragging, isDraggingOver, moveMeX, moveMeY } = this.state

    let noDragClass = ''
    if( isDraggingOver == true ) {
      noDragClass = ' red'
    }

    let translate
    if( isDragging == true ) {
      translate = `translate(${moveMeX},${moveMeY})`
    }

    return (
      <g transform={ translate }>
        <rect onMouseMove= { this.onMouseMove } onMouseDown={ this.onMouseDown }
          onMouseUp={ this.onMouseUp } onMouseOut={ this.onMouseOut }
          onTouchStart={ this.onTouchStart } onTouchEnd={ this.onTouchEnd }
          onTouchMove={ this.onTouchMove } onTouchCancel={ this.onTouchCancel }
          className={`dock-component${noDragClass}`} onDrop={ this.onDrop }
          onDragOver={ this.onDragOver } onDragLeave={ this.onDragLeave }
          onDragEnter={ this.onDragEnter }
          x={ left } y={ bottom } width={ width } height= { height }
          stroke="darkblue" strokeWidth="1"  fill="red"/>
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
