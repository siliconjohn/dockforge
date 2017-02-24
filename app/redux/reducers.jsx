import { combineReducers } from 'redux'
import * as actions from 'actions'
import * as UUID from 'uuid-js'
import { moveObjectToRootOfArray, addComponentAsChild } from 'editor'

// consts used in the reducers below
// changed them to anything you want
const SVG_SCALE_INCREMENT = 0.1
const SVG_SCALE_MIN = 0.5
const SVG_SCALE_MAX = 200
const MIN_SVG_WIDTH = 400
const MAX_SVG_WIDTH = 4000
const MIN_SVG_HEIGHT = 400
const MAX_SVG_HEIGHT = 6000
const SVG_WIDTH_INCREMENT = 120
const SVG_HEIGHT_INCREMENT = 120

export var updateDockComponent = ( state = {}, action ) => {

  if( action.type == actions.TOGGLE_READ_ONLY ) {
    let newState = Object.assign( {}, state )
    newState.readOnly = !newState.readOnly
    return newState
  }

  if( action.type == actions.OPEN_DOCK ) {
    // stringify the value just to make sure we are working with
    // a new copy of the dock object
    let newState = JSON.parse(JSON.stringify( action.value ))
    return newState
  }

  // all actions below this statement will not functions
  // when the dock is not in readOnly mode.
  if( state.readOnly == true ) {
    return state
  }

  if ( action.type == actions.ADD_DOCK_COMPONENT ) {
    let newState = Object.assign( {}, state )
    action.component.children = []
    action.component.connectParent = "root"
    newState.components.push( action.component )
    return newState
  }

  // moves a component by setting it's left and bottom props and moves
  // it to the root level of the array of components
  if ( action.type == actions.MOVE_COMPONENT ) {
    var newState = Object.assign( {}, state )

    // find the component at root level of components array
    var component = newState.components.find(( c ) => c.uuid === action.value.uuid )

    // if component not found at root level, find and move to root
    if( component == undefined ) {
      let comp = moveObjectToRootOfArray( action.value.uuid, newState.components )

      if( comp != undefined ) {
        newState.components = comp
        component = newState.components.find(( c ) => c.uuid === action.value.uuid )
      }
    }

    // if there is a component, move it
    if( component !== undefined ) {
      component.left = action.value.left
      component.bottom = action.value.bottom
      return newState
    } else {
      return state
    }
  }

  // moves one component to become child of another
  if ( action.type == actions.ADD_CHILD_COMPONENT ) {
    let updatedComponents = addComponentAsChild( action.value.sourceUUID,
      action.value.targetUUID, action.value.targetPosition,
      Object.assign([], state.components ))

    if( updatedComponents != undefined ) {
      return Object.assign({}, state, { components: updatedComponents })
    } else {
      return state
    }
  }

  if( action.type == actions.INCREMENT_SVG_WIDTH ) {
    if( state.svgWidth + SVG_WIDTH_INCREMENT < MAX_SVG_WIDTH ) {
      let newState = Object.assign( {}, state )
      newState.svgWidth = state.svgWidth + SVG_WIDTH_INCREMENT
      return newState
    } else {
      return state
    }
  }

  if( action.type == actions.DECREMENT_SVG_WIDTH ) {
    if( state.svgWidth - SVG_WIDTH_INCREMENT > MIN_SVG_WIDTH ) {
      let newState = Object.assign( {}, state )
      newState.svgWidth = state.svgWidth - SVG_WIDTH_INCREMENT
      return newState
    } else {
      return state
    }
  }

  if( action.type == actions.INCREMENT_SVG_HEIGHT ) {
    if( state.svgHeight + SVG_HEIGHT_INCREMENT < MAX_SVG_HEIGHT ) {
      let newState = Object.assign( {}, state )
      newState.svgHeight = state.svgHeight + SVG_HEIGHT_INCREMENT
      return newState
    } else {
      return state
    }
  }

  if( action.type == actions.DECREMENT_SVG_HEIGHT ) {
    if( state.svgHeight - SVG_HEIGHT_INCREMENT > MIN_SVG_HEIGHT ) {
      let newState = Object.assign( {}, state )
      newState.svgHeight = state.svgHeight - SVG_HEIGHT_INCREMENT
      return newState
    } else {
      return state
    }
  }

  if ( action.type == actions.CHANGE_SVG_ROTATION ) {
    let newState = Object.assign( {}, state )
    let newRotation = newState.svgRotation + 90
    if( newRotation > 270 ) {
      newRotation = 0
    }
    newState.svgRotation = newRotation
    return newState
  }

  if ( action.type == actions.INCREMENT_SVG_SCALE ) {
    let newState = Object.assign( {}, state )
    let temp = newState.svgScale + SVG_SCALE_INCREMENT

    if( temp < SVG_SCALE_MAX ) {
      newState.svgScale = temp
      return newState
    } else {
      return state
    }
  }

  if ( action.type == actions.DECREMENT_SVG_SCALE ) {
    let newState = Object.assign( {}, state )
    let temp = newState.svgScale - SVG_SCALE_INCREMENT

    if( temp > SVG_SCALE_MIN ) {
      newState.svgScale = temp
      return newState
    } else {
      return state
    }
  }

  if( action.type == actions.TOGGLE_SHOW_GRID ) {
    let newState = Object.assign( {}, state )
    newState.svgShowGrid = !newState.svgShowGrid
    return newState
  }

  if( action.type == actions.TOGGLE_SHOW_CENTER_LINE ) {
    let newState = Object.assign( {}, state )
    newState.svgShowCenterLine = !newState.svgShowCenterLine
    return newState
  }

  if( action.type == actions.TOGGLE_SHOW_DISTANCES ) {
    let newState = Object.assign( {}, state )
    newState.svgShowDistances = !newState.svgShowDistances
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

export var setTouchMoveXY = ( state = [0,0], action ) => {

  if ( action.type == actions.SET_TOUCH_MOVE_XY ) {
    return action.value
  } else {
    return state
  }
}

export var setTouchDraggingElement = ( state = false, action ) => {

  if ( action.type == actions.SET_TOUCH_DRAGGING_ELEMENT ) {
    return action.value
  } else {
    return state
  }
}

export const appReducers = combineReducers({
  dock: updateDockComponent,
  draggingComponent: setDraggingComponent,
  mouseMoveXY: setMouseMoveXY,
  mouseDraggingElement: setMouseDraggingElement,
  touchMoveXY: setTouchMoveXY,
  touchDraggingElement: setTouchDraggingElement,
  newDock: ( state = {} ) => state,
  svgShowDistances: (state = {}) => state,
  svgShorelineHeight: (state = {}) => state,
  components: ( state = {} ) => state
})
