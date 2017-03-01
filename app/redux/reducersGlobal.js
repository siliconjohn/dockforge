import * as actions from 'actions'

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

export var setDraggingOverElements = ( state = [], action ) => {
  if ( action.type == actions.SET_DRAGGING_OVER_ELEMENTS ) {
    return action.value
  } else {
    return state
  }
}
