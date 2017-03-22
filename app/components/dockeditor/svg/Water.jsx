import React from 'react'

var Water = ( props ) => {
  let { svgWidth, svgHeight, svgShorelineHeight }  =  props

  // fill: #5fb3d1;
  return (
    <rect className="water" fill="url(#waterpattern)" x={ -svgWidth / 2 }
     y={ -svgHeight + svgShorelineHeight } width={ svgWidth } height={ svgHeight - svgShorelineHeight }/>
  )
}

Water.propTypes = {
  svgWidth: React.PropTypes.number.isRequired,
  svgHeight: React.PropTypes.number.isRequired,
  svgShorelineHeight: React.PropTypes.number.isRequired,
}

module.exports = Water
