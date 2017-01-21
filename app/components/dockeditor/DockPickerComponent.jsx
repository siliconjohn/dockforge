import React from 'react'

class DockPickerComponent extends React.Component {

  render() {
    let { name, description } = this.props

    return (
      <a href="#" className="list-group-item dock-picker-component">
        <h4 className="list-group-item-heading">{ name }</h4>
        <p className="list-group-item-text">{ description }</p>
      </a>
    )
  }
}

DockPickerComponent.propTypes = {
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
}

module.exports = DockPickerComponent
