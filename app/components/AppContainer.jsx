import React from 'react'
import Navbar from 'Navbar'
import DockEditor from 'DockEditor'

class AppContainer extends React.Component {

  render() {
    return (
      <div>
        <Navbar/>
        <DockEditor/>
      </div>
    )
  }
}

module.exports = AppContainer
