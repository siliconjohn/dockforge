import React from 'react'
import Tree from 'Tree'

class Rectangle extends Tree {

  getRenderedComponent( props ) {
    let { left, bottom, width, height, uuid } = props

    return (
      <g className="hitable" data-hittest={`${left},${bottom},${width+left},${bottom-height}`}
        data-uuid={ uuid }>
        <rect stroke="darkblue" strokeWidth="1" fill="red"
          x={ left } y={ bottom - height / 2 } width={ width } height= { height / 2 }/>
        <rect stroke="darkblue" strokeWidth="1" fill="yellow"
          x={ left } y={ bottom - height  } width={ width } height= { height / 2 }/>
      </g>
    )
  }
}

module.exports = Rectangle
