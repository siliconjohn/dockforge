import React from 'react'
import Square from 'Square'
import Rectangle from 'Rectangle'

// returns the proper component giving the attr.type
// only used to create new componenets
// when you add a new component it needs to be added
// here to be available to the app
module.exports.getComponent = ( attr ) => {
  
  if( attr.type == 'Square' ) {
    return <Square { ...attr } key={ attr.uuid }/>
  }

  if( attr.type == 'Rectangle' ) {
    return <Rectangle { ...attr } key={ attr.uuid }/>
  }

  return null
}
