// Defines rules for node descriptions (descriptionRuleset, dr)
const descriptionRuleset = {
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
            {function: node => this.result = node.label, bold: true},
            {text: "Condition: ", noLinebreak: true},
            {function: node => this.result = node.preview.type === "condition" ? node.preview.condition : node.preview.rule.left + " " + node.preview.rule.operand + " " + node.preview.rule.right, italic: true},
            {text: "Comment: ", noLinebreak: true, italic: true},
            {function: node => this.result = node.comment}
        ]
    },
    "then": {
        diagramNode: {
            content: {function: node => this.result = node.label},
            shape: "pill"
        }
    },
    "else": {
        diagramNode: {
            content: {function: node => this.result = node.label},
            shape: "pill"
        }
    },
    "goTo": {
        diagramNode: {
            content: {function: node => this.result = node.label},
            shape: "box"
        },
        description: [
            {function: node => this.result = node.label, bold: true},
            {text: "Target Flow: ", italic: true, noLinebreak: true},
            {function: node => this.result = node.preview.flow},
            {text: "Target Node: ", italic: true, noLinebreak: true},
            {function: node => this.result = node.preview.node},
            {text: "Comment: ", noLinebreak: true, italic: true},
            {function: node => this.result = node.comment}
        ]
    },
    "executeFlow": {
        diagramNode: {
            content: {function: node => this.result = node.label},
            shape: "box"
        },
        description: [
            {function: node => this.result = node.label, bold: true},
            {text: "Target Flow: ", italic: true, noLinebreak: true},
            {function: node => this.result = node.preview.flow},
            {text: "Target Node: ", italic: true, noLinebreak: true},
            {function: node => this.result = node.preview.node},
            {text: "Comment: ", noLinebreak: true, italic: true},
            {function: node => this.result = node.comment}
        ]
    },
    "code": {
        diagramNode: {
            content: {function: node => this.result = node.label},
            shape: "box"
        },
        description: [
            {function: node => this.result = node.label, bold: true},
            {text: "Comment: ", noLinebreak: true, italic: true},
            {function: node => this.result = node.comment}
        ]
    },
    "say": {
        diagramNode: {
            content: {function: node => this.result = node.label},
            shape: "box"
        },
        description: [
            {function: node => this.result = node.label, bold: true},
            {text: "Message: ", italic: true, noLinebreak: true},
            {function: node => this.result = node.preview.text[0]},
            {text: "Comment: ", noLinebreak: true, italic: true},
            {function: node => this.result = node.comment}
        ]
    },
    "sendMessage": {
        diagramNode: {
            content: {function: node => this.result = node.label},
            shape: "box"
        },
        description: [
            {function: node => this.result = node.label, bold: true},
            {text: "Message: ", italic: true, noLinebreak: true},
            {function: node => this.result = node.preview},
            {text: "Comment: ", noLinebreak: true, italic: true},
            {function: node => this.result = node.comment}
        ]
    },
    "switch": {
        diagramNode: {
            content: {function: node => this.result = node.label},
            shape: "hexagon"
        },
        description: [
            {function: node => this.result = node.label, bold: true},
            {text: "Operator: ", italic: true, noLinebreak: true},
            {function: node => this.result = node.preview},
            {text: "Comment: ", noLinebreak: true, italic: true},
            {function: node => this.result = node.comment}
        ]
    },
    "default": {
        diagramNode: {
            content: {function: node => this.result = node.label},
            shape: "pill"
        }
    },
    "case": {
        diagramNode: {
            content: {function: node => this.result = node.label},
            shape: "pill"
        }
    },
    "wait": {
        diagramNode: {
            content: {function: node => this.result = node.label},
            shape: "pill"
        },
        description: [
            {text: "Wait for input"},
            {text: "Comment: ", noLinebreak: true, italic: true},
            {function: node => this.result = node.comment}
        ]
    },
    "stop": {
        diagramNode: {
            content: {function: node => this.result = node.label},
            shape: "pill"
        },
        description: [
            {text: "Stop and return"},
            {text: "Comment: ", noLinebreak: true, italic: true},
            {function: node => this.result = node.comment}
        ]
    },
    "thinkV2": {
        diagramNode: {
            content: {function: node => this.result = node.label},
            shape: "box"
        }
    }
}