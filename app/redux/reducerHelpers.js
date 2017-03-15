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

module.exports.setDraggingOver = ( components, sourceUUID, hitRect ) => {

  // set draggingOver = false for comp and all it's children, this is to make
  // sure draggingOver is never is true for sourceUUID's and it's children
  const setDraggingOverFalse = ( components ) => {
    components.forEach(( comp ) => {
      comp.draggingOver = false
      setDraggingOverFalse( comp.children )
    })
  }

  const canConnectToSide = ( component, side, canInsert ) => {
    if( component.connectParent == getOppositeSide( side )) return false
    if( canInsert == false ) {
    for(var i=0; i < component.children.length; i++ ) {
      if( component.children[i].connectParent == side ) return false
    }}
    return true
  }

  // checks to see if hitRect overlapps each component, calcs overlapping
  // side, updates comp props
  const setDraggingOverForComponents = ( components ) => {

    components.forEach(( comp ) => {
      if( comp.uuid == sourceUUID ) {
        setDraggingOverFalse( comp.children )
      } else {
        let compHitRect = { left: comp.left, bottom: comp.bottom,
            right: comp.left + comp.width, top:comp.bottom - comp.height }

        if( rectsIntersect( hitRect, compHitRect ) == true ) {
          comp.draggingOver = true
          // calculates the intersecting side
          var compHitRectCenter = {}
          compHitRectCenter.centerX = compHitRect.left + ( compHitRect.right - compHitRect.left ) / 2
          compHitRectCenter.centerY = compHitRect.top + ( compHitRect.bottom - compHitRect.top ) / 2
          let horzCenterOffset = hitRectCenter.centerX - compHitRectCenter.centerX
          let vertCenterOffset = hitRectCenter.centerY - compHitRectCenter.centerY

          // find vert side
          let vertSide
          let vertSideOffset = 0
          if( vertCenterOffset >= 0 ) {
            vertSide = "bottom"
            vertSideOffset = vertCenterOffset
          } else {
            vertSide = "top"
            vertSideOffset = vertCenterOffset * -1
          }

          // find horz side
          let horzSide
          let horzSideOffset = 0
          if( horzCenterOffset >= 0 ) {
            horzSide = "right"
            horzSideOffset = horzCenterOffset
          } else {
            horzSide = "left"
            horzSideOffset = horzCenterOffset * -1
          }

          // decide which side to use
          let finalSide = ""
          if( horzSideOffset >= vertSideOffset ) {
            finalSide = horzSide
          } else {
            finalSide = vertSide
          }
          comp.draggingOverSide = finalSide

          // distance between centers
          comp.draggingDistance = Math.hypot( horzCenterOffset, vertCenterOffset )

          // check to see if it can connect to this side
          if( canConnectToSide( comp, comp.draggingOverSide, false ) == false ) {
            comp.draggingOver = false
            comp.draggingOverSide = undefined
            comp.draggingDistance = undefined
          } else {
            componentHits.push( comp )
          }
        } else {
          comp.draggingOver = false
          comp.draggingOverSide = undefined
          comp.draggingDistance = undefined
        }

        setDraggingOverForComponents( comp.children )
      }
    })
  }

  var componentHits = []

  // find center of hitrect
  var hitRectCenter = {}
  hitRectCenter.centerX = hitRect.left + ( hitRect.right - hitRect.left ) / 2
  hitRectCenter.centerY = hitRect.top + ( hitRect.bottom - hitRect.top ) / 2

  // find all comps that hitRect is over and set each to dragginOver = true
  setDraggingOverForComponents( components )

  // sort by distance from center of each component
  componentHits.sort(( a, b ) => {
    if( a.draggingDistance > b.draggingDistance ) return 1
    if( a.draggingDistance < b.draggingDistance ) return -1
    return 0
  })

  // set all but the first ( closest ) comp to draggingOver = false
  // we only want one comp to have draggingOver = true
  componentHits.forEach(( comp, index ) => {
    if( index == 0 ) return
    comp.draggingOver = false
    comp.draggingOverSide = undefined
    comp.draggingDistance = undefined
  })

  return components
}

module.exports.resetDraggingOver = ( components ) => {

  const setValue = ( components ) => {
    components.forEach(( object ) => {
      object.draggingOver = false
      setValue( object.children )
    })
  }

  setValue( components )

  return components
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

// test if two rects intersect, rects should look like this:
// var rect = { left:101, right:201, top:-100, bottom:0 }
const rectsIntersect = ( rect1, rect2 ) => {
  let result = false

  const insterescts = ( rect1, rect2 ) => {
    return (rect1.left <= rect2.right &&
            rect2.left <= rect1.right &&
            rect1.top <= rect2.bottom &&
            rect2.top <= rect1.bottom)
  }

  result = insterescts( rect1, rect2 )
  if( result == false ) result = insterescts( rect2, rect1)
  return result
}

const getOppositeSide = ( side ) => {
  if( side == 'left' ) return 'right'
  if( side == 'right' ) return 'left'
  if( side == 'top' ) return 'bottom'
  if( side == 'bottom' ) return 'top'
}

// these exports are only here to facilitate testing these functions
module.exports.findObject = findObject
module.exports.removeObject = removeObject
module.exports.isChildOf = isChildOf
module.exports.addObject = addObject
module.exports.rectsIntersect = rectsIntersect
module.exports.getOppositeSide = getOppositeSide
