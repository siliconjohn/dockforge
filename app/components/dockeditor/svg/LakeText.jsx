import React from 'react'

var LakeText = ( props ) => {
  let { svgWidth, svgShorelineHeight, svgHeight, svgShowGrid }  = props

  if( svgShowGrid == false ) return null

  return (
    <g className="lake-text">
     <text x={ 0 } y={ -((svgHeight - svgShorelineHeight) / 2 ) }
       className="lake-text"
       textAnchor="middle"
       dominantBaseline="central">WATER
      </text>
    </g>
  )
}

LakeText.propTypes = {
  svgWidth: React.PropTypes.number.isRequired,
  svgHeight: React.PropTypes.number.isRequired,
  svgShorelineHeight: React.PropTypes.number.isRequired,
  svgShowGrid: React.PropTypes.bool.isRequired,
}

module.exports = LakeText
