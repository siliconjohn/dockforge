import React from 'react'
import Tree from 'tree'

class Rectangle extends Tree {

  getRenderedComponent( props ) {
    let { left, bottom, width, height } = props

    return (
      <g>
        <rect stroke="darkblue" strokeWidth="1" fill="red"
          x={ left } y={ bottom - height / 2 } width={ width } height= { height / 2 }/>
        <rect stroke="darkblue" strokeWidth="1" fill="yellow"
          x={ left } y={ bottom - height  } width={ width } height= { height / 2 }/>
      </g>
    )
  }
}

module.exports = Rectangle
