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
    let { svgScale, svgWidth, svgHeight, svgRotation } = this.props
    let style

    // setup scale, adjusting for rotaion
    if( svgRotation == 90 || svgRotation == 270 ) {
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

    let dockSVGComponent = null
    if( this.props.dock != undefined ) {
     dockSVGComponent = <DockSVG dock={ this.props.dock }/>
    }

    return (
      <div className="dock-view-container">
        <div className="panel panel-default">
          <div className="panel-body dock-svg-scroll-parent">
            <div className="dock-svg-parent center-block" style={ style }>
              { dockSVGComponent }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DockViewContainer.PropTypes = {
  dock: React.PropTypes.array.isRequired,
  svgWidth: React.PropTypes.number.isRequired,
  svgHeight: React.PropTypes.number.isRequired,
  svgScale: React.PropTypes.number.isRequired,
  svgRotation: React.PropTypes.number.isRequired,
}

export default connect (( state ) => {
  return {
    dock: state.dock,
    svgScale: state.svgScale,
    svgWidth: state.svgWidth,
    svgHeight: state.svgHeight,
    svgRotation: state.svgRotation,
  }
})( DockViewContainer )
