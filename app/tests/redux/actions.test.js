var expect = require( 'expect' )
var actions = require( 'actions' )

describe( "Redux Actions", () => {

  it( "Should create ADD_DOCK_COMPONENT action", () => {
    let action = {
      type: actions.ADD_DOCK_COMPONENT,
      component: "custom"
    }
    let generatedAction = actions.addDockComponent( "custom" )
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create SET_DRAG_COMPONENT action", () => {
    let action = {
      type: actions.SET_DRAG_COMPONENT,
      component: "dragcomponent"
    }
    let generatedAction = actions.setDragComponent( "dragcomponent" )
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create INCREMENT_SVG_SCALE action", () => {
    let action = {
      type: actions.INCREMENT_SVG_SCALE
    }
    let generatedAction = actions.incrementSvgScale()
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create DECREMENT_SVG_SCALE action", () => {
    let action = {
      type: actions.DECREMENT_SVG_SCALE
    }
    let generatedAction = actions.decrementSvgScale()
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create INCREMENT_SVG_WIDTH action", () => {
    let action = {
      type: actions.INCREMENT_SVG_WIDTH
    }
    let generatedAction = actions.incrementSvgWidth()
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create DECREMENT_SVG_WIDTH action", () => {
    let action = {
      type: actions.DECREMENT_SVG_WIDTH
    }
    let generatedAction = actions.decrementSvgWidth()
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create INCREMENT_SVG_HEIGHT action", () => {
    let action = {
      type: actions.INCREMENT_SVG_HEIGHT
    }
    let generatedAction = actions.incrementSvgHeight()
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create DECREMENT_SVG_HEIGHT action", () => {
    let action = {
      type: actions.DECREMENT_SVG_HEIGHT
    }
    let generatedAction = actions.decrementSvgHeight()
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create SET_MOUSE_MOVE_XY action", () => {
    let action = {
      type: actions.SET_MOUSE_MOVE_XY,
      value: "custom"
    }
    let generatedAction = actions.setMouseMoveXY( "custom" )
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create SET_MOUSE_DRAGGING_ELEMENT action", () => {
    let action = {
      type: actions.SET_MOUSE_DRAGGING_ELEMENT,
      value: "custom"
    }
    let generatedAction = actions.setMouseDraggingElement( "custom" )
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create SET_TOUCH_MOVE_XY action", () => {
    let action = {
      type: actions.SET_TOUCH_MOVE_XY,
      value: "custom"
    }
    let generatedAction = actions.setTouchMoveXY( "custom" )
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create SET_TOUCH_DRAGGING_ELEMENT action", () => {
    let action = {
      type: actions.SET_TOUCH_DRAGGING_ELEMENT,
      value: "custom"
    }
    let generatedAction = actions.setTouchDraggingElement( "custom" )
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create CHANGE_SVG_ROTATION action", () => {
    let action = {
      type: actions.CHANGE_SVG_ROTATION
    }
    let generatedAction = actions.changeSvgRotation()
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create TOGGLE_SHOW_GRID action", () => {
    let action = {
      type: actions.TOGGLE_SHOW_GRID
    }
    let generatedAction = actions.toggleShowGrid()
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create TOGGLE_SHOW_CENTER_LINE action", () => {
    let action = {
      type: actions.TOGGLE_SHOW_CENTER_LINE
    }
    let generatedAction = actions.toggleShowCenterLine()
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create TOGGLE_SHOW_DISTANCES action", () => {
    let action = {
      type: actions.TOGGLE_SHOW_DISTANCES
    }
    let generatedAction = actions.toggleShowDistances()
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create TOGGLE_READ_ONLY action", () => {
    let action = {
      type: actions.TOGGLE_READ_ONLY
    }
    let generatedAction = actions.toggleReadOnly()
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create MOVE_COMPONENT action", () => {
    let action = {
      type: actions.MOVE_COMPONENT,
      value: "custom"
    }
    let generatedAction = actions.moveComponent( "custom" )
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create MOVE_COMPONENT_TO_PARENT action", () => {
    let action = {
      type: actions.MOVE_COMPONENT_TO_PARENT,
      value: "custom"
    }
    let generatedAction = actions.moveComponentToParent( "custom" )
    expect( action ).toEqual( generatedAction )
  })

  it( "Should create OPEN_DOCK action", () => {
    let action = {
      type: actions.OPEN_DOCK,
      value: "custom"
    }
    let generatedAction = actions.openDock( "custom" )
    expect( action ).toEqual( generatedAction )
  })
})
