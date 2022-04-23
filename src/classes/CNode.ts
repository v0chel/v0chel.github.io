
export class CNode {
    _id: string;
    referenceId: string;
    type: string;
    label: string;
    comment: string;
    commentColor: string;
    isDisabled: boolean;
    isEntryPoint: boolean;
    extension: string;
    preview: string | any;
    localeReference: string;

    previousNode: CNode | CNode[] | null = null;
    nextNode: CNode | CNode[] | null = null;

    constructor(nodeObject: any) {
        this._id = nodeObject._id;
        this.referenceId = nodeObject.referenceId;
        this.type = nodeObject.type;
        this.label = nodeObject.label;
        this.comment = nodeObject.comment;
        this.commentColor = nodeObject.commentColor;
        this.isDisabled = nodeObject.isDisabled;
        this.isEntryPoint = nodeObject.isEntryPoint;
        this.extension = nodeObject.extension;
        this.preview = nodeObject.preview;
        this.localeReference = nodeObject.localeReference;
    }

    setPreviousNode(node: CNode) {
        this.previousNode = node;
    }

    setNextNode(node: CNode) {
        this.nextNode = node;
    }
}
