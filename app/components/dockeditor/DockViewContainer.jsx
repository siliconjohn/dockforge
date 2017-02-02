import React from 'react'
import { connect } from 'react-redux'
import DockSVG from 'DockSVG'
import ShoreView from 'ShoreView'

class DockViewContainer extends React.Component {

  componentDidMount() {
    // scroll to bottom
    var element = $(".dock-svg-scroll-parent")
    element.scrollTop( element[0].scrollHeight)
  }

  render() {
    let { svgScale } = this.props

    let style = {
      width: `${svgScale}px`,
      height: `${svgScale}px`
    }

    return (
      <div className="dock-view-container">
        <div className="panel panel-default">
          <div className="panel-body dock-svg-scroll-parent">
            <div className="dock-svg-parent" style={ style }>
              <DockSVG/>
              <ShoreView/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect (( state ) => {
  return {
    svgScale: state.svgScale
  }
})( DockViewContainer )
