import React from 'react'
import Draggable from 'Draggable'
import { getComponent } from 'editor'

class Square extends React.Component {

  render() {
    let { left, bottom, width, height } = this.props

    return (
      <Draggable { ...this.props } >
        <rect stroke="darkblue" strokeWidth="1" fill="blue"
          x={ left } y={ bottom - height / 2 } width={ width } height= { height / 2 }/>
        <rect stroke="darkblue" strokeWidth="1" fill="green"
          x={ left } y={ bottom - height  } width={ width } height= { height / 2 }/>
        {
          this.props.children.map(( item, index) => {

            // set parent positions
            item.parentLeft = left
            item.parentBottom = bottom
            item.parentWidth = width
            item.parentHeight = height
            return getComponent( item )




          })

      }
      </Draggable>
    )
  }
}

Square.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  left: React.PropTypes.number.isRequired,
  bottom: React.PropTypes.number.isRequired,
  children: React.PropTypes.array
}

module.exports = Square
