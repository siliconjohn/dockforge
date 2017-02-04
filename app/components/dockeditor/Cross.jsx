import React from 'react'

class Cross extends React.Component {

  render() {
    let { shoreLineHeight, height, halfWidth, halfHeight } = this.props

    return (
      <g className="cross">
        <line x1={ halfWidth } y1="0" x2={ halfWidth * -1 } y2="0"/>
        <line x1="0" y1={ shoreLineHeight } x2="0" y2={ height * -1 }/>
      </g>
    )
  }
}

module.exports = Cross
