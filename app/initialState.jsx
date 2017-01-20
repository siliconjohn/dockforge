export var initialState = {
     dock: [{ type: "deck",  width: 100, height: 100, key:"0",
             children:[
               { type: "deck", width: 100, height: 100, connectParent:'left',  children:[]},
               { type: "deck", width: 100, height: 200, connectParent:'top',    key:"5",
                 children:[
                   { type: "deck", width: 100, height: 100, connectParent:'top',
                     children:[
                       { type: "deck", width: 100, height: 100, connectParent:'left',  children:[], key:"22" }


                     ]},
                    { type: "deck", width: 100, height: 100, connectParent:'right',  children:[], key:"2",
                     children:[
                       { type: "deck", width: 100, height: 100, connectParent:'right',  children:[], key:"3",
                         children:[
                           { type: "deck", width: 100, height: 100, connectParent:'top',  children  :[], key:"4" },
                           { type: "deck", width: 100, height: 100, connectParent:'bottom',  children:[], key:"22" }
                         ]
                       }
                     ]
                   }
                 ]
               }
             ]
           }],

   derived: [
              { type: "deck", x: 0, y: 0, width: 100, length: 100, rotate:0, key:"0",
                children:[
                  { type: "deck", x: 100, y: 100, width: 100, length: 100, rotate:0, key:"1", children:[
                    { type: "deck", x: 100, y: 200, width: 100, length: 100, rotate:0, key:"4", children:[] }
                  ] },
                  { type: "deck", x: -100, y: 100, width: 100, length: 100, rotate:0, key:"2", children:[] }
                ]
              }
            ]
}



// ,
//            children:[
//              { type: "deck", x: 0, y: 100, width: 100, length: 100, rotate:0, key:"5",
//                children:[
//                  { type: "deck", x: 100, y: 100, width: 100, length: 100, rotate:0, key:"1" },
//                  { type: "deck", x: -100, y: 100, width: 100, length: 100, rotate:0, key:"2",
//                    children:[
//                      { type: "deck", x: -100, y: -200, width: 100, length: 100, rotate:0, key:"3",
//                        children:[
//                          { type: "deck", x: -100, y: 300, width: 100, length: 100, rotate:0, key:"4" }
//                        ]
//                      }
//                    ]
//                  }
//                ]
//              }
//            ]
//          }
