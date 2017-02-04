import React from 'react'
import { incrementSvgScale, decrementSvgScale, changeSvgRotation } from 'actions'
import { store } from '../../app.jsx'

class ToolbarButtons extends React.Component {

  render() {
    return (
      <div className="toolbar-btns">
        <div className="btn-group" role="group" aria-label="Zoom in and out buttons">
          <button type="button" className="btn btn-xxs btn-xs btn-info navbar-btn"
            onClick={ ()=> {
              store.dispatch( decrementSvgScale() )
            }}>
            <span className="glyphicon glyphicon-minus"></span>
          </button>
          <button type="button" className="btn btn-xxs btn-xs btn-info navbar-btn"
            onClick={ ()=> {
              store.dispatch( incrementSvgScale() )
            }}>
            <span className="glyphicon glyphicon-plus"></span>
          </button>
        </div>
        <span> </span>
        <button type="button" className="btn btn-xxs btn-xs btn-info navbar-btn"
          onClick={ ()=> {
            store.dispatch( changeSvgRotation() )
          }}>
          <span className="glyphicon glyphicon-repeat"></span>
        </button>
      </div>
    )
  }
}

module.exports = ToolbarButtons
