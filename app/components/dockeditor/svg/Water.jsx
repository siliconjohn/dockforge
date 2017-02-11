import React from 'react'
import { connect } from 'react-redux'

var Water = ( props ) => {
  let { svgWidth, svgHeight, svgShorelineHeight }  =  props

  return (
    <rect className="water" x={ -svgWidth  / 2 } y={ -svgHeight + svgShorelineHeight }
         width={ svgWidth } height={ svgHeight - svgShorelineHeight }/>
  )

}

Water.propTypes = {
  svgWidth: React.PropTypes.number.isRequired,
  svgHeight: React.PropTypes.number.isRequired,
  svgShorelineHeight: React.PropTypes.number.isRequired,
}

export default connect (( state ) => {
  return {
    svgWidth: state.svgWidth,
    svgHeight: state.svgHeight,
    svgShorelineHeight: state.svgShorelineHeight,
  }
})( Water )
