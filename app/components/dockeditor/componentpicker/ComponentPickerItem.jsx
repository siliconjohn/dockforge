import React from 'react'
import { connect, dispatch } from 'react-redux'
import { setDragComponent } from 'actions'

class ComponentPickerItem extends React.Component {

  constructor( props ) {
    super( props )

    // bind onDragStart so props can be accessed
    this.onDragStart = this.onDragStart.bind( this )
    this.onDragEnd = this.onDragEnd.bind( this )
  }

  onDragStart( event ) {
    // create json for this object's relevent props
    const data =  { type:this.props.type, width:this.props.width,
      height:this.props.height, source:"newComponent" }


    // set drag data because firefox doesn't allow dragging with out it
    event.dataTransfer.setData('text/plain', JSON.stringify( data ))

    // trigger action
    this.props.dispatch( setDragComponent( data ))

    // set drag image
    event.dataTransfer.setDragImage( this.refs.dragImage, 0, 0 )
    return true
  }

  onDragEnd( event ) {
    // trigger action
    this.props.dispatch( setDragComponent( null ))
  }

  render() {
    let { name, description } = this.props

    return (
      <div href="#" className="list-group-item component-picker-item">
        <p className="list-group-item-heading">{ name }</p>
        <p className="list-group-item-text small">{ description }</p>
        <div className="drag-item center-block" draggable="true" onDragStart={ this.onDragStart }
          onDragEnd={ this.onDragEnd }>
          <div className="drag-image" ref="dragImage"></div>
        </div>
      </div>
    )
  }
}

ComponentPickerItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired
}


export default connect (( state ) => {
  return {
    components: state.components
  }
})( ComponentPickerItem )
