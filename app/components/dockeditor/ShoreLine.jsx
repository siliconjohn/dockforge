import React from 'react'

class ShoreLine extends React.Component {

  render() {
    let { width, height } = this.props

    return (
      <rect x={ ( width / 2 ) * -1  } y={ 0 } width={ width }
        height={ height } stroke="#caffcd" strokeWidth="0" fill="#caffcd"/>
    )
  }
}

module.exports = ShoreLine
