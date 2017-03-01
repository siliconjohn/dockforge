import React from 'react'

var Square = ( props ) => {

  let { left, bottom, width, height, uuid, draggingOver } = props

  const getHightlight = () => {
    if( draggingOver == true ) console.log("Dragging over " + uuid);
    if( draggingOver ) {
      return (
        <rect stroke="red" strokeWidth="2" fill="none"
          x={ left } y={ bottom - height } width={ width } height= { height }/>
      )
    } else {
      return null
    }
  }

  return (
    <g className="square" data-uuid={ uuid }>

      <rect stroke="darkblue" strokeWidth="1" fill="blue" data-uuid={ uuid }
        x={ left } y={ bottom - height } width={ width } height= { height }/>
        {  getHightlight() }
    </g>
  )
}

Square.propTypes = {
  left: React.PropTypes.number.isRequired,
  bottom: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  uuid: React.PropTypes.string.isRequired,
}

module.exports = Square
