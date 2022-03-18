class CNode {
    type: string
    referenceId: string
    extension: string
    label: string
    comment: string
    commentColor: string
    preview: string
    isEntryPoint: string
    isDisabled: string
    config: string
    localeReference: string
    analyticsLabel: string
    _id: string

    constructor (nodeObject) {
        this.type = nodeObject.type
        this.referenceId = nodeObject.referenceId
        this.extension = nodeObject.extension
        this.label = nodeObject.label
        this.comment = nodeObject.comment
        this.commentColor = nodeObject.commentColor
        this.preview = nodeObject.preview
        this.isEntryPoint = nodeObject.isEntryPoint
        this.isDisabled = nodeObject.isDisabled
        this.config = nodeObject.config
        this.localeReference = nodeObject.localeReference
        this.analyticsLabel = nodeObject.analyticsLabel
        this._id = nodeObject._id
    }
}

class CRelation {
    _id: string
    node: CNode
    children: CNode[]
    next: CNode

    constructor (_id: string, node: CNode, children: CNode[], next: CNode) {
        this._id = _id
        this.node = node
        this.children = children
        this.next = next
    }
}

class CChart {
    nodes: CNode[]
    relations: CRelation[]

    constructor (chartObject) {
        this.nodes = []
        this.relations = []

        chartObject.nodes.forEach(nodeObject => {
            this.nodes.push(new CNode(nodeObject))
        })

        chartObject.relations.forEach(relationObject => {
            let node = this.nodes.find(node => node._id == relationObject.node)
            let children = this.nodes.filter(node => node._id in relationObject.children)
            let next = this.nodes.find(node => node._id == relationObject.next)

            this.relations.push(new CRelation(relationObject._id, node, children, next))
        })
    }
}

class CIntent {

}

class CSettings {

}

class CSlotfiller {}

class CState {}

class CFlow {
    chart: CChart
    intents: CIntent[]
    settings: CSettings
    slotfillers: CSlotfiller[]
    states: CState[]

    attachedFlows: CFlow[]
    attachedLexicons: CLexicon[]

    _id: string
    createdAt: number
    lastChanged: number
    createdBy: string
    lastChangedBy: string
    referenceId: string
    intentTrainGroupReference: string
    feedbackReport: {
        findings: {
            type: string
        }[]
        info: {
            fscore: string
        }
    }
    isTrainingOutOfDate: boolean
    name: string
    context: object
    img: string
}

class CEndpoint {}

class CLexicon {}

class CExtension {}

class CFunction {}