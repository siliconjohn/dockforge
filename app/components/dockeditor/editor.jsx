import React from 'react'
import Square from 'Square'
import Rectangle from 'Rectangle'
import ComponentBase from 'ComponentBase'

// When you add a new component it needs to be added
// to this object to be available to the app
const components = {
  Square: Square,
  Rectangle: Rectangle
}

// returns the proper component for rendering giving the attr.type
// this should be a stateless component used only to render onscreen
module.exports.getCustomComponent = ( attr ) => {
  let SpecificComponent = components[ attr.type ]
  return <SpecificComponent { ...attr } key={ attr.uuid } />
}

// returns the proper root component for an element, this is meant
// to be used later when there are different root components
module.exports.getRootComponent = ( attr ) => {
  return <ComponentBase { ...attr } key={ attr.uuid } />
}

// this is used to move an object in an components array to the
// root level of the array of objects
module.exports.moveObjectToRootOfArray = ( uuid, array ) => {
  var foundObject

  let findInTree = ( array ) => {
    for( let i = 0; i < array.length; i++ ) {
      if( foundObject != undefined )break;
      let item = array[i]
      if( array[i].uuid == uuid ) {
        foundObject = array.splice( i, 1 )[0]
        break
      }
      findInTree( array[i] .children )
    }
  }

  findInTree( array )

  if( foundObject != undefined ) {
    foundObject.connectParent="root"
    array.push( foundObject )
  } else {
    return undefined
  }

  return array
}











// finds an object recursivly in an array by uuid, executes
// the callback when found, returns undefined if not found
const findObject = ( array, uuid, callback ) => {
  var result

  for( let i = 0; i < array.length; i++ ) {
    if( array[i].uuid == uuid ) {
      if( callback === undefined ) {
        result = array[i]
      } else {
        result = callback( i, array )
      }
      break
    }

    result = findObject( array[i].children, uuid, callback )
    if( result !== undefined ) break
  }

  return result
}

// removes an object from the array and returns it
// returns undefined if it's not found
const removeObject = ( array, uuid ) => {
  return findObject( array, uuid,( index, array ) => {
    return array.splice( index, 1 )[0]
  })
}

// is a child of an object in the array returns true
// or undefined if it's not found
const isChildOf = ( array, uuid ) => {
  return findObject( array, uuid,( index, array ) => {
    return true
  })
}

// removes an object from the array and returns it
// returns undefined if it's not found
const addObject = ( array, uuid, sourceObject ) => {
  let foundObject = findObject( array, uuid )
  if( foundObject !== undefined ) {
    foundObject.children.push( sourceObject )
    return true
  }
  return false
}

module.exports.moveComponentToParent = ( sourceUUID, targetUUID, targetPosition, targetArray ) => {

  // stupid check
  if( sourceUUID == targetUUID ) return undefined

  // find the source object, if not found return undefined
  let sourceObject = findObject( targetArray, sourceUUID )
  if( sourceObject === undefined ) return undefined

  // see if target object is a child of sourceObject
  // if it is return undefined
  let isChild = isChildOf( sourceObject.children, targetUUID )
  if( isChild == true ) return undefined

  // remove the sourceObject and add it to the targetObject and
  // return the modified targetArray
  let removedSourceObject = removeObject( targetArray, sourceUUID )
  removedSourceObject.connectParent = targetPosition
  if( addObject( targetArray, targetUUID, removedSourceObject ) == true ) {
    return targetArray
  }

  return undefined
}


// hit test for mouseover
// TODO: this is rough and needs to be replaced
// options: { rect: rect, exclude: uuid }
module.exports.getComponentsAt = ( options ) => {

  // get valid components
  let comps = $('.hitable')

  // remove excluded component
  if( options.exclude != undefined ) {
    comps = comps.map(( index, item ) => {
      if( item.getAttribute( 'data-uuid' ) != options.exclude) return item
    })
  }

  // test each component for hit
  let result = comps.map(( index, item ) => {
    let temp = item.getAttribute( "data-hittest" ).split(',')

    let itemRect = {}
    itemRect.left = temp[0]
    itemRect.bottom = temp[1]
    itemRect.right = temp[2]
    itemRect.top = temp[3]

    //compare rects
    if(((options.rect.right >= itemRect.left && options.rect.right <= itemRect.right) ||
        (options.rect.left >= itemRect.left && options.rect.left <= itemRect.right)) &&
       (( options.rect.bottom >= itemRect.top && options.rect.bottom <= itemRect.bottom ) ||
        ( options.rect.top <= itemRect.bottom && options.rect.top >= itemRect.top ))) {
      return item
    } else {
      return null
    }
  })

  return result
}
