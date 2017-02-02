import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect, dispatch } from 'react-redux'
import DockComponent from 'DockComponent'
import { addDockComponent, setMouseMoveXY, setMouseDraggingElement } from 'actions'

class DockSVG extends React.Component {

  constructor( props ) {
    super( props )

    // bind so props can be accessed
    this.onDrop = this.onDrop.bind( this )
    this.onDragOver = this.onDragOver.bind( this )
    this.onMouseMove = this.onMouseMove.bind( this )
    this.onMouseOut = this.onMouseOut.bind( this )
  }

  onMouseOut( e ) {
    // turn off mouse dragging when the mouse leaves the svg element
    this.props.dispatch( setMouseDraggingElement( false ))
  }

  onDrop( event ) {
    event.preventDefault()
    let svg = document.getElementById( "svg-el" )
    let point = svg.createSVGPoint()

    // translate the screen point to svg's point
    point.x = event.clientX
    point.y = event.clientY;
    point = point.matrixTransform( svg.getScreenCTM().inverse() )

    let data = this.props.draggingComponent

    // create the component
    var newComponent = { type: data.type, left:point.x,
      bottom:  point.y ,
      width: data.width, height:data.length }

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

  render() {
    var { dock } = this.props

    return (
      <svg xmlns="http://www.w3.org/2000/svg" id="svg-el" onDrop={ this.onDrop }
        onDragOver={ this.onDragOver }  onMouseMove= { this.onMouseMove }
        onMouseLeave={ this.onMouseOut } viewBox="-400 -400 800 800" className="dock-svg">
        <g>
          <rect  x="-400" y="-400" width="100%" height="100%" stroke="darkblue" strokeWidth="1"  fill="lightgray"/>
          <line x1="-400" y1="0" x2="400" y2="0" strokeWidth="1" stroke="darkblue"/>
          <line x1="0" y1="-400" x2="0" y2="400" strokeWidth="1" stroke="darkblue"/>
        </g>
        {
          dock.map(( item, index ) => {
            return <DockComponent { ...item } key={ index }/>
          })
        }
      </svg>

    )
  }
}

DockSVG.propTypes = {
  dock: React.PropTypes.array.isRequired,
  dispatch: React.PropTypes.func.isRequired,
}

export default connect (( state ) => {
  return {
    dock: state.dock,
    components: state.components,
    draggingComponent: state.draggingComponent,
    mouseDraggingElement: state.mouseDraggingElement,
  }
})( DockSVG )
