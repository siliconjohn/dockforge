import React from 'react'
import Tree from 'tree'

class Square extends Tree {

  getRenderedComponent( props ) {
    let { left, bottom, width, height } = props

    return (
      <g>
        <rect stroke="darkblue" strokeWidth="1" fill="blue"
          x={ left } y={ bottom - height / 2 } width={ width } height= { height / 2 }/>
        <rect stroke="darkblue" strokeWidth="1" fill="green"
          x={ left } y={ bottom - height  } width={ width } height= { height / 2 }/>
      </g>
    )
  }
}

module.exports = Square
