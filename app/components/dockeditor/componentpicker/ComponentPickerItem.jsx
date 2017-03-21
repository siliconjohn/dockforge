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
    this.props.dispatch( setDragComponent( null ))
  }

  render() {
    let { name, description, svg, width, height } = this.props

    let svgStyle = {
      width: `${width}px`,
      height: `${height}px`,
      background: `url('/images/${svg}')`,
      backgroundSize: `${width}px ${height}px`,
      backgroundColor: 'rgba(0,0,0,0)'
    }

    return (
      <div href="#" className="list-group-item component-picker-item">
        <p className="list-group-item-heading text-center">{ name }</p>
        <p className="list-group-item-text small text-center">{ description }</p>
        <div className="drag-item center-block" draggable="true"
          onDragStart={ this.onDragStart } onDragEnd={ this.onDragEnd }>
          <div className="center-block" style={ svgStyle }></div>
          <div className="drag-image" style={ svgStyle } ref="dragImage"></div>
        </div>
        <hr/>
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
