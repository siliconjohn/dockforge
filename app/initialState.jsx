export var initialState = {
  dock: {
          svgWidth: 600,
          svgHeight: 575,
          svgScale: 1,
          svgRotation: 0,
          svgShorelineHeight: 50,
          svgShowGrid: true,
          svgShowCenterLine: true,
          svgShowDistances: true,
          readOnly: false,
          components:[
            { type: "Square", left:0, bottom:0, width: 100, height: 100, uuid:"test1", connectParent:'root', children:[]},
         { type: "Rectangle", left:0, bottom:-250, width: 100, height: 100, uuid:"test2",connectParent:'root', children:[
             { type: "Square", width: 120, height: 120, uuid:"child1", connectParent:'top',children:[

                { type: "Square", width: 120, height: 120, uuid:"child3", connectParent:'left',children:[
            //         { type: "Square", width: 120, height: 120, uuid:"child4", connectParent:'left', children:[
            //               { type: "Square", width: 120, height: 120, uuid:"child5", connectParent:'bottom', children:[]}
            //         ]}
               ] }
               ] }
            //
             ]},
             { type: "Square", left:-100, bottom:-200, width: 100, height: 100, uuid:"test7", connectParent:'root', children:[]}

          ]
      },

    components: [
      { name:"Square", description:"A square", type:"Square", width: 100, height: 100,},
      { name:"Rectangle",description:"A rectangle", type:"Rectangle",  width: 240, height: 120,}
    ],

    draggingComponent: null,
    mouseMoveXY: [0,0],
    mouseDraggingElement: false,
    touchMoveXY: [0,0],
    touchDraggingElement: false,
    draggingOverElements: [],
    newDock: { svgWidth: 1000, svgHeight: 600, svgScale: 0.8, svgRotation: 0, svgShorelineHeight: 75, svgShowGrid: false,
       svgShowCenterLine: false, svgShowDistances: true, readOnly: false, components:[ ]}

}

//
//
// {
//   action:"OPEN_DOCK",
//   value:"{   svgWidth: 1000, svgHeight: 600, svgScale: 0.8, svgRotation: 0, svgShorelineHeight: 75, svgShowGrid: false, svgShowCenterLine: false, svgShowDistances: true, readOnly: false,
//           components:[
//             { type: "Square", left:0, bottom:0, width: 120, height: 120, uuid:"test1",
//                connectParent:'root', children:  ]}
//           ]}"
// }
//
//     dock2: {   svgWidth: 1000, svgHeight: 600, svgScale: 0.8, svgRotation: 0, svgShorelineHeight: 75, svgShowGrid: false, svgShowCenterLine: false, svgShowDistances: true, readOnly: false,
//             components:[
//               { type: "Square", left:0, bottom:0, width: 120, height: 120, uuid:"test1",
//                  connectParent:'root', children:  ]}
//             ]}
