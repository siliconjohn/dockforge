export var initialState = {
     dock: [
            { type: "BOX", left:0, bottom:-120, width: 120, height: 120 },
            { type: "RECTANGLE", left:200, bottom:-200, width: 200, height: 100 },
           ],

   derived: [
              { type: "deck", x: 0, y: 0, width: 100, length: 100, rotate:0, key:"0",
                children:[
                  { type: "deck", x: 100, y: 100, width: 100, length: 100, rotate:0, key:"1", children:[
                    { type: "deck", x: 100, y: 200, width: 100, length: 100, rotate:0, key:"4", children:[] }
                  ] },
                  { type: "deck", x: -100, y: 100, width: 100, length: 100, rotate:0, key:"2", children:[] }
                ]
              }
            ],
    components: [
      { name:"Square", description:"A square", type:"BOX", width: 100, length: 100,},
      { name:"Rectangle",description:"A rectangle", type:"RECTANGLE",  width: 100, length: 100,}
    ],

    draggingComponent: null,

    svgScale: 1.0,
    svgWidth: 1000,
    svgHeight: 600,
    svgShorelineHeight: 75,
    svgRotation: 0,
    svgShowGrid: true,
    svgShowCenterLine: true,
    svgShowDistances: true,

    mouseMoveXY: [0,0],
    mouseDraggingElement: true,

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
