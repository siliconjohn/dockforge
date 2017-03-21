import React from 'react'
import ComponentBase from 'ComponentBase'
import DeckSectionVertical from 'DeckSectionVertical'
import DeckSectionHorizontal from 'DeckSectionHorizontal'
import DeckPlatformVertical from 'DeckPlatformVertical'
import DeckPlatformHorizontal from 'DeckPlatformHorizontal'
import DeckSundeckVertical from 'DeckSundeckVertical'
import DeckSundeckHorizontal from 'DeckSundeckHorizontal'


// When you add a new component it needs to be added
// to this object to be available to the app
const components = {
  DeckSectionVertical: DeckSectionVertical,
  DeckSectionHorizontal: DeckSectionHorizontal,
  DeckPlatformVertical: DeckPlatformVertical,
  DeckPlatformHorizontal: DeckPlatformHorizontal,
  DeckSundeckVertical: DeckSundeckVertical,
  DeckSundeckHorizontal: DeckSundeckHorizontal,
}

// returns the proper component for rendering giving the attr.type
// this should be a stateless component used only to render onscreen
module.exports.getCustomComponent = ( attr ) => {
  let SpecificComponent = components[ attr.type ]
  return <SpecificComponent { ...attr } key={ attr.uuid } />
}

// returns the proper root component for an element, this is meant
// to be used later when there are different root components
module.exports.getRootComponent = ( attr ) => {
  return <ComponentBase { ...attr } key={ attr.uuid } />
}
