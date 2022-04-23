import { CProject } from "./CProject";
import { CIntent } from "./CIntent";
import { CFlow } from "./CFlow";
import { DSection } from "./DSection";
import { DTableGenerator } from "./DTableGenerator";



export class DGenerator {
    static genStructure(project: CProject) {
        let rootSection = new DSection(project.name, 0);

        project.flows.forEach(flow => {
            let flowSection = rootSection.newSubSection(flow.name);
            let nluSection = flowSection.newSubSection("NLU");
            nluSection.content = DTableGenerator.generateTable(DGenerator.genIntentList(flow));
        });

        return rootSection;
    }

    static genIntentList(flow: CFlow) {
        let intentTable: { name: string; length: number; }[] = [];
        flow.intents.forEach((intent: CIntent) => {
            let nTrainingSentences = intent.learningSentences.length;
            intentTable.push({
                name: intent.name,
                length: nTrainingSentences
            });
        });
        return intentTable;
    }

    static genAttachedFlowsList(flow: CFlow) {
    }
}
