export class CProject {
    _id: string
    name: string
    color: string
    primaryLocaleReference: string
    createdAt: number
    lastChanged: number
    createdBy: string
    lastChangedBy: string

    flows: CFlow[] = []

    constructor(projectObject: any) {
        this._id = projectObject._id
        this.name = projectObject.name
        this.color = projectObject.color
        this.primaryLocaleReference = projectObject.primaryLocaleReference
        this.createdAt = projectObject.createdAt
        this.createdBy = projectObject.createdBy
        this.lastChanged = projectObject.lastChanged
        this.lastChangedBy = projectObject.lastChangedBy
    }

    static async getFromAPI(client: any, projectId: string) {
        const projectObject = await client.readProject({
            projectId
        })

        return new CProject(projectObject)
    }

    async loadFlowsFromAPI(client: any) {
        const flowList = await client.indexFlows({
            projectId: this._id
        })

        flowList.items.forEach((flowObject: any) => {
            let flow = new CFlow(flowObject)
            this.flows.push(flow)
        })

        await Promise.all(this.flows.map(async flow => {
            await flow.loadChartFromAPI(client)
            await flow.loadIntentsFromAPI(client)
            return await flow.loadSettingsFromAPI(client)
        }))
    }
}

export class CFlow {
    _id: string
    referenceId: string
    name: string
    createdAt: number
    createdBy: string
    lastChanged: number
    lastChangedBy: string
    isTrainingOutOfDate: boolean

    chart: {
        _id: string
        nodes: CNode[]
        relations: CNodeRelation[]
    } = {
        _id: "",
        nodes: [],
        relations: []
    }

    intents: CIntent[] = []

    settings: CFlowSettings | undefined = undefined

    constructor(flowObject: any) {
        this._id = flowObject._id
        this.referenceId = flowObject.referenceId
        this.name = flowObject.name
        this.createdAt = flowObject.createdAt
        this.createdBy = flowObject.createdBy
        this.lastChanged = flowObject.lastChanged
        this.lastChangedBy = flowObject.lastChangedBy
        this.isTrainingOutOfDate = flowObject.isTrainingOutOfDate
    }

    async loadChartFromAPI(client: any) {
        const chart = await client.readChart({
            resourceId: this._id,
            resourceType: "flow"
        })

        this.chart._id = chart._id
        this.chart.nodes = chart.nodes.map((nodeObject: any)  => new CNode(nodeObject))
        this.chart.relations = chart.relations.map((relationObject: any) => {
            let relation = new CNodeRelation(relationObject)
            relation.lookupChildren(this.chart.nodes)
            relation.lookupNext(this.chart.nodes)
            relation.lookupNode(this.chart.nodes)
            return relation
        })
    }

    async loadIntentsFromAPI(client: any) {
        const intentObjects = await client.indexIntents({
            flowId: this._id
        })

        const intents = await Promise.all(intentObjects.items.map(async (intentObject: any) => {
            let intent = new CIntent(intentObject)
            await intent.loadLearningSentencesFromAPI(client, this._id)
            return intent
        }))

        intents.forEach((intent: CIntent) => {
            this.intents.push(intent)
        })
    }

    async loadSettingsFromAPI (client: any) {
        const flowSettingsObject = await client.readFlowSettings({
            flowId: this._id
        })
        this.settings = new CFlowSettings(flowSettingsObject)
    }
}


export class CNode {
    _id: string
    referenceId: string
    type: string
    label: string
    comment: string
    commentColor: string
    isDisabled: boolean
    isEntryPoint: boolean
    extension: string
    preview: string | object
    localeReference: string

    previousNode: CNode | CNode[] | null = null
    nextNode: CNode | CNode[] | null = null

    constructor(nodeObject: any) {
        this._id = nodeObject._id
        this.referenceId = nodeObject.referenceId
        this.type = nodeObject.type
        this.label = nodeObject.label
        this.comment = nodeObject.comment
        this.commentColor = nodeObject.commentColor
        this.isDisabled = nodeObject.isDisabled
        this.isEntryPoint = nodeObject.isEntryPoint
        this.extension = nodeObject.extension
        this.preview = nodeObject.preview
        this.localeReference = nodeObject.localeReference
    }

    setPreviousNode(node: CNode) {
        this.previousNode = node
    }

    setNextNode(node: CNode) {
        this.nextNode = node
    }
}


export class CNodeRelation {
    children: string[] | CNode[]
    _id: string | CNode
    node: string | null | CNode
    next: string | null | CNode

    referenceToObjects: boolean = false

    constructor(relationObject: any) {
        this.children = relationObject.children
        this._id = relationObject._id
        this.node = relationObject.node
        this.next = relationObject.next
    }

