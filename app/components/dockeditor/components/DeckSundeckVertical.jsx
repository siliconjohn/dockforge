import React from 'react'
import Highlight from 'Highlight'
import { PanelVertical, panelHeight } from 'PanelVertical'

const DeckSundeckVertical = ( props ) => {
  let { left, bottom, width, height, uuid, draggingOver, draggingOverSide } = props

  const getPanels = () => {
    let panelCount = Math.round( height / panelHeight )

    return Array.from( new Array( panelCount ), ( item, index ) => {
      return (
        <PanelVertical left={ left } top={ 0.5 + bottom - height +  index * panelHeight }
         width={ width } height= { panelHeight - 1 } key={ index }/>
      )
    })
  }

  return (
    <g className="deck-section-vertical" data-uuid={ uuid }>
      <rect className="component-outline" x={ left } y={ bottom - height }
        width={ width } height={ height }/>
      <rect className="component-outline" x={ left + width / 2 } y={ bottom - height }
        width={ 1 } height={ height }/>
      { getPanels() }
      <Highlight { ...props }/>
    </g>
  )
}

DeckSundeckVertical.propTypes = {
  left: React.PropTypes.number.isRequired,
  bottom: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  uuid: React.PropTypes.string.isRequired,
  draggingOver: React.PropTypes.bool,
  draggingOverSide: React.PropTypes.string,
}

module.exports = DeckSundeckVertical
