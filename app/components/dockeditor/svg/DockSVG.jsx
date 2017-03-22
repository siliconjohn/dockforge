import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect, dispatch } from 'react-redux'
import ShoreLine from 'ShoreLine'
import Water from 'Water'
import CenterLine from 'CenterLine'
import Grid from 'Grid'
import { addDockComponent, setMouseMoveXY, setMouseDraggingElement } from 'actions'
import * as UUID from 'uuid-js'
import { getRootComponent } from 'editor'

class DockSVG extends React.Component {

  constructor( props ) {
    super( props )

    // bind functions so props can be accessed
    this.onDrop = this.onDrop.bind( this )
    this.onDragOver = this.onDragOver.bind( this )
    this.onMouseMove = this.onMouseMove.bind( this )
    this.onMouseOut = this.onMouseOut.bind( this )
    this.onTouchMove = this.onTouchMove.bind( this )
  }

  getChildContext() {
    return { svgRotation: this.props.svgRotation, readOnly: this.props.readOnly }
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
    if( this.props.mouseDraggingElement == true ) {
      this.props.dispatch( setMouseDraggingElement( false ))
    }
  }

  onTouchMove( event ) {
    if( this.props.mouseDraggingElement == true ) {
      let touch = event.touches[0]
      let svgElement = findDOMNode( this )
      let point = svgElement.createSVGPoint()

      // translate the screen point to svg's point
      point.x = touch.clientX
      point.y = touch.clientY;
      point = point.matrixTransform( svgElement.getScreenCTM().inverse())

      this.props.dispatch( setMouseMoveXY( [ point.x, point.y ]))
    }
  }

  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////

  getComponents() {
    let components = this.props.components

    if( components != undefined ) {
      return components.map(( item, index ) => {
        return getRootComponent( item )
      })
    } else {
      return null
    }
  }

  render() {
    let { svgRotation, svgShorelineHeight, svgWidth, svgHeight,
      readOnly } = this.props

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
      <svg xmlns="http://www.w3.org/2000/svg" id="svg-el"
        className="dock-svg" viewBox={ viewBox }
        onDrop={ readOnly == true ? null : this.onDrop }
        onDragOver={ readOnly == true ? null : this.onDragOver }
        onMouseMove={ readOnly == true ? null : this.onMouseMove }
        onTouchMove={ readOnly == true ? null : this.onTouchMove }
        onMouseLeave={ readOnly == true ? null : this.onMouseOut }>
        <defs>
          <pattern id="waterpattern" patternUnits="userSpaceOnUse" x="0" y="0"
            width="150" height="150">
          <image width="150" height="150" xlinkHref="/images/water.jpg"/>
          </pattern>
        </defs>
        <g transform={ transform }>
          <g className="background">
            <Water { ...this.props } />
            <ShoreLine { ...this.props } />
            <Grid { ...this.props } />
            <CenterLine { ...this.props } />
          </g>
          <g className="components">
          { this.getComponents() }
          </g>
        </g>
      </svg>
    )
  }
}

DockSVG.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  svgShorelineHeight: React.PropTypes.number.isRequired,
  svgHeight: React.PropTypes.number.isRequired,
  svgWidth: React.PropTypes.number.isRequired,
  svgRotation: React.PropTypes.number.isRequired,
  svgScale: React.PropTypes.number.isRequired,
  readOnly: React.PropTypes.bool.isRequired,
  mouseDraggingElement: React.PropTypes.bool,
  draggingComponent: React.PropTypes.object,
  components: React.PropTypes.array.isRequired
}

DockSVG.childContextTypes = {
  svgRotation: React.PropTypes.number,
  readOnly: React.PropTypes.bool
}

export default connect (( state ) => {
  return {
    draggingComponent: state.draggingComponent,
    mouseDraggingElement: state.mouseDraggingElement,
  }
})( DockSVG )
