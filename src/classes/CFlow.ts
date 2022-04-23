import { CFlowSettings } from "./CFlowSettings";
import { CIntent } from "./CIntent";
import { CNodeRelation } from "./CNodeRelation";
import { CNode } from "./CNode";


export class CFlow {
    // info retrieved from indexFlows call result
    _id: string;
    referenceId: string;
    name: string;
    createdAt: number;
    createdBy: string;
    lastChanged: number;
    lastChangedBy: string;
    isTrainingOutOfDate: boolean;

    // extended info received from readFlow call result
    attachedFlows: string[] | undefined;
    context: any | undefined;
    img: string | undefined;
    projectReference: string | undefined;
    organisationReference: string | undefined;
    chartReference: string | undefined;
    attachedLexicons: string[] | undefined;
    localeReference: string | undefined;
    intentTrainGroupReference: string | undefined;

    chart: {
        _id: string;
        nodes: CNode[];
        relations: CNodeRelation[];
    } = {
            _id: "",
            nodes: [],
            relations: []
        };

    intents: CIntent[] = [];

    settings: CFlowSettings | undefined = undefined;

    constructor(flowObject: any) {
        this._id = flowObject._id;
        this.referenceId = flowObject.referenceId;
        this.name = flowObject.name;
        this.createdAt = flowObject.createdAt;
        this.createdBy = flowObject.createdBy;
        this.lastChanged = flowObject.lastChanged;
        this.lastChangedBy = flowObject.lastChangedBy;
        this.isTrainingOutOfDate = flowObject.isTrainingOutOfDate;
    }

    async loadExtendedInfoFromAPI(client: any) {
        const flowInfoObject = await client.readFlow({
            flowId: this._id
        });

        this.attachedFlows = flowInfoObject.attachedFlows;
        this.context = flowInfoObject.context;
        this.img = flowInfoObject.img;
        this.projectReference = flowInfoObject.projectReference;
        this.organisationReference = flowInfoObject.organisationReference;
        this.chartReference = flowInfoObject.chartReference;
        this.attachedLexicons = flowInfoObject.attachedLexicons;
        this.localeReference = flowInfoObject.localeReference;
        this.intentTrainGroupReference = flowInfoObject.intentTrainGroupReference;
    }

    async loadChartFromAPI(client: any) {
        const chart = await client.readChart({
            resourceId: this._id,
            resourceType: "flow"
        });

        this.chart._id = chart._id;
        this.chart.nodes = chart.nodes.map((nodeObject: any) => new CNode(nodeObject));
        this.chart.relations = chart.relations.map((relationObject: any) => {
            let relation = new CNodeRelation(relationObject);
            relation.lookupChildren(this.chart.nodes);
            relation.lookupNext(this.chart.nodes);
            relation.lookupNode(this.chart.nodes);
            return relation;
        });
    }

    async loadIntentsFromAPI(client: any) {
        const intentObjects = await client.indexIntents({
            flowId: this._id
        });

        const intents = await Promise.all(intentObjects.items.map(async (intentObject: any) => {
            let intent = new CIntent(intentObject);
            await intent.loadLearningSentencesFromAPI(client, this._id);
            return intent;
        }));

        intents.forEach((intent: CIntent) => {
            this.intents.push(intent);
        });
    }

    async loadSettingsFromAPI(client: any) {
        const flowSettingsObject = await client.readFlowSettings({
            flowId: this._id
        });
        this.settings = new CFlowSettings(flowSettingsObject);
    }
}
