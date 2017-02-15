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
    let { svgWidth, svgHeight, svgScale, svgRotation } = this.props.dock

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
    if( this.props.dock != undefined && this.props.dock != null ) {
      dockSVGComponent = <DockSVG { ...this.props.dock }/>
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
  dock: React.PropTypes.object.isRequired
}

export default connect (( state ) => {
  return {
    dock: state.dock
  }
})( DockViewContainer )
