import React from 'react'

const panelWidth = 8

const PanelHorizontal = ( props ) => {
  let { left, top, height } = props

  return (
    <rect className="panel-horizontal" fill="url(#deckGradientHorizontal)" x={ left } y={ top }
     width={ panelWidth - 1 } height={ height }/>
  )
}

PanelHorizontal.propTypes = {
  left: React.PropTypes.number.isRequired,
  top: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
}

module.exports = { PanelHorizontal, panelWidth }
