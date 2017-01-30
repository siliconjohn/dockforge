import React from 'react'
import { connect, dispatch } from 'react-redux'
import DockComponent from 'DockComponent'
import { addDockComponent } from 'actions'

class DockView extends React.Component {

  constructor( props ) {
    super( props )

    // bind onDragStart so props can be accessed
    this.onDrop = this.onDrop.bind( this )
    this.onDragOver = this.onDragOver.bind( this )
  }

  onDrop( event ) {
    event.preventDefault()

    let data = this.props.draggingComponent

    // get mouse's x y drop position
    let elementRect = event.currentTarget.getBoundingClientRect()
    let dropMouseX = event.clientX - elementRect.left
    let dropMouseY = event.clientY - elementRect.top

    // create the component
    var newComponent = { type: data.type, left:dropMouseX,
      bottom: elementRect.height - dropMouseY - data.length,
      width: data.width, height:data.length }

    // dispatch event adding new component
    this.props.dispatch( addDockComponent( newComponent ))
  }

  onDragOver( event ) {
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
  }

  render() {
    var { dock } = this.props
    // <div className="dock-view" onDrop={ this.onDrop }
//   onDragOver={ this.onDragOver }>

// </div>
    return (
      <svg xmlns="http://www.w3.org/2000/svg" onDrop={ this.onDrop }
      onDragOver={ this.onDragOver } viewBox="-400 -400 800 800" className="dock-svg">
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

DockView.propTypes = {
  dock: React.PropTypes.array.isRequired,
  dispatch: React.PropTypes.func.isRequired,
}

export default connect (( state ) => {
  return {
    dock: state.dock,
    components: state.components,
    draggingComponent: state.draggingComponent
  }
})( DockView )
