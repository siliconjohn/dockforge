import React from 'react'

var Square = ( props ) => {

  let { left, bottom, width, height, uuid, draggingOver, draggingOverSide } = props

  const getHightlight = () => {
    
    if( draggingOver == true) {
      let highlightHeight = 4

      switch( draggingOverSide ) {
        case "top":
          return  (
            <rect stroke="red" strokeWidth="1" fill="red"
              x={ left } y={ bottom - height } width={ width } height= { highlightHeight }/>
          )
        case "bottom":
          return  (
            <rect stroke="red" strokeWidth="1" fill="red"
              x={ left } y={ bottom - highlightHeight } width={ width } height= { highlightHeight }/>
          )
        case "right":
          return  (
            <rect stroke="red" strokeWidth="1" fill="red"
              x={ left + width - highlightHeight } y={ bottom - height } width={ highlightHeight }
              height= { height }/>
          )
        case "left":
          return  (
            <rect stroke="red" strokeWidth="1" fill="red"
              x={ left } y={ bottom - height } width={ highlightHeight }
              height= { height }/>
          )
        default :
          return  (
            <rect stroke="red" strokeWidth={ highlightHeight } fill="none"
             x={ left } y={ bottom - height } width={ width } height= { height }/>
          )
      }
    }
  }

  return (
    <g className="square" data-uuid={ uuid }>

      <rect stroke="darkblue" strokeWidth="1" fill="blue" data-uuid={ uuid }
        x={ left } y={ bottom - height } width={ width } height= { height }/>
        { getHightlight() }
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
