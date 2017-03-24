
export const tourSteps = [
  {
    autoStart:"true",
    title: "Would you like a quick tutorial?",
    selector: "#app",
    type: "click",
    position: 'bottom-left',
    style: {
      beacon: {
        offsetX: 0,
        offsetY: -17
      },
      hole: {
        backgroundColor: 'rgba(0,0,0,0.7)',
      },
      arrow: {
        display: 'none'
      },
    }
  },
  {
    title: "The Lake.",
    text: "This is where you build your dock by dragging components and connecting them to each other",
    selector: ".lake",
  },
  {
    title: "This Shoreline",
    text: "This is where your dock connects to dry land. Please make sure part of your dock connects to dry land.",
    selector: ".shoreline"
  },
  {
    title: "Components",
    text: "Drag components from here to the water...",
    selector: ".component-picker",
    type: "hover"
  },

]
