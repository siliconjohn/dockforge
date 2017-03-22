import React from 'react'
import { connect } from 'react-redux'
import { incrementSvgScale, decrementSvgScale, changeSvgRotation,
  toggleShowGrid, toggleShowCenterLine, incrementSvgWidth, decrementSvgWidth,
  incrementSvgHeight, decrementSvgHeight, openDock } from 'actions'
import { store } from '../../app.jsx'

class ToolbarButtons extends React.Component {

  componentDidMount() {
    // opens the dock for testing TODO: update this or remove it
    store.dispatch( openDock( this.props.newDock ))
  }

  render() {
    return (
      <div className="toolbar-btns">
        <div className="btn-group" role="group" aria-label="Zoom in and out buttons">
          <button type="button" className="btn btn-xs btn-success navbar-btn"
            onClick={ ()=> {
              store.dispatch( decrementSvgScale())
            }}>
            <span className="glyphicon glyphicon-minus"></span>
          </button>
          <div className="btn btn-xs btn-success navbar-btn no-pointer-events">Zoom</div>
          <button type="button" className="btn btn-xs btn-success navbar-btn"
            onClick={ ()=> {
              store.dispatch( incrementSvgScale())
            }}>
            <span className="glyphicon glyphicon-plus"></span>
          </button>
        </div>
        <span> </span>
        <button type="button" className="btn btn-xs btn-primary navbar-btn"
          onClick={ ()=> {
            store.dispatch( changeSvgRotation())
          }}>
          <span className="glyphicon glyphicon-repeat"></span> Rotate
        </button>
        <span> </span>
        <div className="btn-group" role="group" aria-label="Expand or contract width">
          <button type="button" className="btn btn-xs btn-primary navbar-btn"
            onClick={ ()=> {
              store.dispatch( decrementSvgWidth())
            }}>
            <span className="glyphicon glyphicon-minus"></span>
          </button>
          <div className="btn btn-xs btn-primary navbar-btn no-pointer-events">Wider</div>
          <button type="button" className="btn btn-xs btn-primary navbar-btn"
            onClick={ ()=> {
              store.dispatch( incrementSvgWidth())
            }}>
            <span className="glyphicon glyphicon-plus"></span>
          </button>
        </div>
        <span> </span>
        <div className="btn-group" role="group" aria-label="Expand or contract height">
          <button type="button" className="btn btn-xs btn-primary navbar-btn"
            onClick={ ()=> {
              store.dispatch( decrementSvgHeight())
            }}>
            <span className="glyphicon glyphicon-minus"></span>
          </button>
          <div className="btn btn-xs btn-primary navbar-btn no-pointer-events">Higher</div>
          <button type="button" className="btn btn-xs btn-primary navbar-btn"
            onClick={ ()=> {
              store.dispatch( incrementSvgHeight())
            }}>
            <span className="glyphicon glyphicon-plus"></span>
          </button>
        </div>
        <span> </span>
        <div className="btn-group" role="group" aria-label="Show grid or cross">
          <button type="button" className="btn btn-xs btn-warning navbar-btn btn-wide"
            onClick={ ()=> {
              store.dispatch( toggleShowGrid())
            }}>
            <span className="glyphicon glyphicon-th"></span> Grid
          </button>
          <button type="button" className="btn btn-xs btn-warning navbar-btn btn-wide"
            onClick={ ()=> {
              store.dispatch( toggleShowCenterLine())
            }}>
            <span className="glyphicon glyphicon-th-large"></span> Center
          </button>
        </div>
      </div>
    )
  }
}

export default connect (( state) => {
  return {
    newDock: state.newDock
  }
})( ToolbarButtons)

// NEW DOCK BUTTON, SAVED FOR POSTERITY
// <div className="btn-group" role="group" aria-label="Expand or contract height">
//   <button type="button" className="btn btn-xs btn-info navbar-btn"
//     onClick={ ()=> {
//       store.dispatch( openDock( this.props.newDock))
//     }}>
//     <span className="glyphicon glyphicon-file"></span>
//   </button>
// </div>
