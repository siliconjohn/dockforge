import React from 'react'
import { connect } from 'react-redux'

class Water extends React.Component {

  render() {
    let { svgWidth, svgHeight, svgShorelineHeight }  = this.props

    return (
      <rect className="water" x={ 0 - svgWidth  / 2 } y={ 0 - svgHeight + svgShorelineHeight }
       width={ svgWidth } height={ svgHeight - svgShorelineHeight }/>
    )
  }
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
