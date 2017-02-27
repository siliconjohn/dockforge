import * as React from 'react'
import * as expect from 'expect'
import * as helpers from '../../redux/reducerHelpers'

const testState = [
  { type: "Square", uuid:"child1", connectParent:'root', children:[]},
  { type: "Rectangle", uuid:"child2",connectParent:'root', children:[
    { type: "Square", uuid:"child3", connectParent:'top',children:[
      { type: "Square", uuid:"child4", connectParent:'left',children:[
        { type: "Square", uuid:"child5", connectParent:'left', children:[
          { type: "Square",  uuid:"child6", connectParent:'bottom', children:[]}
        ]}
      ]}
    ]}
  ]},
  { type: "Square", uuid:"child7", connectParent:'root', children:[]}
]

describe( "Reducer Helpers", () => {

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
})
