export var initialState = {
  dock: {
          svgWidth: 600,
          svgHeight: 600,
          svgScale: 0.8,
          svgRotation: 0,
          svgShorelineHeight: 75,
          svgShowGrid: true,
          svgShowCenterLine: true,
          svgShowDistances: true,

          components:[
            { type: "Square", left:0, bottom:0, width: 120, height: 120, uuid:"test1",  connectParent:'root', children:[
              { type: "Square", width: 120, height: 120, uuid:"child1", connectParent:'top',children:[
                { type: "Square", width: 120, height: 120, uuid:"child3", connectParent:'left',children:[
                    { type: "Square", width: 120, height: 120, uuid:"child4", connectParent:'left', children:[
                          { type: "Square", width: 120, height: 120, uuid:"child4", connectParent:'bottom', children:[]}
                    ]}
                ] }
              ] }

            ]},
            { type: "Rectangle", left:0, bottom:-250, width: 240, height: 120, uuid:"test2", connectParent:'root', children:[
              { type: "Square", width: 120, height: 120, uuid:"child1", connectParent:'top',children:[
                { type: "Square", width: 120, height: 120, uuid:"child3", connectParent:'left',children:[
                    { type: "Square", width: 120, height: 120, uuid:"child4", connectParent:'left', children:[
                          { type: "Square", width: 120, height: 120, uuid:"child4", connectParent:'bottom', children:[]}
                    ]}
                ] }
              ] }

            ]},
            { type: "Square", left:300, bottom:-250, width: 240, height: 120, uuid:"tesrt2", connectParent:'root', children:[]}

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

}
