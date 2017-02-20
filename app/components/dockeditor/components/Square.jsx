import React from 'react'

var Square = ( props ) => {
  
  let { left, bottom, width, height, uuid } = props

  return (
    <g className="hitable" data-hittest={`${left},${bottom},${width+left},${bottom-height}`}
      data-uuid={ uuid }>
      <rect stroke="darkblue" strokeWidth="1" fill="blue"
        x={ left } y={ bottom - height / 2 } width={ width } height= { height / 2 }/>
      <rect stroke="darkblue" strokeWidth="1" fill="green"
        x={ left } y={ bottom - height  } width={ width } height= { height / 2 }/>
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
