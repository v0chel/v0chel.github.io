
export class CFlowSettings {
    _id: string;
    continueExecutionAfterAttachedFlow: boolean;
    continueExecutionAfterDefaultReply: boolean;
    continueExecutionAfterNegativeConfirmation: boolean;
    flowIntentMappingOrder: string;
    useAttachedFlowThresholds: boolean;
    useAttachedFlowContinueAfterDefaultReply: boolean;
    useAttachedFlowPassDefaultRepliesIntoFlow: boolean;
    passDefaultRepliesIntoFlow: boolean;
    implicitSlotParsing: string;
    useAttachedFlowImplicitSlotParsing: boolean;
    lexiconSlotsWithSubMatches: boolean;
    useIntentDefaultRepliesAsExamples: boolean;

    constructor(flowSettingsObject: any) {
        this._id = flowSettingsObject._id;
        this.continueExecutionAfterAttachedFlow = flowSettingsObject.continueExecutionAfterAttachedFlow;
        this.continueExecutionAfterDefaultReply = flowSettingsObject.continueExecutionAfterDefaultReply;
        this.continueExecutionAfterNegativeConfirmation = flowSettingsObject.continueExecutionAfterNegativeConfirmation;
        this.flowIntentMappingOrder = flowSettingsObject.flowIntentMappingOrder;
        this.useAttachedFlowThresholds = flowSettingsObject.useAttachedFlowThresholds;
        this.useAttachedFlowContinueAfterDefaultReply = flowSettingsObject.useAttachedFlowContinueAfterDefaultReply;
        this.useAttachedFlowPassDefaultRepliesIntoFlow = flowSettingsObject.useAttachedFlowPassDefaultRepliesIntoFlow;
        this.passDefaultRepliesIntoFlow = flowSettingsObject.passDefaultRepliesIntoFlow;
        this.implicitSlotParsing = flowSettingsObject.implicitSlotParsing;
        this.useAttachedFlowImplicitSlotParsing = flowSettingsObject.useAttachedFlowImplicitSlotParsing;
        this.lexiconSlotsWithSubMatches = flowSettingsObject.lexiconSlotsWithSubMatches;
        this.useIntentDefaultRepliesAsExamples = flowSettingsObject.useIntentDefaultRepliesAsExamples;
    }
}
