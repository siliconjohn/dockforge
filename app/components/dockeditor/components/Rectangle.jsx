import React from 'react'

var Rectangle = ( props ) => {

  let { left, bottom, width, height, uuid } = props

  return (
    <g className="rectangle" data-uuid={ uuid } >
      <rect stroke="darkblue" strokeWidth="1" fill="red" data-uuid={ uuid }
        x={ left } y={ bottom - height / 2 } width={ width } height= { height / 2 }/>
      <rect stroke="darkblue" strokeWidth="1" fill="yellow" data-uuid={ uuid }
        x={ left } y={ bottom - height  } width={ width } height= { height / 2 }/>
    </g>
  )
}

Rectangle.propTypes = {
  left: React.PropTypes.number.isRequired,
  bottom: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  uuid: React.PropTypes.string.isRequired,
}

module.exports = Rectangle
