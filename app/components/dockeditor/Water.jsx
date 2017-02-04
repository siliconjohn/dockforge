import React from 'react'

class Water extends React.Component {

  render() {
    let { x, y, width, height } = this.props

    return (
      <rect x={ x } y={ y } width={ width }
        height={ height } stroke="#5bc0de" strokeWidth="0" fill="#d5f5ff"/>
    )
  }
}

module.exports = Water
 
