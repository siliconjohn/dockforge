var expect = require('expect')
var reducers = require('reducersGlobal')
var actions = require('actions')
var deepFreeze = require('deep-freeze-strict')

const testState = {
  draggingComponent: null,
  mouseMoveXY: [0,0],
  mouseDraggingElement: false,
  touchMoveXY: [0,0],
  touchDraggingElement: false,
  newDock: { svgWidth: 1000, svgHeight: 600, svgScale: 0.8, svgRotation: 0, svgShorelineHeight: 75, svgShowGrid: false,
     svgShowCenterLine: false, svgShowDistances: true, readOnly: false, components:[ ]}
}

describe( 'Redux Global Reducers', () => {

  it( 'Set dragging component', () => {
    let testComponent = { component: 'test'}
    let action = {
      type: actions.SET_DRAG_COMPONENT,
      component: testComponent
    }
    let response = reducers.setDraggingComponent( null, deepFreeze( action ))
    expect(  JSON.stringify( response )).toEqual( JSON.stringify( testComponent ))
  })

  it( 'Set mouse move x and y', () => {
    let testArray = [11,12]
    let action = {
      type: actions.SET_MOUSE_MOVE_XY,
      value: testArray
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.setMouseMoveXY( deepFreeze( initialState.mouseMoveXY ), deepFreeze( action ))
    expect(  JSON.stringify( response[0] )).toEqual( 11 )
    expect(  JSON.stringify( response[1] )).toEqual( 12 )
  })

  it( 'Set mouse dragging element', () => {
    let action = {
      type: actions.SET_MOUSE_DRAGGING_ELEMENT,
      value: true
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.setMouseDraggingElement( deepFreeze( initialState.mouseDraggingElement ), deepFreeze( action ))
    expect( response ).toEqual( true )
  })

  it( 'Set touch move x and y', () => {
    let testArray = [11,12]
    let action = {
      type: actions.SET_TOUCH_MOVE_XY,
      value: testArray
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.setTouchMoveXY( deepFreeze( initialState.mouseMoveXY ), deepFreeze( action ))
    expect(  JSON.stringify( response[0] )).toEqual( 11 )
    expect(  JSON.stringify( response[1] )).toEqual( 12 )
  })

  it( 'Set touch dragging element', () => {
    let action = {
      type: actions.SET_TOUCH_DRAGGING_ELEMENT,
      value: true
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.setTouchDraggingElement( deepFreeze( initialState.mouseDraggingElement ), deepFreeze( action ))
    expect( response ).toEqual( true )
  })
})
