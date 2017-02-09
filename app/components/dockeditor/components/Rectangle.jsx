import React from 'react'
import Draggable from 'Draggable'

class Rectangle extends React.Component {

  render() {
    let { left, bottom, width, height } = this.props

    return (
      <Draggable { ...this.props } >
        <rect stroke="darkblue" strokeWidth="1"  fill="red"
          x={ left } y={ bottom - height / 2 } width={ width } height= { height / 2 }/>
        <rect stroke="darkblue" strokeWidth="1"  fill="yellow"
          x={ left } y={ bottom - height  } width={ width } height= { height / 2 }/>
      </Draggable>
    )
  }
}

Rectangle.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  left: React.PropTypes.number.isRequired,
  bottom: React.PropTypes.number.isRequired
}

module.exports = Rectangle
