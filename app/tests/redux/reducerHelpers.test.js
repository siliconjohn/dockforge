var expect = require( 'expect' )
var helpers = require( 'reducerHelpers' )

const testState = [
  { type: "Square", left:0, bottom:0, width: 100, height: 100, uuid:"child1", connectParent:'root', children:[]},
  { type: "Rectangle", left:0, bottom:0, width: 100, height: 100, uuid:"child2",connectParent:'root', draggingOver: true, children:[
    { type: "Square", width: 100, height: 100, uuid:"child3", connectParent:'top',children:[
      { type: "Square", width: 100, height: 100, uuid:"child4", connectParent:'left',children:[
        { type: "Square", width: 100, height: 100, uuid:"child5", connectParent:'left', children:[
          { type: "Square",  width: 100, height: 100, uuid:"child6", connectParent:'bottom', draggingOver: true, children:[]}
        ]}
      ]}
    ]}
  ]},
  { type: "Square", left:0, bottom:0, width: 100, height: 100, uuid:"child7", connectParent:'root', children:[
    { type: "Square",  width: 100, height: 100, uuid:"child33", connectParent:'top',children:[]},
    { type: "Square",  width: 100, height: 100, uuid:"child34", connectParent:'right',children:[]},
    { type: "Square",  width: 100, height: 100, uuid:"child35", connectParent:'bottom',children:[]},
    { type: "Square",  width: 100, height: 100, uuid:"child36", connectParent:'left',children:[]}]
  }
]

