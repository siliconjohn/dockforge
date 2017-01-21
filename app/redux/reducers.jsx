var redux = require('redux')

export const appReducers = redux.combineReducers({
  derived: ( state ={ } ) => state,
  dock: ( state = {} ) => state,
  components: ( state = {} ) => state
})
