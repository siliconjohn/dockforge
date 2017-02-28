// import * as React from 'react'
// import * as expect from 'expect'
// import * as actions from '../../redux/actions'
//
// import * as reducers from '../../redux/reducers'
// import * as deepFreeze from 'deep-freeze-strict'
//
// const testState = {
//
//           svgWidth: 600,
//           svgHeight: 600,
//           svgScale: 0.8,
//           svgRotation: 0,
//           svgShorelineHeight: 75,
//           svgShowGrid: true,
//           svgShowCenterLine: true,
//           svgShowDistances: true,
//           readOnly: false,
//
//   }
//
// describe( 'Redux Reducers', () => {
//
//   describe( ' ', () => {
//
//     it( 'Should change  ', () => {
//       var action = {
//         type: actions.TOGGLE_READ_ONLY
//       }
//
//       let initialState = JSON.parse( JSON.stringify( testState ))
//
//       var response = reducers.updateDockComponent( deepFreeze( initialState ), deepFreeze( action ))
//       expect( response.readOnly ).toEqual( !initialState.readOnly )
//     })
//   })
// })
