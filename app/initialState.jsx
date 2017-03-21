export var initialState = {
  dock: {
          svgWidth: 600,
          svgHeight: 575,
          svgScale: 1,
          svgRotation: 0,
          svgShorelineHeight: 50,
          svgShowGrid: false,
          svgShowCenterLine: false,
          svgShowDistances: true,
          readOnly: false,
          components:[ ]
      },

    components: [
      { name:"DeckSectionVertical", description:"A DeckSectionVertical", type:"DeckSectionVertical", width: 42, height: 96,},
      { name:"DeckSectionHorizontal",description:"A rectangle", type:"DeckSectionHorizontal",  width: 96, height: 42,}
    ],

    draggingComponent: null,
    mouseMoveXY: [0,0],
    mouseDraggingElement: false,
    touchMoveXY: [0,0],
    touchDraggingElement: false,
    draggingOverElements: [],
    newDock: { svgWidth: 720,
          svgHeight: 551,
          svgScale: 1,
          svgRotation: 0,
          svgShorelineHeight: 50,
          svgShowGrid: true,
          svgShowCenterLine: false,
          svgShowDistances: true,
          readOnly: false,
          components:[
            //{ type: "DeckSectionVertical", left:0, bottom:0, width: 100, height: 100, uuid:"test1", connectParent:'root', children:[]},
             { type: "DeckSectionVertical", left:-21, bottom:0, width: 42, height: 96, uuid:"test2",connectParent:'root', children:[
                { type: "DeckSectionVertical", width: 42, height: 96, uuid:"child1", connectParent:'top',children:[
                 { type: "DeckSectionHorizontal", width: 96, height: 42, uuid:"child33", connectParent:'right',children:[]},
                  { type: "DeckSectionHorizontal", width: 96, height: 42, uuid:"child3", connectParent:'left',children:[
                //         { type: "DeckSectionVertical", width: 120, height: 120, uuid:"child4", connectParent:'left', children:[
                //               { type: "DeckSectionVertical", width: 120, height: 120, uuid:"child5", connectParent:'bottom', children:[]}
                //         ]}
                   ] }
                 ] }
                //
             ]},
          //  { type: "DeckSectionVertical", left:0, bottom:-200, width: 100, height: 200, uuid:"test7", connectParent:'root', children:[]}
          ]}
}
