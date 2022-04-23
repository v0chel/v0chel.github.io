import { CLearningSentence } from "./CLearningSentence";


export class CIntent {
    _id: string;
    tags: [];
    name: string;
    referenceId: string;
    isDisabled: boolean;
    localeReference: string;
    parentIntentId: string | null;

    learningSentences: CLearningSentence[] = [];

    constructor(intentObject: any) {
        this._id = intentObject._id;
        this.tags = intentObject.tags;
        this.name = intentObject.name;
        this.referenceId = intentObject.referenceId;
        this.isDisabled = intentObject.isDisabled;
        this.localeReference = intentObject.localeReference;
        this.parentIntentId = intentObject.parentIntentId;
    }

    async loadLearningSentencesFromAPI(client: any, flowId: string) {
        const learningSentences = await client.indexSentences({
            flowId,
            intentId: this._id
        });

        learningSentences.items.forEach((learningSentenceObject: any) => {
            this.learningSentences.push(new CLearningSentence(learningSentenceObject));
        });
    }
}
