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

export const INCREMENT_SVG_SCALE = 'INCREMENT_SVG_SCALE'

export var incrementSvgScale = ( ) => {
  return {
    type: INCREMENT_SVG_SCALE
  }
}

export const DECREMENT_SVG_SCALE = 'DECREMENT_SVG_SCALE'

export var decrementSvgScale = ( ) => {
  return {
    type: DECREMENT_SVG_SCALE
  }
}

export const SET_MOUSE_MOVE_XY = 'SET_MOUSE_MOVE_XY'

export var setMouseMoveXY = ( value ) => {
  return {
    type: SET_MOUSE_MOVE_XY,
    value
  }
}

export const SET_MOUSE_DRAGGING_ELEMENT = 'SET_MOUSE_DRAGGING_ELEMENT'

export var setMouseDraggingElement = ( value ) => {
  return {
    type: SET_MOUSE_DRAGGING_ELEMENT,
    value
  }
}

export const CHANGE_svgRotation = 'CHANGE_svgRotation'

export var changeSvgRotation = () => {
  return {
    type: CHANGE_svgRotation
  }
}

export const TOGGLE_SHOW_GRID = 'TOGGLE_SHOW_GRID'

export var toggleShowGrid = () => {
  return {
    type: TOGGLE_SHOW_GRID
  }
}

export const TOGGLE_SHOW_CROSS = 'TOGGLE_SHOW_CROSS'

export var toggleShowCross = () => {
  return {
    type: TOGGLE_SHOW_CROSS
  }
}

export const TOGGLE_SHOW_DISTANCES = 'TOGGLE_SHOW_DISTANCES'

export var toggleShowDistances = () => {
  return {
    type: TOGGLE_SHOW_DISTANCES
  }
}
