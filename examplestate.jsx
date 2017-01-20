export var examplestate = {

  // direction pointing on screen when rendered: n, s ,e, w
  // connectParent: left, top, right, bottom, right-middle, left-middle
  // connectsThis: left, top, right, bottom, this's side that 'connects' to parents
  // no actual positions, just props describing size, and connecting sides
  dock: { type: "deck", width: 100, length: 100, key:"0",
          children:[
            { type: "deck", width: 100, length: 100, connectParent:'top', connectThis:'bottom', key:"5",
              children:[
                { type: "deck", width: 100, length: 100, connectParent:'right', connectThis:'bottom', key:"1" },
                { type: "deck", width: 100, length: 200, connectParent:'left', connectThis:'bottom', key:"2",
                children:[
                  { type: "deck", width: 100, length: 100, connectParent:'right', connectThis:'bottom', key:"3",
                   children:[
                     { type: "deck", width: 100, length: 100, connectParent:'top', connectThis:'bottom', key:"4" }
                   ]
                 }
               ]
             }
           ]
         },


  // derived is build from dock, it computes all of the stuff needed to render
  // onle root object. key comes from dock ( above, is always unique, is used as react key)
  // looks like this:
  // W
  // W
  // WWW
  //  W

  // not sure what to do about rotation, I think it needs it, calc bases on 'connects' direction ?
  derived: { type: "deck", x: 0, y: 0, width: 100, length: 100, rotate:0, key:"0",
             children:[
               { type: "deck", x: 0, y: 100, width: 100, length: 100, rotate:0, key:"5",
                 children:[
                   { type: "deck", x: 100, y: 100, width: 100, length: 100, rotate:0, key:"1" },
                   { type: "deck", x: -100, y: 100, width: 100, length: 100, rotate:0, key:"2",
                   children:[
                     { type: "deck", x: -100, y: -200, width: 100, length: 100, rotate:0, key:"3",
                       children:[
                         { type: "deck", x: -100, y: 300, width: 100, length: 100, rotate:0, key:"4" }
                       ]
                     }
                   ]
                 }
               ]
             }







}
