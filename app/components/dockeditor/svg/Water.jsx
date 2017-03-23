import React from 'react'

var Water = ( props ) => {
  let { svgWidth, svgHeight, svgShorelineHeight, svgShowGrid }  =  props

  let classNames = "water"
  let fill = "url(#waterpattern)"
  if( svgShowGrid == true ) {
    fill = ""
    classNames = "water-colored"
  }

  return (
    <rect className={ classNames } fill={ fill } x={ -svgWidth / 2 }
     y={ -svgHeight + svgShorelineHeight } width={ svgWidth } height={ svgHeight - svgShorelineHeight }/>
  )
}

Water.propTypes = {
  svgWidth: React.PropTypes.number.isRequired,
  svgHeight: React.PropTypes.number.isRequired,
  svgShorelineHeight: React.PropTypes.number.isRequired,
  svgShowGrid: React.PropTypes.bool.isRequired,
}

module.exports = Water
