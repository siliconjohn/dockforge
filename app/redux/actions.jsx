export const ADD_DOCK_COMPONENT = 'ADD_DOCK_COMPONENT'

export var addDockComponent = ( component ) => {
  return {
    type: ADD_DOCK_COMPONENT,
    component
  }
}

export const SET_DRAG_COMPONENT = 'SET_DRAG_COMPONENT'

export var setDragComponent = ( component ) => {
  return {
    type: SET_DRAG_COMPONENT,
    component
  }
}
