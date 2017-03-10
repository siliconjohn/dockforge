// this is used to move a component to the
// root level of the array of components
module.exports.moveComponentToRoot = ( targetUUID, targetArray ) => {
  let foundObject = targetArray.find(( item ) => item.uuid === targetUUID )
  if( foundObject !== undefined ) return undefined

  foundObject = removeObject( targetArray, targetUUID )
  if( foundObject === undefined ) return undefined

  foundObject.connectParent="root"
  targetArray.push( foundObject )

  return targetArray
}

// moves one component to become the child of another component
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

module.exports.setDraggingOver = ( objectsArray, draggingOverArray ) => {

  const setValue = ( _objectsArray, _draggingOverArray ) => {
    _objectsArray.forEach(( object ) => {
      if( _draggingOverArray.indexOf( object.uuid ) > -1 ) {
        object.draggingOver = true
      } else {
        object.draggingOver = false
      }
      setValue( object.children, _draggingOverArray )
    })
  }

  setValue( objectsArray, draggingOverArray )

  return objectsArray
}

// updates or adds the left: and bottom: props of each component
module.exports.updateComponentPositions = ( targetArray ) => {

  const updateComponentPosition = ( component, parentPosition ) => {

    if( parentPosition === null ) parentPosition = {}

    if( component.connectParent !== 'root' ) {
      let tempLeft = parentPosition.left
      let tempBottom = parentPosition.bottom - parentPosition.height

      switch( component.connectParent ) {
        case 'top':
          tempLeft = parentPosition.left
          tempBottom = parentPosition.bottom - parentPosition.height
          break
        case 'right':
          tempLeft = parentPosition.left + parentPosition.width
          tempBottom = parentPosition.bottom
          break
        case 'left':
          tempLeft = parentPosition.left - parentPosition.width
          tempBottom = parentPosition.bottom
          break
        case 'bottom':
          tempLeft = parentPosition.left
          tempBottom = parentPosition.bottom + parentPosition.height
          break
      }
      component.left = tempLeft
      component.bottom = tempBottom
    }

    parentPosition.left = component.left
    parentPosition.bottom = component.bottom
    parentPosition.width = component.width
    parentPosition.height = component.height

    component.children.forEach(( item ) => {
      updateComponentPosition( item, Object.assign( {}, parentPosition ))
    })
  }

  targetArray.forEach(( item ) => {
    updateComponentPosition( item, null )
  })

  return targetArray
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
  let result = findObject( array, uuid, ( index, array ) => { return true })
  return result == true ? true : false
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

// these exports are only here to facilitate testing these functions
module.exports.findObject = findObject
module.exports.removeObject = removeObject
module.exports.isChildOf = isChildOf
module.exports.addObject = addObject
