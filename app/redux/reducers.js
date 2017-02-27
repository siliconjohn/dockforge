import { combineReducers } from 'redux'
import * as actions from 'actions'
import * as consts from 'reducerConsts'
import * as helpers from 'reducerHelpers'

export var updateDockComponent = ( state = {}, action ) => {

  if( action.type == actions.TOGGLE_READ_ONLY ) {
    return Object.assign( {}, state, { readOnly: !state.readOnly })
  }

  if( action.type == actions.OPEN_DOCK ) {
    // stringify the value just to make sure we are working with
    // a new copy of the dock object
    return JSON.parse( JSON.stringify( action.value ))
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
    var newState = JSON.parse( JSON.stringify( state ))

    // look for the component at root level of components array
    var component = newState.components.find(( c ) => c.uuid === action.value.uuid )

    // if component not found at root level, find and move to root
    if( component == undefined ) {
      let newComponents = helpers.moveComponentToRoot( action.value.uuid, newState.components )

      if( newComponents != undefined ) {
        newState.components = newComponents

        // find the component and move it
        component = newState.components.find(( c ) => c.uuid === action.value.uuid )
        component.left = action.value.left
        component.bottom = action.value.bottom
        return newState
      }
    } else {
      // if the component was found at the root level just move it
      component.left = action.value.left
      component.bottom = action.value.bottom
      return newState
    }

    return state
  }

  // moves one component to become child of another
  if ( action.type == actions.MOVE_COMPONENT_TO_PARENT ) {
    let newState = JSON.parse( JSON.stringify( state ))
    let updatedComponents = helpers.moveComponentToParent( action.value.sourceUUID,
      action.value.targetUUID, action.value.targetPosition,
      newState.components )

    if( updatedComponents !== undefined ) {
      return Object.assign({}, newState, { components: updatedComponents })
    } else {
      return state
    }
  }

  if( action.type == actions.INCREMENT_SVG_WIDTH ) {
    if( state.svgWidth + consts.SVG_WIDTH_INCREMENT < consts.MAX_SVG_WIDTH ) {
      return Object.assign( {}, state, {
        svgWidth: state.svgWidth + consts.SVG_WIDTH_INCREMENT })
    } else {
      return state
    }
  }

  if( action.type == actions.DECREMENT_SVG_WIDTH ) {
    if( state.svgWidth - consts.SVG_WIDTH_INCREMENT > consts.MIN_SVG_WIDTH ) {
      return Object.assign( {}, state, {
        svgWidth: state.svgWidth - consts.SVG_WIDTH_INCREMENT })
    } else {
      return state
    }
  }

  if( action.type == actions.INCREMENT_SVG_HEIGHT ) {
    if( state.svgHeight + consts.SVG_HEIGHT_INCREMENT < consts.MAX_SVG_HEIGHT ) {
      return Object.assign( {}, state, {
        svgHeight: state.svgHeight + consts.SVG_HEIGHT_INCREMENT })
    } else {
      return state
    }
  }

  if( action.type == actions.DECREMENT_SVG_HEIGHT ) {
    if( state.svgHeight - consts.SVG_HEIGHT_INCREMENT > consts.MIN_SVG_HEIGHT ) {
      return Object.assign( {}, state, {
        svgHeight: state.svgHeight - consts.SVG_HEIGHT_INCREMENT })
    } else {
      return state
    }
  }

  if ( action.type == actions.CHANGE_SVG_ROTATION ) {
    let newRotation = state.svgRotation + 90
    if( newRotation > 270 ) newRotation = 0
    return Object.assign( {}, state, {
      svgRotation: newRotation })
  }

  if ( action.type == actions.INCREMENT_SVG_SCALE ) {
    let temp = state.svgScale + consts.SVG_SCALE_INCREMENT
    if( temp < consts.SVG_SCALE_MAX ) {
      return Object.assign( {}, state, { svgScale: temp })
    } else {
      return state
    }
  }

  if ( action.type == actions.DECREMENT_SVG_SCALE ) {
    let temp = state.svgScale - consts.SVG_SCALE_INCREMENT
    if( temp > consts.SVG_SCALE_MIN ) {
      return Object.assign( {}, state, { svgScale: temp })
    } else {
      return state
    }
  }

  if( action.type == actions.TOGGLE_SHOW_GRID ) {
    return Object.assign( {}, state, { svgShowGrid: !state.svgShowGrid })
  }

  if( action.type == actions.TOGGLE_SHOW_CENTER_LINE ) {
    return Object.assign( {}, state, { svgShowCenterLine: !state.svgShowCenterLine })
  }

  if( action.type == actions.TOGGLE_SHOW_DISTANCES ) {
    return Object.assign( {}, state, { svgShowDistances: !state.svgShowDistances })
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
