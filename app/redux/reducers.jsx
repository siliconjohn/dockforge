import { combineReducers } from 'redux'
import * as actions from 'actions'

const MIN_SVG_WIDTH = 400
const MAX_SVG_WIDTH = 4000
const MIN_SVG_HEIGHT = 400
const MAX_SVG_HEIGHT = 6000
const SVG_WIDTH_INCREMENT = 120
const SVG_HEIGHT_INCREMENT = 120

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

export var changeSvgRotation = ( state  = 0, action ) => {

  if ( action.type == actions.CHANGE_SVG_ROTATION ) {
    let newState = state + 90
    if( newState > 270 ) {
      newState = 0
    }
    return newState
  } else {
    return state
  }
}

export var toggleShowGrid = ( state = true, action ) => {

  if( action.type == actions.TOGGLE_SHOW_GRID ) {
    return !state
  } else {
    return state
  }
}

export var toggleShowCenterLine = ( state = true, action ) => {

  if( action.type == actions.TOGGLE_SHOW_CENTER_LINE ) {
    return !state
  } else {
    return state
  }
}

export var toggleShowDistances = ( state = true, action ) => {

  if( action.type == actions.TOGGLE_SHOW_DISTANCES) {
    return !state
  } else {
    return state
  }
}

export var changeSvgWidth = ( state = MIN_SVG_WIDTH, action ) => {

  if( action.type == actions.INCREMENT_SVG_WIDTH ) {
    if( state + SVG_WIDTH_INCREMENT < MAX_SVG_WIDTH ) {
      return state + SVG_WIDTH_INCREMENT
    }
  }

  if( action.type == actions.DECREMENT_SVG_WIDTH ) {
    if( state - SVG_WIDTH_INCREMENT > MIN_SVG_WIDTH ) {
      return state - SVG_WIDTH_INCREMENT
    }
  }

  return state
}

export var changeSvgHeight = ( state = MIN_SVG_HEIGHT, action ) => {

  if( action.type == actions.INCREMENT_SVG_HEIGHT ) {
    if( state + SVG_HEIGHT_INCREMENT < MAX_SVG_HEIGHT ) {
      return state + SVG_HEIGHT_INCREMENT
    }
  }

  if( action.type == actions.DECREMENT_SVG_HEIGHT ) {
    if( state - SVG_HEIGHT_INCREMENT > MIN_SVG_HEIGHT ) {
      return state - SVG_HEIGHT_INCREMENT
    }
  }

  return state
}

export const appReducers = combineReducers({
  derived: ( state ={ } ) => state,
  dock: updateDockComponent,
  draggingComponent: setDraggingComponent,
  svgScale: updateSvgScale,
  mouseMoveXY: setMouseMoveXY,
  mouseDraggingElement: setMouseDraggingElement,
  svgRotation: changeSvgRotation,
  svgWidth: changeSvgWidth,
  svgHeight: changeSvgHeight,
  svgShowGrid: toggleShowGrid,
  svgShowCenterLine: toggleShowCenterLine,
  svgShowDistances: (state = {}) => state,
  svgShorelineHeight: (state = {}) => state,
  components: ( state = {} ) => state
})
