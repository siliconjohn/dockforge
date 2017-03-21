import React from 'react'
import Highlight from 'Highlight'
import { PanelHorizontal, panelWidth } from 'PanelHorizontal'

const DeckPlatformHorizontal = ( props ) => {
  let { left, bottom, width, height, uuid, draggingOver, draggingOverSide } = props

  const getPanels = () => {
    let panelCount = Math.round( width / panelWidth )

    return Array.from( new Array( panelCount ), ( item, index ) => {
      return (
        <PanelHorizontal left={ 0.5 + left + index * panelWidth } top={ bottom - height }
         width={ panelWidth } height= { height } key={ index }/>
      )
    })
  }

  return (
    <g className="deck-section-vertical" data-uuid={ uuid }>
      <rect className="component-outline" x={ left } y={ bottom - height }
        width={ width } height={ height }/>
      { getPanels() }
      <Highlight { ...props }/>
    </g>
  )
}

DeckPlatformHorizontal.propTypes = {
  left: React.PropTypes.number.isRequired,
  bottom: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  uuid: React.PropTypes.string.isRequired,
  draggingOver: React.PropTypes.bool,
  draggingOverSide: React.PropTypes.string,
}

module.exports = DeckPlatformHorizontal
