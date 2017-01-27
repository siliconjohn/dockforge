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

    let data = JSON.parse( event.dataTransfer.getData( "text" ))

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

    return (
      <div className="dock-view" onDrop={ this.onDrop }
        onDragOver={ this.onDragOver }>
        {
          dock.map(( item, index ) => {
            return <DockComponent { ...item } key={ index }/>
          })
        }
      </div>
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
    components: state.components
  }
})( DockView )
