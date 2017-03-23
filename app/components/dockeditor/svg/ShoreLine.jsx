import React from 'react'

var ShoreLine = ( props ) => {
  let { svgWidth, svgShorelineHeight }  = props

  return (
    <g>
      <rect className="shoreline" x={ -( svgWidth / 2 ) } y={ 0 }
       width={ svgWidth } height={ svgShorelineHeight }/>
     <text x={ 0 } y={ (svgShorelineHeight / 2 ) + 3 }
       className="shoreline-text"
       textAnchor="middle"
       dominantBaseline="central">SHORELINE
      </text>
    </g>
  )
}

ShoreLine.propTypes = {
  svgWidth: React.PropTypes.number.isRequired,
  svgShorelineHeight: React.PropTypes.number.isRequired,
}

module.exports = ShoreLine
