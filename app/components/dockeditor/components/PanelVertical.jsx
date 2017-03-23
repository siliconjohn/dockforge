import React from 'react'

const panelHeight = 8

const PanelVertical = ( props ) => {
  let { left, top, width } = props

  return (
    <rect className="panel-vertical" fill="url(#deckGradientVertical)" x={ left } y={ top }
     width={ width } height={ panelHeight - 1 }/>
  )
}

PanelVertical.propTypes = {
  left: React.PropTypes.number.isRequired,
  top: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
}

module.exports = { PanelVertical, panelHeight }
