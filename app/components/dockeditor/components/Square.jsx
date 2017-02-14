import React from 'react'
import Draggable from 'Draggable'
import { getComponent } from 'editor'

class Square extends React.Component {

  render() {
    let { left, bottom, width, height, parentLeft, parentBottom,
      parentWidth, parentHeight, connectParent } = this.props

    // no pixel offset for root elements
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
        <rect stroke="darkblue" strokeWidth="1" fill="blue"
          x={ renderLeft } y={ renderBottom - height / 2 } width={ width } height= { height / 2 }/>
        <rect stroke="darkblue" strokeWidth="1" fill="green"
          x={ renderLeft } y={ renderBottom - height  } width={ width } height= { height / 2 }/>
        {

          this.props.children.map(( item, index) => {

            // set parent positions
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

Square.propTypes = {
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

module.exports = Square
