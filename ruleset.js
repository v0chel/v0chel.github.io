// Defines rules for node descriptions (descriptionRuleset, dr)
let dr = {
    "start": {
        diagramNode: {
            content: {text: "Start"},
            shape: "pill",
            fill: ""
        }
    },
    "end": {
        diagramNode: {
            content: {text: "End"},
            shape: "pill"
        }
    },
    "if": {
        diagramNode: {
            content: {text: "If"},
            shape: "hexagon"
        },
        description: [
            {property: "label", bold: true},
            {text: "Condition: ", noLinebreak: true},
            {function: node => node.preview.type === "condition" ? node.preview.condition : node.preview.rule.left + " " + node.preview.rule.operand + " " + node.preview.rule.right, italic: true},
            {text: "Comment: ", noLinebreak: true},
            {property: "comment"}
        ]
    },
    "then": {
        diagramNode: {
            content: {function: node => node.label},
            shape: "pill"
        }
    },
    "else": {
        diagramNode: {
            content: {function: node => node.label},
            shape: "pill"
        }
    },
    "goTo": {
        diagramNode: {
            content: {function: node => node.label},
            shape: "box"
        },
        description: [
            {property: "label", bold: true},
            {text: "Comment: ", noLinebreak: true},
            {property: "comment"}
        ]
    },
    "example": {
        diagramNode: {
            content: {function: node => node.label},
            shape: "box"
        },
        description: [
            {property: "label", bold: true},
            {text: "Comment: ", noLinebreak: true},
            {property: "comment"}
        ]
    }
}