    lookupChildren (nodes: CNode[]) {
        this.children = this.children.map(nodeReference => {
            let node = nodes.find(node => {
                return node._id === nodeReference
            })

            if (!node) throw new Error("[CNodeRelation.setReferences] Could not find matching children nodes.")
            return node
        })
    }

    lookupNode (nodes: CNode[]) {
        let node = nodes.find(node => {
            return node._id === this.node
        })
        if (!node) throw new Error("[CNodeRelation.setReferences] Could not find matching node.")
        this.node = node
    }

    lookupNext (nodes: CNode[]) {
        let node = nodes.find(node => {
            return node._id === this.next
        })
        if (!node) {
            this.next = null
            return
        }
        this.next = node
    }
}


export class CLearningSentence {
    _id: string
    slots: {
        _id: string
        type: string
        name: string
        start: number
        end: number
    }[]
    text: string
    referenceId: string
    localeReference: string
    createdAt: number
    lastChanged: number
    createdBy: string
    lastChangedBy: string

    constructor(learningSentenceObject: any) {
        this._id = learningSentenceObject._id
        this.slots = learningSentenceObject.slots
        this.text = learningSentenceObject.text
        this.referenceId = learningSentenceObject.referenceId
        this.localeReference = learningSentenceObject.localeReference
        this.createdAt = learningSentenceObject.createdAt
        this.lastChanged = learningSentenceObject.lastChanged
        this.createdBy = learningSentenceObject.createdBy
        this.lastChangedBy = learningSentenceObject.lastChangedBy
    }
}

export class CIntent {
    _id: string
    tags: []
    name: string
    referenceId: string
    isDisabled: boolean
    localeReference: string
    parentIntentId: string | null

    learningSentences: CLearningSentence[] = []

    constructor(intentObject: any) {
        this._id = intentObject._id
        this.tags = intentObject.tags
        this.name = intentObject.name
        this.referenceId = intentObject.referenceId
        this.isDisabled = intentObject.isDisabled
        this.localeReference = intentObject.localeReference
        this.parentIntentId = intentObject.parentIntentId
    }

    async loadLearningSentencesFromAPI(client: any, flowId: string) {
        const learningSentences = await client.indexSentences({
            flowId,
            intentId: this._id
        })

        learningSentences.items.forEach((learningSentenceObject: any) => {
            this.learningSentences.push(new CLearningSentence(learningSentenceObject))
        })
    }
}


export class CFlowSettings {
    _id: string
    continueExecutionAfterAttachedFlow: boolean
    continueExecutionAfterDefaultReply: boolean
    continueExecutionAfterNegativeConfirmation: boolean
    flowIntentMappingOrder: string
    useAttachedFlowThresholds: boolean
    useAttachedFlowContinueAfterDefaultReply: boolean
    useAttachedFlowPassDefaultRepliesIntoFlow: boolean
    passDefaultRepliesIntoFlow: boolean
    implicitSlotParsing: string
    useAttachedFlowImplicitSlotParsing: boolean
    lexiconSlotsWithSubMatches: boolean
    useIntentDefaultRepliesAsExamples: boolean

    constructor (flowSettingsObject: any) {
        this._id = flowSettingsObject._id
        this.continueExecutionAfterAttachedFlow = flowSettingsObject.continueExecutionAfterAttachedFlow
        this.continueExecutionAfterDefaultReply = flowSettingsObject.continueExecutionAfterDefaultReply
        this.continueExecutionAfterNegativeConfirmation = flowSettingsObject.continueExecutionAfterNegativeConfirmation
        this.flowIntentMappingOrder = flowSettingsObject.flowIntentMappingOrder
        this.useAttachedFlowThresholds = flowSettingsObject.useAttachedFlowThresholds
        this.useAttachedFlowContinueAfterDefaultReply = flowSettingsObject.useAttachedFlowContinueAfterDefaultReply
        this.useAttachedFlowPassDefaultRepliesIntoFlow = flowSettingsObject.useAttachedFlowPassDefaultRepliesIntoFlow
        this.passDefaultRepliesIntoFlow = flowSettingsObject.passDefaultRepliesIntoFlow
        this.implicitSlotParsing = flowSettingsObject.implicitSlotParsing
        this.useAttachedFlowImplicitSlotParsing = flowSettingsObject.useAttachedFlowImplicitSlotParsing
        this.lexiconSlotsWithSubMatches = flowSettingsObject.lexiconSlotsWithSubMatches
        this.useIntentDefaultRepliesAsExamples = flowSettingsObject.useIntentDefaultRepliesAsExamples
    }
}