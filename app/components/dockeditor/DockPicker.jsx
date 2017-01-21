import React from 'react'
import { connect } from 'react-redux'
import DockPickerComponent from 'DockPickerComponent'

class DockPicker extends React.Component {

  render() {
    let { components } = this.props

    return (
      <div className="panel panel-default dock-picker">
        <div className="panel-heading">Dock Components</div>
        <div className="panel-body">
          <div className="list-group">
            {
              components.map((item, index) => {
                return <DockPickerComponent { ...item } key={ index }/>
              })
            }
          </div>
        </div>
      </div> 
    )
  }
}

DockPicker.propTypes = {
  components: React.PropTypes.array.isRequired
}

export default connect (( state ) => {
  return {
    components: state.components
  }
})( DockPicker )
