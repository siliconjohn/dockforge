import React from 'react'

class Grid extends React.Component {

  render() {
    let { height, halfWidth } = this.props
    let h = height * -1

    // build array of row positions
    let rows = []
    for( var y = 0;y > h;y -= 12 ) rows.push( y )

    // build array of column positions
    let cols = []
    for( var x = 0;x < halfWidth; x += 12 ) cols.push( x ) // > 0
    for( var x = -12;x > 0 - halfWidth; x -= 12 ) cols.push( x ) // < 0

    return (
      <g className="grid">
        {
          //draw rows non highlighted rows
          rows.map(( item, index ) => {
            if (item % 120 == 0 ) return
            return <line key={ `row-${index}` } x1={ halfWidth } y1={ item } x2={ halfWidth * -1 } y2={ item }/>
          })
        }
        {
          //draw columns non highlighted cols
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

module.exports = Grid
