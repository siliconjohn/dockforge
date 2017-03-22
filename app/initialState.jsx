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
      { name:"Small Vertical Deck", svg:"docksectionvertical.svg",
        description:"42\" x 8'", type:"DeckSectionVertical", width: 42, height: 96},
      { name:"Small Horizontal Deck", svg:"docksectionhorizontal.svg",
        description:"8' x 42\"", type:"DeckSectionHorizontal",  width: 96, height: 42},

      { name:"Medium Vertical Deck", svg:"dockplatformmediumvertical.svg",
        description:"52\" x 8'", type:"DeckPlatformVertical", width: 52, height: 96},
      { name:"Medium Horizontal Deck", svg:"dockplatformmediumhorizontal.svg",
        description:"8' x 52\"", type:"DeckPlatformHorizontal",  width: 96, height: 52},

      { name:"Large Vertical Deck", svg:"docksundeckmediumvertical.svg",
        description:"84\" x 8'", type:"DeckSundeckVertical", width: 84, height: 96},
      { name:"Large Horizontal Deck", svg:"docksundeckmediumhorizontal.svg",
        description:"8' x 84\"", type:"DeckSundeckHorizontal",  width: 96, height: 84},
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
          svgShowGrid: false,
          svgShowCenterLine: false,
          svgShowDistances: false,
          readOnly: false,
          components:[
            //{ type: "DeckSectionVertical", left:0, bottom:0, width: 100, height: 100, uuid:"test1", connectParent:'root', children:[]},
             { type: "DeckSectionVertical", left:-21, bottom:24, width: 42, height: 96, drag:"none", uuid:"test2",connectParent:'root', children:[
                { type: "DeckSectionVertical", width: 42, height: 96, uuid:"child1", drag:"xy", connectParent:'top',children:[
                 { type: "DeckSectionHorizontal", width: 96, height: 42, uuid:"child33", drag:"y", connectParent:'right',children:[]},
                  { type: "DeckSectionHorizontal", width: 96, height: 42, uuid:"child3", drag:"x", connectParent:'left',children:[
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
