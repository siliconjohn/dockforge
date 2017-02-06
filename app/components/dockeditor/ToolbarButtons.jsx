import React from 'react'
import { incrementSvgScale, decrementSvgScale, changeSvgRotation,
  toggleShowGrid, toggleShowCross, incrementSvgWidth, decrementSvgWidth,
  incrementSvgHeight, decrementSvgHeight } from 'actions'
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
        <span> </span>
        <div className="btn-group" role="group" aria-label="Show grid or cross">
          <button type="button" className="btn btn-xxs btn-xs btn-info navbar-btn"
            onClick={ ()=> {
              store.dispatch( toggleShowGrid() )
            }}>
            <span className="glyphicon glyphicon-th"></span>
          </button>
          <button type="button" className="btn btn-xxs btn-xs btn-info navbar-btn"
            onClick={ ()=> {
              store.dispatch( toggleShowCross() )
            }}>
            <span className="glyphicon glyphicon-th-large"></span>
          </button>
        </div>
        <span> </span>
        <div className="btn-group" role="group" aria-label="Expand or contract width">
          <button type="button" className="btn btn-xxs btn-xs btn-info navbar-btn"
            onClick={ ()=> {
              store.dispatch( decrementSvgWidth() )
            }}>
            <span className="glyphicon glyphicon-minus"></span>
          </button>
          <button type="button" className="btn btn-xxs btn-xs btn-info navbar-btn"
            onClick={ ()=> {
              store.dispatch( incrementSvgWidth() )
            }}>
            <span className="glyphicon glyphicon-plus"></span>
          </button>
        </div>
        <span> </span>
        <div className="btn-group" role="group" aria-label="Expand or contract height">
          <button type="button" className="btn btn-xxs btn-xs btn-info navbar-btn"
            onClick={ ()=> {
              store.dispatch( decrementSvgHeight() )
            }}>
            <span className="glyphicon glyphicon-minus"></span>
          </button>
          <button type="button" className="btn btn-xxs btn-xs btn-info navbar-btn"
            onClick={ ()=> {
              store.dispatch( incrementSvgHeight() )
            }}>
            <span className="glyphicon glyphicon-plus"></span>
          </button>
        </div>
      </div>
    )
  }
}

module.exports = ToolbarButtons
