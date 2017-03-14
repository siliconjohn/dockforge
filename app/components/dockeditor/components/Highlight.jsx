import React from 'react'

var Highlight = ( props ) => {
  let { left, bottom, width, height, draggingOver, draggingOverSide } = props

  if( draggingOver == true ) {
    let highlightHeight = 4

    switch( draggingOverSide ) {
      case "top":
        return  (
          <rect className="hightlight"
            x={ left } y={ bottom - height } width={ width } height= { highlightHeight }/>
        )
      case "bottom":
        return  (
          <rect className="hightlight"
            x={ left } y={ bottom - highlightHeight } width={ width } height= { highlightHeight }/>
        )
      case "right":
        return  (
          <rect className="hightlight"
            x={ left + width - highlightHeight } y={ bottom - height } width={ highlightHeight }
            height= { height }/>
        )
      case "left":
        return  (
          <rect className="hightlight"
            x={ left } y={ bottom - height } width={ highlightHeight } height= { height }/>
        )
      default :
        return  (
          <rect className="hightlight outline"
           x={ left } y={ bottom - height } width={ width } height= { height }/>
        )
    }
  } else {
    return null
  }
}

Highlight.propTypes = {
  left: React.PropTypes.number.isRequired,
  bottom: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  draggingOver: React.PropTypes.bool,
  draggingOverSide: React.PropTypes.string,
}

module.exports = Highlight
