import { CFlow, CIntent, CProject } from "./objectModel";

class DSection {
    header: string
    sectionLevel: number
    subSections: DSection[] | undefined
    content: string | undefined

    constructor(header: string, sectionLevel: number | undefined) {
        this.header = header
        if (!sectionLevel) { sectionLevel = 0 }
        this.sectionLevel = sectionLevel
    }

    newSubSection (header: string) {
        if (!this.subSections) { this.subSections = [] }
        let newSection = new DSection(header, this.sectionLevel + 1)
        this.subSections.push(newSection)
        return newSection 
    }
}


class DTableGenerator {
    static generateTable (inputList: any[]) {
        if (inputList.length = 0) {
            return ""
        }
        let tableString = "<table>"
        let tableHeaders = DTableGenerator.getUniqueKeys(inputList)
        tableString += "<tr>"
        tableHeaders.forEach(header => {
            tableString += "<th>" + header + "</th>"
        })
        tableString += "</tr>"
        inputList.forEach(listItem => {
            tableString += "<tr>"
            tableHeaders.forEach((header) => {
                if (listItem[header]) {
                    tableString += "<td>" + listItem[header] + "</td>"
                } else {
                    tableString += "<td></td>"
                }
            })
            tableString += "</tr>"
        })
        tableString += "</table>"
        return tableString
    }

    static getUniqueKeys(inputList: any[]): string[] {
        let keys: string[] = []
        inputList.forEach(obj => {
            Object.keys(obj).forEach(key => {
                if (!keys.includes(key)) {
                    keys.push(key)
                }
            })
        })
        return keys
    }
}


export class DGenerator {
    static genStructure (project: CProject) {
        let rootSection = new DSection(project.name, 0)

        project.flows.forEach(flow => {
            let flowSection = rootSection.newSubSection(flow.name)
            let nluSection = flowSection.newSubSection("NLU")
            nluSection.content = DTableGenerator.generateTable(DGenerator.genIntentList(flow))
        })

        return rootSection
    }

    static genIntentList(flow: CFlow) {
        let intentTable: { name: string; length: number; }[] = []
        flow.intents.forEach((intent: CIntent) => {
            let nTrainingSentences = intent.learningSentences.length
            intentTable.push({
                name: intent.name,
                length: nTrainingSentences
            })
        })
        return intentTable
    }

    static genAttachedFlowsList(flow: CFlow) {
        
    }
}