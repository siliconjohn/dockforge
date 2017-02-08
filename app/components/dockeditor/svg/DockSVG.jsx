import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect, dispatch } from 'react-redux'
import DockComponent from 'DockComponent'
import ShoreLine from 'ShoreLine'
import Water from 'Water'
import CenterLine from 'CenterLine'
import Grid from 'Grid'
import { addDockComponent, setMouseMoveXY, setMouseDraggingElement } from 'actions'
import * as UUID from 'uuid-js'

class DockSVG extends React.Component {

  constructor( props ) {
    super( props )

    // bind functions so props can be accessed
    this.onDrop = this.onDrop.bind( this )
    this.onDragOver = this.onDragOver.bind( this )
    this.onMouseMove = this.onMouseMove.bind( this )
    this.onMouseOut = this.onMouseOut.bind( this )
    this.onMouseUp = this.onMouseUp.bind( this )
  }

  ////////////////////////////////////////////////////////
  // these are for the html 5 drag and drop functionality
  // which is used to drop NEW componets from outside the
  // main svg element
  ////////////////////////////////////////////////////////

  onDrop( event ) {
    event.preventDefault()

    let svg = document.getElementById( "svg-el" )
    let point = svg.createSVGPoint()

    // translate the screen point to svg's point
    point.x = event.clientX
    point.y = event.clientY;
    point = point.matrixTransform( svg.getScreenCTM().inverse() )

    ////////////////////////////////////////////
    // adjust the point to accomadate svgRotation
    ////////////////////////////////////////////

    let data = this.props.draggingComponent
    let rotate = this.props.svgRotation
    let x = 0
    let y = 0
    let multX = 1
    let multY = 1

    switch( rotate ) {
      case 90:
        multX = -1
        multY = 1
        y = point.x * multX
        x = point.y * multY
        break
      case 180:
        multX = -1
        multY = -1
        x = point.x * multX - data.width
        y = point.y * multY
        break
      case 270:
        multX = 1
        multY = -1
        y = point.x * multX + data.height
        x = point.y * multY - data.width
        break
      default:
        x = point.x
        y = point.y + data.height
    }

    // create the component
    var newComponent = { type: data.type, left: x, bottom: y,
      width: data.width, height:data.height,
      uuid: UUID.create(1).toString() }

    // dispatch event adding new component
    this.props.dispatch( addDockComponent( newComponent ))
  }

  onDragOver( event ) {
    event.preventDefault()

    event.dataTransfer.dropEffect = "copy"
  }

  onMouseMove( event ) {
    if( this.props.mouseDraggingElement == true ) {
      let svgElement = findDOMNode( this )
      let point = svgElement.createSVGPoint()

      // translate the screen point to svg's point
      point.x = event.clientX
      point.y = event.clientY;
      point = point.matrixTransform( svgElement.getScreenCTM().inverse())

      this.props.dispatch( setMouseMoveXY( [ point.x, point.y ]))
    }
  }

  ////////////////////////////////////////////////////////
  // these are for the draging this components within the
  // svg element
  ////////////////////////////////////////////////////////

  onMouseOut( e ) {
    // turn off mouse dragging when the mouse leaves the svg element
    this.props.dispatch( setMouseDraggingElement( false ))
  }

  onMouseUp( event ) {
    this.props.dispatch( setMouseDraggingElement( false ))
  }

  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////

  render() {
    var { dock, svgRotation, svgWidth, svgHeight, svgShorelineHeight } = this.props

    // setup transoform string for the svgRotation
    let transform = `rotate(${svgRotation})`

    //////////////////////////////////////////
    // setup vars for the svg size
    //////////////////////////////////////////

    let width = svgWidth
    let height = svgHeight
    let halfWidth =  width / 2
    let halfHeight =  height / 2
    let halfWidthNeg =  -halfWidth
    let halfHeightNeg =  -halfHeight

    //////////////////////////////////////////
    // create string for viewbox, it changes
    // based on the svgRotation
    //////////////////////////////////////////

    let x = halfWidthNeg
    let y = -( height - svgShorelineHeight )
    let w = width
    let h = height

    // adjust for the svgRotation
    if ( svgRotation == 90 || svgRotation == 270 ) {
      y = halfWidthNeg
      w = height
      h = width

      // adjust for shoreline
      if( svgRotation == 90 ) {
        x = 0 - svgShorelineHeight
      } else {
        x = -height + svgShorelineHeight
      }
    }

    // adjust for shoreline
    if( svgRotation == 180 ) {
      y = -svgShorelineHeight
    }

    let viewBox = `${x} ${y} ${w} ${h}`

    //////////////////////////////////////////

    return (
      <svg xmlns="http://www.w3.org/2000/svg" id="svg-el" className="dock-svg"
        viewBox={ viewBox } onDrop={ this.onDrop } onDragOver={ this.onDragOver }
        onMouseMove={ this.onMouseMove } onMouseUp={ this.onMouseUp } onMouseLeave={ this.onMouseOut }>
        <g transform={ transform }>
          <g className="background">
            <Water/>
            <ShoreLine/>
            <Grid/>
            <CenterLine/>
          </g>
          {
            dock.map(( item, index ) => {
              return <DockComponent { ...item } key={ index }/>
            })
          }
        </g>
      </svg>
    )
  }
}

DockSVG.propTypes = {
  dock: React.PropTypes.array.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  svgShorelineHeight: React.PropTypes.number.isRequired,
  svgHeight: React.PropTypes.number.isRequired,
  svgWidth: React.PropTypes.number.isRequired,
  svgRotation: React.PropTypes.number.isRequired,
  mouseDraggingElement: React.PropTypes.bool,
  draggingComponent: React.PropTypes.object,
}

export default connect (( state ) => {
  return {
    dock: state.dock,
    draggingComponent: state.draggingComponent,
    mouseDraggingElement: state.mouseDraggingElement,
    svgRotation: state.svgRotation,
    svgWidth: state.svgWidth,
    svgHeight: state.svgHeight,
    svgShorelineHeight: state.svgShorelineHeight,
  }
})( DockSVG )
