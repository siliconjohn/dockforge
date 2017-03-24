import React from 'react'
import { connect } from 'react-redux'
import ComponentPickerItem from 'ComponentPickerItem'

class ComponentPicker extends React.Component {

  render() {
    let { components } = this.props

    return (
      <div className="component-picker" id="rrr">
        <div className="panel panel-default">
          <div className="panel-heading">Components</div>
          <div className="panel-body">
            <div className="list-group">
            {
              components.map(( item, index ) => {
                return <ComponentPickerItem { ...item } key={ index }/>
              })
            }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ComponentPicker.propTypes = {
  components: React.PropTypes.array.isRequired
}

export default connect (( state ) => {
  return {
    components: state.components
  }
})( ComponentPicker )
