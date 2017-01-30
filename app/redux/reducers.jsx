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

export const appReducers = combineReducers({
  derived: ( state ={ } ) => state,
  dock: updateDockComponent,
  draggingComponent: setDraggingComponent,
  components: ( state = {} ) => state
})
