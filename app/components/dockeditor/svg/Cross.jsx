import React from 'react'
import { connect } from 'react-redux'

class Cross extends React.Component {

  render() {
    let { svgShorelineHeight, svgShowCross, svgHeight, svgWidth } = this.props

    if( svgShowCross == false ) return null

    let halfWidth = svgWidth / 2

    return (
      <g className="cross">
        <line x1={ halfWidth } y1="0" x2={ -halfWidth } y2="0"/>
        <line x1="0" y1={ svgShorelineHeight } x2="0" y2={ -svgHeight }/>
      </g>
    )
  }
}

Cross.propTypes = {
  svgShorelineHeight: React.PropTypes.number.isRequired,
  svgShowCross: React.PropTypes.bool.isRequired,
  svgHeight: React.PropTypes.number.isRequired,
  svgWidth: React.PropTypes.number.isRequired,
}

export default connect (( state ) => {
  return {
    svgWidth: state.svgWidth,
    svgHeight: state.svgHeight,
    svgShorelineHeight: state.svgShorelineHeight,
    svgShowCross: state.svgShowCross,
  }
})( Cross )
