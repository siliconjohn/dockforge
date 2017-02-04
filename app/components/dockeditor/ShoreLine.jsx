import React from 'react'

class ShoreLine extends React.Component {

  render() {
    let { width, height } = this.props

    return (
      <rect className="shoreline" x={ ( width / 2 ) * -1  } y={ 0 } width={ width } height={ height }/>
    )
  }
}

module.exports = ShoreLine
