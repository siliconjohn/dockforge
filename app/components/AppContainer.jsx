import React from 'react'
import Navbar from 'Navbar'
import DockEditor from 'DockEditor'
import Joyride from 'react-joyride'

class AppContainer extends React.Component {
  getSteps(){
    let steps = []

    steps.push({
      title: ".qwe",
      text: "test",
      selector: "#rrr",
      position: "left",
    })

    return steps
    }
  render() {
    return (
      <div>
        <Navbar/>
        <DockEditor/>
          <Joyride
         ref="joyride"
         steps={ this.getSteps() }
         run={true}
         debug={true}

         />
      </div>
    )
  }
}

module.exports = AppContainer
