import React from 'react'

var ShoreLine = ( props ) => {
  let { svgWidth, svgShorelineHeight, svgShowGrid }  = props

  const getText = () => {
    if( svgShowGrid == false ) return null

    return (
      <text x={ 0 } y={ (svgShorelineHeight / 2 ) + 3 }
        className="shoreline-text"
        textAnchor="middle"
        dominantBaseline="central">SHORELINE
       </text>
    )
  }

  return (
    <g id="shoreline">
      <rect className="shoreline" x={ -( svgWidth / 2 ) } y={ 0 }
       width={ svgWidth } height={ svgShorelineHeight }/>
     { getText() }
    </g>
  )
}

ShoreLine.propTypes = {
  svgWidth: React.PropTypes.number.isRequired,
  svgShorelineHeight: React.PropTypes.number.isRequired,
  svgShowGrid: React.PropTypes.bool.isRequired
}

module.exports = ShoreLine
