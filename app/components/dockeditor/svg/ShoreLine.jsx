import React from 'react'
import { connect } from 'react-redux'

class ShoreLine extends React.Component {

  render() {
    let { svgWidth, svgShorelineHeight }  = this.props

    return (
      <rect className="shoreline" x={ -( svgWidth / 2 ) } y={ 0 } width={ svgWidth } height={ svgShorelineHeight }/>
    )
  }
}

ShoreLine.propTypes = {
  svgWidth: React.PropTypes.number.isRequired,
  svgShorelineHeight: React.PropTypes.number.isRequired,
}

export default connect (( state ) => {
  return {
    svgWidth: state.svgWidth,
    svgShorelineHeight: state.svgShorelineHeight,
  }
})( ShoreLine )
