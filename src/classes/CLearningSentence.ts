
export class CLearningSentence {
    _id: string;
    slots: {
        _id: string;
        type: string;
        name: string;
        start: number;
        end: number;
    }[];
    text: string;
    referenceId: string;
    localeReference: string;
    createdAt: number;
    lastChanged: number;
    createdBy: string;
    lastChangedBy: string;

    constructor(learningSentenceObject: any) {
        this._id = learningSentenceObject._id;
        this.slots = learningSentenceObject.slots;
        this.text = learningSentenceObject.text;
        this.referenceId = learningSentenceObject.referenceId;
        this.localeReference = learningSentenceObject.localeReference;
        this.createdAt = learningSentenceObject.createdAt;
        this.lastChanged = learningSentenceObject.lastChanged;
        this.createdBy = learningSentenceObject.createdBy;
        this.lastChangedBy = learningSentenceObject.lastChangedBy;
    }
}
