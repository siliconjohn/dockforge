var expect = require('expect')
var reducers = require('reducers')
var actions = require('actions')
var deepFreeze = require('deep-freeze-strict')

const testState = {
    svgWidth: 600,
    svgHeight: 600,
    svgScale: 0.8,
    svgRotation: 0,
    svgShorelineHeight: 75,
    svgShowGrid: true,
    svgShowCenterLine: true,
    svgShowDistances: true,
    readOnly: false,
  }

describe( 'Redux Reducers', () => {

  it( 'Should toggle readOnly  ', () => {
    var action = {
      type: actions.TOGGLE_READ_ONLY
    }

    let initialState = JSON.parse( JSON.stringify( testState ))
    var response = reducers.updateDockComponent( deepFreeze( initialState ), action )
    expect( response.readOnly ).toEqual( !initialState.readOnly )
  })
})
