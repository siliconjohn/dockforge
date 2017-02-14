import React from 'react'
import Draggable from 'Draggable'
import { getComponent } from 'editor'

class Tree extends React.Component {

  // this is overrode in decendant classes
  getRenderedComponent( props ) {
    return null
  }

  render() {
    let { left, bottom, width, height, parentLeft, parentBottom,
      parentWidth, parentHeight, connectParent } = this.props

    // spacing bettween children and parents, will use later
    var pixelOffset = 0//this.props.root == "true" ? 0 : 2

    let renderLeft = 0
    let renderBottom = 0

    // if it has the left and bottom properties assume it is a root element
    // and render it there
    if( left != undefined && bottom != undefined && connectParent == 'root') {
      renderLeft = left
      renderBottom = bottom
    } else {
      // set render positions relative to the parent
      if( parentLeft != undefined && parentBottom != undefined ) {
        renderLeft = parentLeft
        renderBottom = parentBottom - parentHeight

        switch ( connectParent ) {
          case 'top':
            renderLeft = parentLeft
            renderBottom = parentBottom - parentHeight - pixelOffset
            break
          case 'right':
            renderLeft = parentLeft + parentWidth + pixelOffset
            renderBottom = parentBottom
            break
          case 'left':
            renderLeft = parentLeft - width - pixelOffset
            renderBottom = parentBottom
            break
          case 'bottom':
            renderLeft = parentLeft
            renderBottom = parentBottom + height + pixelOffset
            break

        }
        if( connectParent == "right" ) {
          renderLeft = parentLeft + parentWidth + pixelOffset
          renderBottom = parentBottom
        }

      } else {
        throw "Can't render, no left, bottom, parentLeft or parentBottom properties"
      }
    }

    return (
      <Draggable { ...this.props } >
        {
          this.getRenderedComponent({ left:renderLeft, bottom:renderBottom, width:width, height:height })
        }
        {
          this.props.children.map(( item, index) => {
            item.parentLeft = renderLeft
            item.parentBottom = renderBottom
            item.parentWidth = width
            item.parentHeight = height
            return getComponent( item )
          })
        }
      }
      </Draggable>
    )
  }
}

Tree.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  left: React.PropTypes.number,
  bottom: React.PropTypes.number,
  parentLeft: React.PropTypes.number,
  parentBottom: React.PropTypes.number,
  parentWidth: React.PropTypes.number,
  parentHeight: React.PropTypes.number,
  children: React.PropTypes.array.isRequired
}

module.exports = Tree
