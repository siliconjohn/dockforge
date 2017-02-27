import * as React from 'react'
import * as expect from 'expect'
import * as actions from '../../redux/actions'

describe( "Redux Actions", () => {

  it( "Should create ADD_DOCK_COMPONENT action", () => {
    let action = {
      type: actions.ADD_DOCK_COMPONENT,
      component: "custom"
    }
    let generatedAction = actions.addDockComponent( "custom" )
    expect( action ).toEqual( generatedAction )
  })
})
