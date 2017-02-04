import React from 'react'
import { connect } from 'react-redux'
import DockSVG from 'DockSVG'

class DockViewContainer extends React.Component {

  componentDidMount() {
    // scroll to bottom
    var element = $(".dock-svg-scroll-parent")
    element.scrollTop( element[0].scrollHeight)
  }

  render() {
    let { svgScale, svgWidth, svgHeight, rotation } = this.props
    let style

    // setup scale, adjusting for rotaion
    if( rotation == 90 || rotation == 270 ) {
      style = {
        height: `${ Math.round( svgWidth * svgScale ) }px`,
        width: `${ Math.round( svgHeight * svgScale ) }px`
      }
    } else {
      style = {
        width: `${ Math.round( svgWidth * svgScale ) }px`,
        height: `${ Math.round( svgHeight * svgScale ) }px`
      }
    }

    return (
      <div className="dock-view-container">
        <div className="panel panel-default">
          <div className="panel-body dock-svg-scroll-parent">
            <div className="dock-svg-parent" style={ style }>
              <DockSVG/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect (( state ) => {
  return {
    svgScale: state.svgScale,
    svgWidth: state.svgWidth,
    svgHeight: state.svgHeight,
    rotation: state.rotation,
  }
})( DockViewContainer )
