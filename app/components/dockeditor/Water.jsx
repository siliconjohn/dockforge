import React from 'react'

class Water extends React.Component {

  render() {
    let { x, y, width, height } = this.props

    return (
      <rect className="water" x={ x } y={ y } width={ width } height={ height }/>
    )
  }
}

module.exports = Water
