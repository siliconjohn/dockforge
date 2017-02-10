export var initialState = {
     dock: [
            { type: "Square", left:0, bottom:0, width: 120, height: 120, uuid:"test1" },
            { type: "Rectangle", left:200, bottom:0, width: 240, height: 120, uuid:"test2" },
           ],

   derived: [
              { type: "deck", x: 0, y: 0, width: 100, height: 100, rotate:0, key:"0",
                children:[
                  { type: "deck", x: 100, y: 100, width: 100, height: 100, rotate:0, key:"1", children:[
                    { type: "deck", x: 100, y: 200, width: 100, height: 100, rotate:0, key:"4", children:[] }
                  ] },
                  { type: "deck", x: -100, y: 100, width: 100, height: 100, rotate:0, key:"2", children:[] }
                ]
              }
            ],
    components: [
      { name:"Square", description:"A square", type:"Square", width: 100, height: 100,},
      { name:"Rectangle",description:"A rectangle", type:"Rectangle",  width: 240, height: 120,}
    ],

    draggingComponent: null,

    svgScale: 1.0,
    svgWidth: 600,
    svgHeight: 600,
    svgShorelineHeight: 75,
    svgRotation: 0,
    svgShowGrid: true,
    svgShowCenterLine: true,
    svgShowDistances: true,

    mouseMoveXY: [0,0],
    mouseDraggingElement: false,
    touchMoveXY: [0,0],
    touchDraggingElement: false,

}

// dock: [{ type: "deck",  width: 100, height: 100, key:"0",
//         children:[
//           { type: "deck", width: 100, height: 100, connectParent:'left',  children:[]},
//           { type: "deck", width: 100, height: 200, connectParent:'top',    key:"5",
//             children:[
//               { type: "deck", width: 100, height: 100, connectParent:'top',
//                 children:[
//                   { type: "deck", width: 100, height: 100, connectParent:'left',  children:[], key:"22" }
//
//
//                 ]},
//                { type: "deck", width: 100, height: 100, connectParent:'right',  children:[], key:"2",
//                 children:[
//                   { type: "deck", width: 100, height: 100, connectParent:'right',  children:[], key:"3",
//                     children:[
//                       { type: "deck", width: 100, height: 100, connectParent:'top',  children  :[], key:"4" },
//                       { type: "deck", width: 100, height: 100, connectParent:'bottom',  children:[], key:"22" }
//                     ]
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       }],

// ,
//            children:[
//              { type: "deck", x: 0, y: 100, width: 100, height: 100, rotate:0, key:"5",
//                children:[
//                  { type: "deck", x: 100, y: 100, width: 100, height: 100, rotate:0, key:"1" },
//                  { type: "deck", x: -100, y: 100, width: 100, height: 100, rotate:0, key:"2",
//                    children:[
//                      { type: "deck", x: -100, y: -200, width: 100, height: 100, rotate:0, key:"3",
//                        children:[
//                          { type: "deck", x: -100, y: 300, width: 100, height: 100, rotate:0, key:"4" }
//                        ]
//                      }
//                    ]
//                  }
//                ]
//              }
//            ]
//          }
