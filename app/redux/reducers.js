import { combineReducers } from 'redux'
import * as reducersDock from 'reducersDock'
import * as reducersGlobal from 'reducersGlobal'

export const appReducers = combineReducers({
  dock: reducersDock.updateDockComponent,
  draggingComponent: reducersGlobal.setDraggingComponent,
  mouseMoveXY: reducersGlobal.setMouseMoveXY,
  mouseDraggingElement: reducersGlobal.setMouseDraggingElement,
  touchMoveXY: reducersGlobal.setTouchMoveXY,
  touchDraggingElement: reducersGlobal.setTouchDraggingElement,
  draggingOverElements: reducersGlobal.setDraggingOverElements,
  newDock: ( state = {} ) => state,
  svgShowDistances: (state = {}) => state,
  svgShorelineHeight: (state = {}) => state,
  components: ( state = {} ) => state
})
