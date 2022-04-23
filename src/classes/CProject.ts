import { CFlow } from "./CFlow";

export class CProject {
    _id: string;
    name: string;
    color: string;
    primaryLocaleReference: string;
    createdAt: number;
    lastChanged: number;
    createdBy: string;
    lastChangedBy: string;

    flows: CFlow[] = [];

    constructor(projectObject: any) {
        this._id = projectObject._id;
        this.name = projectObject.name;
        this.color = projectObject.color;
        this.primaryLocaleReference = projectObject.primaryLocaleReference;
        this.createdAt = projectObject.createdAt;
        this.createdBy = projectObject.createdBy;
        this.lastChanged = projectObject.lastChanged;
        this.lastChangedBy = projectObject.lastChangedBy;
    }

    static async getFromAPI(client: any, projectId: string) {
        const projectObject = await client.readProject({
            projectId
        });

        return new CProject(projectObject);
    }

    async loadFlowsFromAPI(client: any) {
        const flowList = await client.indexFlows({
            projectId: this._id
        });

        flowList.items.forEach((flowObject: any) => {
            let flow = new CFlow(flowObject);
            flow.loadExtendedInfoFromAPI(client);
            this.flows.push(flow);
        });

        await Promise.all(this.flows.map(async (flow) => {
            await flow.loadChartFromAPI(client);
            await flow.loadIntentsFromAPI(client);
            return await flow.loadSettingsFromAPI(client);
        }));
    }
}


