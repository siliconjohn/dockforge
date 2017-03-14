import React from 'react'
import Highlight from 'Highlight'

var Rectangle = ( props ) => {
  let { left, bottom, width, height, uuid, draggingOver, draggingOverSide } = props

  return (
    <g className="rectangle" data-uuid={ uuid } > 
      <rect stroke="darkblue" strokeWidth="1" fill="red" data-uuid={ uuid }
        x={ left } y={ bottom - height / 2 } width={ width } height= { height / 2 }/>
      <rect stroke="darkblue" strokeWidth="1" fill="yellow" data-uuid={ uuid }
        x={ left } y={ bottom - height  } width={ width } height= { height / 2 }/>
      <Highlight { ...props }/>
    </g>
  )
}

Rectangle.propTypes = {
  left: React.PropTypes.number.isRequired,
  bottom: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  uuid: React.PropTypes.string.isRequired,
  draggingOver: React.PropTypes.bool,
  draggingOverSide: React.PropTypes.string,
}

module.exports = Rectangle
