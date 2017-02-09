import React from 'react'
import Square from 'Square'
import Rectangle from 'Rectangle'

// returns the proper component giving the attr.type

// When you add a new component it needs to be added
// to this object to be available to the app
const components = {
  Square: Square,
  Rectangle: Rectangle
};

module.exports.getComponent = ( attr ) => {
  let SpecificComponent = components[attr.type]
  return <SpecificComponent { ...attr } key={ attr.uuid } />
}
