import React from 'react'
import ReactDOM from 'react-dom'
import { initialState } from 'initialState'
import { Route, Router, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'store'
import AppContainer from 'AppContainer'

require('applicationStyles')

export const store = createStore( initialState )

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ hashHistory }>
       <Route path="/" component={ AppContainer }>
       </Route>
     </Router>
  </Provider>,
  document.getElementById( "app" )
)
