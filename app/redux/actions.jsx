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

export const INCREMENT_SVG_WIDTH = 'INCREMENT_SVG_WIDTH'

export var incrementSvgWidth = ( ) => {
  return {
    type: INCREMENT_SVG_WIDTH
  }
}

export const DECREMENT_SVG_WIDTH = 'DECREMENT_SVG_WIDTH'

export var decrementSvgWidth = ( ) => {
  return {
    type: DECREMENT_SVG_WIDTH
  }
}

export const INCREMENT_SVG_HEIGHT = 'INCREMENT_SVG_HEIGHT'

export var incrementSvgHeight = ( ) => {
  return {
    type: INCREMENT_SVG_HEIGHT
  }
}

export const DECREMENT_SVG_HEIGHT = 'DECREMENT_SVG_HEIGHT'

export var decrementSvgHeight = ( ) => {
  return {
    type: DECREMENT_SVG_HEIGHT
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

export const SET_TOUCH_MOVE_XY = 'SET_TOUCH_MOVE_XY'

export var setTouchMoveXY = ( value ) => {
  return {
    type: SET_TOUCH_MOVE_XY,
    value
  }
}

export const SET_TOUCH_DRAGGING_ELEMENT = 'SET_TOUCH_DRAGGING_ELEMENT'

export var setTouchDraggingElement = ( value ) => {
  return {
    type: SET_TOUCH_DRAGGING_ELEMENT,
    value
  }
}

export const CHANGE_SVG_ROTATION = 'CHANGE_SVG_ROTATION'

export var changeSvgRotation = () => {
  return {
    type: CHANGE_SVG_ROTATION
  }
}

export const TOGGLE_SHOW_GRID = 'TOGGLE_SHOW_GRID'

export var toggleShowGrid = () => {
  return {
    type: TOGGLE_SHOW_GRID
  }
}

export const TOGGLE_SHOW_CENTER_LINE = 'TOGGLE_SHOW_CENTER_LINE'

export var toggleShowCenterLine = () => {
  return {
    type: TOGGLE_SHOW_CENTER_LINE
  }
}

export const TOGGLE_SHOW_DISTANCES = 'TOGGLE_SHOW_DISTANCES'

export var toggleShowDistances = () => {
  return {
    type: TOGGLE_SHOW_DISTANCES
  }
}

export const TOGGLE_READ_ONLY = 'TOGGLE_READ_ONLY'

export var toggleReadOnly = () => {
  return {
    type: TOGGLE_READ_ONLY
  }
}

export const MOVE_DOCK_COMPONENT = 'MOVE_DOCK_COMPONENT'

export var moveDockComponent = ( value ) => {
  return {
    type: MOVE_DOCK_COMPONENT,
    value
  }
}

export const OPEN_DOCK = 'OPEN_DOCK'

export var openDock = ( value ) => {
  return {
    type: OPEN_DOCK,
    value
  }
}
