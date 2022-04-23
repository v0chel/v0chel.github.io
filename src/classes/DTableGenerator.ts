

export class DTableGenerator {
    static generateTable(inputList: any[]) {
        if (inputList.length = 0) {
            return "";
        }
        let tableString = "<table>";
        let tableHeaders = DTableGenerator.getUniqueKeys(inputList);
        tableString += "<tr>";
        tableHeaders.forEach(header => {
            tableString += "<th>" + header + "</th>";
        });
        tableString += "</tr>";
        inputList.forEach(listItem => {
            tableString += "<tr>";
            tableHeaders.forEach((header) => {
                if (listItem[header]) {
                    tableString += "<td>" + listItem[header] + "</td>";
                } else {
                    tableString += "<td></td>";
                }
            });
            tableString += "</tr>";
        });
        tableString += "</table>";
        return tableString;
    }

    static getUniqueKeys(inputList: any[]): string[] {
        let keys: string[] = [];
        inputList.forEach(obj => {
            Object.keys(obj).forEach(key => {
                if (!keys.includes(key)) {
                    keys.push(key);
                }
            });
        });
        return keys;
    }
}
