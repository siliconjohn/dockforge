import React from 'react'
import { connect } from 'react-redux'
import DockComponent from 'DockComponent'

class DockView extends React.Component {

  render() {
    var { dock } = this.props

    return (
      <div className="dock-view">
        {
          dock.map(( item, index ) => {
            return <DockComponent { ...item } key={ index }/>
          })
        }
      </div>
    )
  }
}

DockView.propTypes = {
  dock: React.PropTypes.array.isRequired
}

export default connect (( state ) => {
  return {
    dock: state.dock
  }
})( DockView )
