import { CNode } from "./CNode";


export class CNodeRelation {
    children: string[] | CNode[];
    _id: string | CNode;
    node: string | null | CNode;
    next: string | null | CNode;

    referenceToObjects: boolean = false;

    constructor(relationObject: any) {
        this.children = relationObject.children;
        this._id = relationObject._id;
        this.node = relationObject.node;
        this.next = relationObject.next;
    }

    lookupChildren(nodes: CNode[]) {
        this.children = this.children.map(nodeReference => {
            let node = nodes.find(node => {
                return node._id === nodeReference;
            });

            if (!node)
                throw new Error("[CNodeRelation.setReferences] Could not find matching children nodes.");
            return node;
        });
    }

    lookupNode(nodes: CNode[]) {
        let node = nodes.find(node => {
            return node._id === this.node;
        });
        if (!node)
            throw new Error("[CNodeRelation.setReferences] Could not find matching node.");
        this.node = node;
    }

    lookupNext(nodes: CNode[]) {
        let node = nodes.find(node => {
            return node._id === this.next;
        });
        if (!node) {
            this.next = null;
            return;
        }
        this.next = node;
    }
}
