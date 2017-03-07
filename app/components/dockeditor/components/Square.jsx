import React from 'react'

var Square = ( props ) => {

  let { left, bottom, width, height, uuid, draggingOver } = props

  const getHightlight = () => {
    if( draggingOver == true ) {
      return (
        <rect stroke="red" strokeWidth="4" fill="none"
          x={ left } y={ bottom - height } width={ width } height= { height }/>
      )
    } 
  }

  return (
    <g className="square" data-uuid={ uuid }>
      { getHightlight() }
      <rect stroke="darkblue" strokeWidth="1" fill="blue" data-uuid={ uuid }
        x={ left } y={ bottom - height } width={ width } height= { height }/>
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
}

module.exports = Square
