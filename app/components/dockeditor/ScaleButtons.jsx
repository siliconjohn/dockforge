import React from 'react'
import { incrementSvgScale, decrementSvgScale } from 'actions'
import { store } from '../../app.jsx'

class ScaleButtons extends React.Component {

  render() {
    return (
      <div className="btn-group" role="group" aria-label="Zoom in and out buttons">
        <button type="button" className="btn btn-xxs btn-xs  btn-info navbar-btn"
          onClick={ ()=> {
            store.dispatch( decrementSvgScale() )
          }}>
          <span className="glyphicon glyphicon-minus"></span>
        </button>
        <button type="button" className="btn btn-xxs btn-xs  btn-info navbar-btn"
          onClick={ ()=> {
            store.dispatch( incrementSvgScale() )
          }}>
          <span className="glyphicon glyphicon-plus"></span>
        </button>
      </div>
    )
  }
}

module.exports = ScaleButtons