describe( "Reducer Helpers", () => {

  describe( "Test findObject()", () => {

    it( "Should find uuid:child4", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let foundObject = helpers.findObject( initialState, "child4")
      expect( foundObject.uuid ).toEqual( "child4" )
    })

    it( "Should find uuid:child1", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let foundObject = helpers.findObject( initialState, "child1")
      expect( foundObject.uuid ).toEqual( "child1" )
    })

    it( "Should not modify the array when an object it found", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let foundObject = helpers.findObject( initialState, "child4")
      expect( JSON.stringify( initialState )).toEqual( JSON.stringify( testState ) )
    })

    it( "Should return undefined", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let foundObject = helpers.findObject( initialState, "child1111")
      expect( foundObject ).toEqual( undefined )
    })
  })

  describe( "Test removeObject()", () => {

    it( "Should return uuid:child4", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let foundObject = helpers.removeObject( initialState, "child4")
      expect( foundObject.uuid ).toEqual( "child4" )
    })

    it( "Should remove uuid:child4", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      helpers.removeObject( initialState, "child4")
      let foundObject = helpers.findObject( initialState, "child4")
      expect( foundObject ).toEqual( undefined )
    })

    it( "Should return undefined", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let foundObject = helpers.removeObject( initialState, "child1111")
      expect( foundObject ).toEqual( undefined )
    })

    it( "Should not modify the array when an object is not found", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      helpers.removeObject( initialState, "child1111")
      expect( JSON.stringify( initialState )).toEqual( JSON.stringify( testState ) )
    })
  })

  describe( "Test isChildOf()", () => {

    it( "Should return true if uuid:child3 is child", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let result = helpers.isChildOf( initialState[1].children, "child3")
      expect( result ).toEqual( true )
    })

    it( "Should return false if uuid:child33 isnt child", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let result = helpers.isChildOf( initialState[1].children, "child33")
      expect( result ).toEqual( false )
    })
  })

  describe( "Test addObject()", () => {

    it( "Should add object to child1", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let newObject = { name: "test", uuid: "testuuid" }
      let result = helpers.addObject( initialState, "child1", newObject)
      expect( result ).toEqual( true )
    })

    it( "Should not add object to non existant object", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let newObject = { name: "test", uuid: "testuuid" }
      let result = helpers.addObject( initialState, "child11", newObject)
      expect( result ).toEqual( false )
    })

    it( "Added object in the proper position", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let newObject = { name: "test", uuid: "testuuid" }
      let result = helpers.addObject( initialState, "child1", newObject)
      expect( initialState[0].children[0].uuid ).toEqual( "testuuid" )
    })

    it( "Added deeply nested object in the proper position", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let newObject = { name: "test", uuid: "testuuid" }
      let result = helpers.addObject( initialState, "child6", newObject)
      let foundParent = helpers.findObject( initialState, "child6")
      expect( foundParent.children[0].uuid ).toEqual( "testuuid" )
    })
  })

  describe( "Test moveComponentToRoot()", () => {

    it( "Should move uuid:child4 to the object root", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let modifiedState = helpers.moveComponentToRoot( "child4", initialState )
      expect( modifiedState[3].uuid ).toEqual( "child4" )
    })

    it( "Should move uuid:child6 to the object root", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let modifiedState = helpers.moveComponentToRoot( "child6", initialState )
      expect( modifiedState[3].uuid ).toEqual( "child6" )
    })

    it( "Should return undefined when the UUID doesn't exist", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let modifiedState = helpers.moveComponentToRoot( "child-no-existant", initialState )
      expect( modifiedState ).toEqual( undefined )
    })

    it( "Should return undefined when the UUID is already at root", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let modifiedState = helpers.moveComponentToRoot( "child1", initialState )
      expect( modifiedState ).toEqual( undefined )
    })
  })

  describe( "Test moveComponentToParent()", () => {

    it( "Should move uuid:child7 to be the child of child1", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let modifiedState = helpers.moveComponentToParent( "child7", "child1", "top", initialState )
      expect( modifiedState[0].children[0].uuid ).toEqual( "child7" )
    })

    it( "Should return undefined if sourceUUID is the same as targetUUID", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let modifiedState = helpers.moveComponentToParent( "child1", "child1", "top", initialState )
      expect( modifiedState ).toEqual( undefined )
    })

    it( "Should return undefined if targetUUID is not found", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let modifiedState = helpers.moveComponentToParent( "child7", "child11", "top", initialState )
      expect( modifiedState ).toEqual( undefined )
    })

    it( "Should return undefined if sourceUUID is not found", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let modifiedState = helpers.moveComponentToParent( "child11", "child1", "top", initialState )
      expect( modifiedState ).toEqual( undefined )
    })

    it( "Should move uuid:child7 to be the child of child1, not copy", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let modifiedState = helpers.moveComponentToParent( "child7", "child1", "top", initialState )
      expect( modifiedState.length ).toEqual( 2 )
    })

    it( "Should move uuid:child7 and set connectParent to proper value", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let modifiedState = helpers.moveComponentToParent( "child7", "child1", "testtop", initialState )
      expect( modifiedState[0].children[0].connectParent ).toEqual( "testtop" )
    })
  })
  
  describe( "Test updateComponentPositions()", () => {

    it( "Should move component to top of parent", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let modifiedState = helpers.updateComponentPositions( initialState )
      expect( modifiedState[2].children[0].bottom ).toEqual( -100 )
      expect( modifiedState[2].children[0].left ).toEqual( 0 )
    })

    it( "Should move component to right of parent", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let modifiedState = helpers.updateComponentPositions( initialState )
      expect( modifiedState[2].children[1].bottom ).toEqual( 0 )
      expect( modifiedState[2].children[1].left ).toEqual( 100 )
    })

    it( "Should move component to bottom of parent", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let modifiedState = helpers.updateComponentPositions( initialState )
      expect( modifiedState[2].children[2].bottom ).toEqual( 100 )
      expect( modifiedState[2].children[2].left ).toEqual( 0 )
    })

    it( "Should move component to left of parent", () => {
      let initialState = JSON.parse( JSON.stringify( testState ))
      let modifiedState = helpers.updateComponentPositions( initialState )
      expect( modifiedState[2].children[3].bottom ).toEqual( 0 )
      expect( modifiedState[2].children[3].left ).toEqual( -100 )
    })
  })

  describe( "Test rectsIntersect()", () => {

    it( "Rects should intersect", () => {
      let rect1 = { left:0, right:100, top:-150, bottom:50 }
      let rect2 = { left:0, right:100, top:-100, bottom:0 }
      let result = helpers.rectsIntersect( rect1, rect2 )
      expect( result ).toEqual( true )
    })

    it( "Rects should not intersect", () => {
      let rect1 = { left:0, right:100, top:-200, bottom:-100 }
      let rect2 = { left:0, right:100, top:-100, bottom:0 }
      let result = helpers.rectsIntersect( rect1, rect2 )
      expect( result ).toEqual( true )
    })

    it( "Enclosed rect should intersect", () => {
      let rect1 = { left:0, right:100, top:-100, bottom:0 }
      let rect2 = { left:10, right:90, top:-90, bottom:10 }
      let result = helpers.rectsIntersect( rect1, rect2 )
      expect( result ).toEqual( true )
    })

    it( "Reversed enclosed rect should intersect", () => {
      let rect2 = { left:0, right:100, top:-100, bottom:0 }
      let rect1 = { left:10, right:90, top:-90, bottom:10 }
      let result = helpers.rectsIntersect( rect1, rect2 )
      expect( result ).toEqual( true )
    })

    it( "Bottom of rects should intersect", () => {
      let rect1 = { left:0, right:100, top:-10, bottom:-50 }
      let rect2 = { left:0, right:100, top:-100, bottom:0 }
      let result = helpers.rectsIntersect( rect1, rect2 )
      expect( result ).toEqual( true )
    })

    it( "Right of rects should intersect", () => {
      let rect1 = { left:0, right:100, top:-100, bottom:0 }
      let rect2 = { left:-99, right:0, top:-100, bottom:0 }
      let result = helpers.rectsIntersect( rect1, rect2 )
      expect( result ).toEqual( true )
    })

    it( "Right of rects should not intersect", () => {
      let rect1 = { left:0, right:100, top:-100, bottom:0 }
      let rect2 = { left:-98, right:-1, top:-100, bottom:0 }
      let result = helpers.rectsIntersect( rect1, rect2 )
      expect( result ).toEqual( false )
    })

    it( "Left of rects should intersect", () => {
      let rect1 = { left:0, right:100, top:-100, bottom:0 }
      let rect2 = { left:100, right:200, top:-100, bottom:0 }
      let result = helpers.rectsIntersect( rect1, rect2 )
      expect( result ).toEqual( true )
    })

    it( "Left of rects should not intersect", () => {
      let rect1 = { left:0, right:100, top:-100, bottom:0 }
      let rect2 = { left:101, right:201, top:-100, bottom:0 }
      let result = helpers.rectsIntersect( rect1, rect2 )
      expect( result ).toEqual( false )
    })

    it( "Bottom of rects should intersect", () => {
      let rect1 = { left:0, right:100, top:-100, bottom:0 }
      let rect2 = { left:0, right:100, top:-200, bottom:-100  }
      let result = helpers.rectsIntersect( rect1, rect2 )
      expect( result ).toEqual( true )
    })

    it( "Bottom of rects should not intersect", () => {
      let rect1 = { left:0, right:100, top:-100, bottom:0 }
      let rect2 = { left:0, right:100, top:-200, bottom:-101  }
      let result = helpers.rectsIntersect( rect1, rect2 )
      expect( result ).toEqual( false )
    })

    it( "Top of rects should intersect", () => {
      let rect1 = { left:0, right:100, top:-100, bottom:0 }
      let rect2 = { left:0, right:100, top:0, bottom:100  }
      let result = helpers.rectsIntersect( rect1, rect2 )
      expect( result ).toEqual( true )
    })

    it( "Top of rects should not intersect", () => {
      let rect1 = { left:0, right:100, top:-100, bottom:0 }
      let rect2 = { left:0, right:100, top:1, bottom:101  }
      let result = helpers.rectsIntersect( rect1, rect2 )
      expect( result ).toEqual( false )
    })
  })
})
