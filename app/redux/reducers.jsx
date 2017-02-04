import { combineReducers } from 'redux'
import * as actions from 'actions'

export var updateDockComponent = ( state = [], action ) => {

  if ( action.type == actions.ADD_DOCK_COMPONENT ) {
    var newState = Object.assign( [], state )
    newState.push( action.component )
    return newState
  }

  return state
}

export var setDraggingComponent = ( state = null, action ) => {

  if ( action.type == actions.SET_DRAG_COMPONENT ) {
    return action.component
  } else {
    return state
  }
}

export var updateSvgScale = ( state = 1.0, action ) => {

  if ( action.type == actions.INCREMENT_SVG_SCALE ) {
    let temp = state + 0.10

    if( temp < 300 ) {
      return temp
    } else {
      return state
    }
  }

  if ( action.type == actions.DECREMENT_SVG_SCALE ) {
    let temp = state - 0.10

    if( temp > 0.20 ) {
      return temp
    } else {
      return state
    }
  }

  return state
}

export var setMouseMoveXY = ( state = [0,0], action ) => {

  if ( action.type == actions.SET_MOUSE_MOVE_XY ) {
    return action.value
  } else {
    return state
  }
}

export var setMouseDraggingElement = ( state = false, action ) => {

  if ( action.type == actions.SET_MOUSE_DRAGGING_ELEMENT ) {
    return action.value
  } else {
    return state
  }
}

export var changeRotation = ( state  = 0, action ) => {

  if ( action.type == actions.CHANGE_ROTATION ) {
    let newState = state + 90
    if( newState > 270 ) {
      newState = 0
    }
    return newState
  } else {
    return state
  }
}

export const appReducers = combineReducers({
  derived: ( state ={ } ) => state,
  dock: updateDockComponent,
  draggingComponent: setDraggingComponent,
  svgScale: updateSvgScale,
  mouseMoveXY: setMouseMoveXY,
  mouseDraggingElement: setMouseDraggingElement,
  rotation: changeRotation,
  svgWidth: (state = {}) => state,
  svgHeight: (state = {}) => state,
  components: ( state = {} ) => state
})
