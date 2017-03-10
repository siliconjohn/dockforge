var expect = require('expect')
var reducers = require('reducersDock')
var actions = require('actions')
var helpers = require( 'reducerHelpers' )
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
    components:[
      { type: "Square", left:0, bottom:0, width: 100, height: 100, uuid:"child1", connectParent:'root', children:[]},
      { type: "Rectangle", left:0, bottom:0, width: 100, height: 100, uuid:"child2",connectParent:'root', draggingOver:true, children:[
        { type: "Square",  width: 100, height: 100,uuid:"child3", connectParent:'top',children:[
          { type: "Square",  width: 100, height: 100,uuid:"child4", connectParent:'left',children:[
            { type: "Square",  width: 100, height: 100,uuid:"child5", connectParent:'left', children:[
              { type: "Square", width: 100, height: 100,   uuid:"child6", connectParent:'bottom', children:[]}
            ]}
          ]}
        ]}
      ]},
      { type: "Square", left:0, bottom:0, width: 100, height: 100, uuid:"child7", connectParent:'root', children:[]}
    ]
  }

describe( 'Redux Dock Reducers', () => {

  it( 'Should toggle readOnly', () => {
    let action = {
      type: actions.TOGGLE_READ_ONLY
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.readOnly ).toEqual( !initialState.readOnly )
  })

  it( 'Should open dock', () => {
    let openDock = Object.assign( {}, { components:
      [{ type: "Square", uuid:"childNew", connectParent:'root', children:[]}]})

    let action = {
      type: actions.OPEN_DOCK,
      value: openDock
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( JSON.stringify( response )).toEqual( JSON.stringify( openDock ))
  })

  it( 'Should toggle svgShowGrid', () => {
    let action = {
      type: actions.TOGGLE_SHOW_GRID
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.svgShowGrid ).toEqual( !initialState.svgShowGrid )
  })

  it( 'Should toggle svgShowCenterLine', () => {
    let action = {
      type: actions.TOGGLE_SHOW_CENTER_LINE
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.svgShowCenterLine ).toEqual( !initialState.svgShowCenterLine )
  })

  it( 'Should toggle svgShowCenterLine', () => {
    let action = {
      type: actions.TOGGLE_SHOW_DISTANCES
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.svgShowDistances ).toEqual( !initialState.svgShowDistances )
  })

  it( 'Should decrease svgScale', () => {
    let action = {
      type: actions.DECREMENT_SVG_SCALE
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.svgScale ).toBeLessThan( initialState.svgScale )
  })

  it( 'Should increase svgScale', () => {
    let action = {
      type: actions.INCREMENT_SVG_SCALE
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.svgScale ).toBeGreaterThan( initialState.svgScale )
  })

  it( 'Should increase svgRotation', () => {
    let action = {
      type: actions.CHANGE_SVG_ROTATION
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.svgRotation ).toEqual( 90 )
  })

  it( 'Should decrease svgHeight', () => {
    let action = {
      type: actions.INCREMENT_SVG_HEIGHT
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.svgHeight ).toBeGreaterThan( initialState.svgHeight )
  })

  it( 'Should increase svgHeight', () => {
    let action = {
      type: actions.DECREMENT_SVG_HEIGHT
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.svgHeight ).toBeLessThan( initialState.svgHeight )
  })

  it( 'Should decrease svgWidth', () => {
    let action = {
      type: actions.INCREMENT_SVG_WIDTH
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.svgWidth ).toBeGreaterThan( initialState.svgWidth )
  })

  it( 'Should increase svgWidth', () => {
    let action = {
      type: actions.DECREMENT_SVG_WIDTH
    }
    let initialState = JSON.parse( JSON.stringify( testState ))
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.svgWidth ).toBeLessThan( initialState.svgWidth )
  })

  // it( 'Should move component to parent', () => {
  //   let initialState = JSON.parse( JSON.stringify( testState ))
  //   let action = {
  //     type: actions.MOVE_COMPONENT_TO_PARENT,
  //     value: { sourceUUID: "child1", targetUUID: "child2",
  //       targetPosition: "bottom", components: initialState.components }
  //   }
  //   let response = reducers.updateDockComponent( deepFreeze( initialState ),
  //     deepFreeze( action ))
  //   let result = helpers.isChildOf( response.components[0].children, "child1")
  //   expect( result ).toEqual( true )
  // })

  it( 'Should move component', () => {
    let initialState = JSON.parse( JSON.stringify( testState ))
    let action = {
      type: actions.MOVE_COMPONENT,
      value: { uuid: "child1", left: 333, bottom: 222 }
    }

    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.components[0].left ).toEqual( 333 )
    expect( response.components[0].bottom ).toEqual( 222 )
  })

  it( 'Should set draggingOver to true', () => {
    let initialState = JSON.parse( JSON.stringify( testState ))
    let action = {
      type: actions.SET_DRAGGING_OVER_ELEMENTS,
      value: [ "child1" ]
    }
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.components[0].draggingOver ).toEqual( true )
  })

  it( 'Should set draggingOver to false', () => {
    let initialState = JSON.parse( JSON.stringify( testState ))
    let action = {
      type: actions.SET_DRAGGING_OVER_ELEMENTS,
      value: [ "child1" ]
    }
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.components[1].draggingOver ).toEqual( false )
  })

  it( 'Should move component, and put at root of array', () => {
    let initialState = JSON.parse( JSON.stringify( testState ))
    let action = {
      type: actions.MOVE_COMPONENT,
      value: { uuid: "child3", left: 333, bottom: 222 }
    }
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.components[3] ).toNotEqual( undefined )
    expect( response.components[3].left ).toEqual( 333 )
    expect( response.components[3].bottom ).toEqual( 222 )
  })

  it( 'Should add component at root of array', () => {
    let initialState = JSON.parse( JSON.stringify( testState ))

    var newComponent = { type: "Test Comp" ,left: 333, bottom: 222,
      width: 333, height:222, uuid: "test1111" }

    let action = {
      type: actions.ADD_DOCK_COMPONENT,
      component: newComponent
    }
    let response = reducers.updateDockComponent( deepFreeze( initialState ),
      deepFreeze( action ))
    expect( response.components[3] ).toNotEqual( undefined )
    expect( response.components[3].left ).toEqual( 333 )
    expect( response.components[3].bottom ).toEqual( 222 )
    expect( response.components[3].uuid ).toEqual( "test1111" )
  })
})
