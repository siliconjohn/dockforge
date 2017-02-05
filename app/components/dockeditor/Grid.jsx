import React from 'react'
import { connect } from 'react-redux'

class Grid extends React.Component {

  render() {
    let { svgWidth, svgHeight, svgShorelineHeight, svgShowGrid } = this.props

    if( svgShowGrid == false ) return null

    // setup size vars
    let height = svgHeight - svgShorelineHeight
    let halfWidth = svgWidth / 2

    // build array of row positions
    let h = height * -1
    let rows = []
    for( var y = 0; y > h; y -= 12 ) rows.push( y )

    // build array of column positions
    let cols = []
    for( var x =  0 - halfWidth + ( halfWidth % 12 ); x < halfWidth; x += 12 ) cols.push( x )

    return (
      <g className="grid">
        {
          // draw non highlighted rows
          rows.map(( item, index ) => {
            if (item % 120 == 0 ) return
            return <line key={ `row-${index}` } x1={ halfWidth } y1={ item } x2={ halfWidth * -1 } y2={ item }/>
          })
        }
        {
          // draw non highlighted cols
          cols.map(( item, index ) => {
            if (item % 120 == 0 ) return
            return <line key={ `col-${index}` } x1={ item } y1={ 0  } x2={ item } y2={ height * -1  }/>
          })
        }
        {
          //draw highlighted rows ( every 10' )
          rows.map(( item, index ) => {

            if (item % 120 != 0 ) return
            return <line key={ `row-${index}` } className="highlight"
              x1={ halfWidth } y1={ item } x2={ halfWidth * -1 } y2={ item }/>
          })
        }
        {
          //draw highlighted columns ( every 10' )
          cols.map(( item, index ) => {
            if (item % 120 != 0 )  return
            return <line key={ `col-${index}` } className="highlight" x1={ item } y1={ 0  }
              x2={ item } y2={ height * -1  }/>
          })
        }
      </g>
    )
  }
}

Grid.propTypes = {
  svgWidth: React.PropTypes.number.isRequired,
  svgHeight: React.PropTypes.number.isRequired,
  svgShorelineHeight: React.PropTypes.number.isRequired,
  svgShowGrid: React.PropTypes.bool.isRequired,
}

export default connect (( state ) => {
  return {
    svgWidth: state.svgWidth,
    svgHeight: state.svgHeight,
    svgShowGrid: state.svgShowGrid,
    svgShorelineHeight: state.svgShorelineHeight,
  }
})( Grid )
