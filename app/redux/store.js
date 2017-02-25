var redux = require('redux')
var reducers = require('reducers')

export var createStore = ( initialState ) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose
  var store = redux.createStore( reducers.appReducers, initialState, composeEnhancers())
  return store
}
