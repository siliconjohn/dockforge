import React from 'react' 

var CenterLine = ( props ) => {
  let { svgShorelineHeight, svgShowCenterLine, svgHeight, svgWidth } = props

  if( svgShowCenterLine == false ) return null

  let halfWidth = svgWidth / 2

  return (
    <g className="center-line">
      <line x1="0" y1={ svgShorelineHeight } x2="0" y2={ -svgHeight }/>
    </g>
  )
}

CenterLine.propTypes = {
  svgShorelineHeight: React.PropTypes.number.isRequired,
  svgShowCenterLine: React.PropTypes.bool.isRequired,
  svgHeight: React.PropTypes.number.isRequired,
  svgWidth: React.PropTypes.number.isRequired,
}

module.exports = CenterLine
