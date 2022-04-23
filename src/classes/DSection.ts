export class DSection {
    header: string;
    sectionLevel: number;
    subSections: DSection[] | undefined;
    content: string | undefined;

    constructor(header: string, sectionLevel: number | undefined) {
        this.header = header;
        if (!sectionLevel) { sectionLevel = 0; }
        this.sectionLevel = sectionLevel;
    }

    newSubSection(header: string) {
        if (!this.subSections) { this.subSections = []; }
        let newSection = new DSection(header, this.sectionLevel + 1);
        this.subSections.push(newSection);
        return newSection;
    }
}
