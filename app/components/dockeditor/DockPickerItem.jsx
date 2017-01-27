import React from 'react'

class DockPickerItem extends React.Component {

  constructor( props ) {
    super( props )

    // bind onDragStart so props can be accessed
    this.onDragStart = this.onDragStart.bind( this )
  }

  onDragStart( event ) {
    // create json for this object's relevent props
    let data =  { type:this.props.type, width:this.props.width,
      length:this.props.length, source:"newComponent" }

    // set drag data
    event.dataTransfer.setData('text/plain', JSON.stringify( data ))

    // set drag image
    event.dataTransfer.setDragImage( this.refs.dragImage, 0, 0 )
  }

  render() {
    let { name, description } = this.props

    return (
      <div href="#" className="list-group-item dock-picker-component">
        <p className="list-group-item-heading">{ name }</p>
        <p className="list-group-item-text small">{ description }</p>
        <div className="drag-item center-block" draggable="true" onDragStart={ this.onDragStart }>
          <div className="drag-image" ref="dragImage"></div>
        </div>
      </div>
    )
  }
}

DockPickerItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  width: React.PropTypes.number.isRequired,
  length: React.PropTypes.number.isRequired,
}

module.exports = DockPickerItem
