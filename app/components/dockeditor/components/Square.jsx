import React from 'react'
import Highlight from 'Highlight'

var Square = ( props ) => {

  let { left, bottom, width, height, uuid, draggingOver, draggingOverSide } = props

  return (
    <g className="square" data-uuid={ uuid }>
      <rect stroke="darkblue" strokeWidth="1" fill="blue" data-uuid={ uuid }
        x={ left } y={ bottom - height } width={ width } height= { height }/>
      <Highlight { ...props }/>
    </g>
  )
}

Square.propTypes = {
  left: React.PropTypes.number.isRequired,
  bottom: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  uuid: React.PropTypes.string.isRequired,
  draggingOver: React.PropTypes.bool,
  draggingOverSide: React.PropTypes.string,
}

module.exports = Square
