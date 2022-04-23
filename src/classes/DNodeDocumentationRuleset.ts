import { CNode } from "./CNode";

export class DNodeDocumentationRuleset {
    ruleset = {
        "start": {
            diagramNode: {
                content: { text: "Start" },
                shape: "pill",
                fill: ""
            }
        },
        "end": {
            diagramNode: {
                content: { text: "End" },
                shape: "pill"
            }
        },
        "if": {
            diagramNode: {
                content: { text: "If" },
                shape: "hexagon"
            },
            description: [
                { function: (node: CNode) => node.label, bold: true },
                { text: "Condition: ", noLinebreak: true },
                { function: (node: CNode) => node.preview.type === "condition" ? node.preview.condition : node.preview.rule.left + " " + node.preview.rule.operand + " " + node.preview.rule.right, italic: true },
                { text: "Comment: ", noLinebreak: true, italic: true },
                { function: (node: CNode) => node.comment }
            ]
        },
        "then": {
            diagramNode: {
                content: { function: (node: CNode) => node.label },
                shape: "pill"
            }
        },
        "else": {
            diagramNode: {
                content: { function: (node: CNode) => node.label },
                shape: "pill"
            }
        },
        "goTo": {
            diagramNode: {
                content: { function: (node: CNode) => node.label },
                shape: "box"
            },
            description: [
                { function: (node: CNode) => node.label, bold: true },
                { text: "Target Flow: ", italic: true, noLinebreak: true },
                { function: (node: CNode) => node.preview.flow },
                { text: "Target Node: ", italic: true, noLinebreak: true },
                { function: (node: CNode) => node.preview.node },
                { text: "Comment: ", noLinebreak: true, italic: true },
                { function: (node: CNode) => node.comment }
            ]
        },
        "executeFlow": {
            diagramNode: {
                content: { function: (node: CNode) => node.label },
                shape: "box"
            },
            description: [
                { function: (node: CNode) => node.label, bold: true },
                { text: "Target Flow: ", italic: true, noLinebreak: true },
                { function: (node: CNode) => node.preview.flow },
                { text: "Target Node: ", italic: true, noLinebreak: true },
                { function: (node: CNode) => node.preview.node },
                { text: "Comment: ", noLinebreak: true, italic: true },
                { function: (node: CNode) => node.comment }
            ]
        },
        "code": {
            diagramNode: {
                content: { function: (node: CNode) => node.label },
                shape: "box"
            },
            description: [
                { function: (node: CNode) => node.label, bold: true },
                { text: "Comment: ", noLinebreak: true, italic: true },
                { function: (node: CNode) => node.comment }
            ]
        },
        "say": {
            diagramNode: {
                content: { function: (node: CNode) => node.label },
                shape: "box"
            },
            description: [
                { function: (node: CNode) => node.label, bold: true },
                { text: "Message: ", italic: true, noLinebreak: true },
                { function: (node: CNode) => node.preview.text[0] },
                { text: "Comment: ", noLinebreak: true, italic: true },
                { function: (node: CNode) => node.comment }
            ]
        },
        "sendMessage": {
            diagramNode: {
                content: { function: (node: CNode) => node.label },
                shape: "box"
            },
            description: [
                { function: (node: CNode) => node.label, bold: true },
                { text: "Message: ", italic: true, noLinebreak: true },
                { function: (node: CNode) => node.preview },
                { text: "Comment: ", noLinebreak: true, italic: true },
                { function: (node: CNode) => node.comment }
            ]
        },
        "switch": {
            diagramNode: {
                content: { function: (node: CNode) => node.label },
                shape: "hexagon"
            },
            description: [
                { function: (node: CNode) => node.label, bold: true },
                { text: "Operator: ", italic: true, noLinebreak: true },
                { function: (node: CNode) => node.preview },
                { text: "Comment: ", noLinebreak: true, italic: true },
                { function: (node: CNode) => node.comment }
            ]
        },
        "default": {
            diagramNode: {
                content: { function: (node: CNode) => node.label },
                shape: "pill"
            }
        },
        "case": {
            diagramNode: {
                content: { function: (node: CNode) => node.label },
                shape: "pill"
            }
        },
        "wait": {
            diagramNode: {
                content: { function: (node: CNode) => node.label },
                shape: "pill"
            },
            description: [
                { text: "Wait for input" },
                { text: "Comment: ", noLinebreak: true, italic: true },
                { function: (node: CNode) => node.comment }
            ]
        },
        "stop": {
            diagramNode: {
                content: { function: (node: CNode) => node.label },
                shape: "pill"
            },
            description: [
                { text: "Stop and return" },
                { text: "Comment: ", noLinebreak: true, italic: true },
                { function: (node: CNode) => node.comment }
            ]
        },
        "thinkV2": {
            diagramNode: {
                content: { function: (node: CNode) => node.label },
                shape: "box"
            }
        }
    };

    instance: DNodeDocumentationRuleset | undefined;

    private constructor() { }

    getInstance() {
        if (!this.instance) {
            this.instance = new DNodeDocumentationRuleset();
        }
        return this.instance;
    }
}
