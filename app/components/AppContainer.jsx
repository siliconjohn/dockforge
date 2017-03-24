import React from 'react'
import Navbar from 'Navbar'
import DockEditor from 'DockEditor'
import Joyride from 'react-joyride'
import * as tour from 'tour'

class AppContainer extends React.Component {

  render() {
    return (
      <div>
        <Navbar/>
        <DockEditor/>
        <Joyride ref="joyride" steps={ tour.tourSteps } type="continuous"
          run="true" allowClicksThruHole="true" autoStart="true" showSkipButton="true"/>
      </div>
    )
  }
}

module.exports = AppContainer
