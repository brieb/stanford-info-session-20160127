import * as fs from "fs";
import * as _ from "lodash";

const DATA_FILE: string = "data-service/data/crimes.json";

interface DataAttr {
  name: string;
  dataTypeName: string;
  value: any;
}

export interface DataRecord {
  id: string;
  caseNumber: string;
  date: Date;
  primaryType: string;
  description: string;
  locationDescription: string;
  isArrest: boolean;
  isDomestic: boolean;
  updatedOn: Date;
  latitude: number;
  longitude: number;
}

function parseData(): DataRecord[] {
  var data: any = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  var columns: { name: string, dataTypeName: string }[] = data.meta.view.columns;
  let results: DataAttr[][] = data.data.map((rawRow: any[]): DataAttr[] => {
    return rawRow.map((rawCell: any, index: number): DataAttr => {
      return {
        name: columns[index].name,
        dataTypeName: columns[index].dataTypeName,
        value: rawCell
      };
    });
  });
  return results.map(resultToRecord);
}

function getAttrOrDefault(result: DataAttr[], name: string): any {
  let resultAttr: DataAttr = _.find(result, (attr: DataAttr) => attr.name === name);
  if (resultAttr == null) {
    return undefined;
  }

  if (resultAttr.dataTypeName === "calendar_date") {
    return new Date(resultAttr.value);
  }

  if (resultAttr.dataTypeName === "checked") {
    return resultAttr.value;
  }

  if (resultAttr.dataTypeName === "number") {
    return parseFloat(resultAttr.value);
  }

  return resultAttr.value;
}

function resultToRecord(result: DataAttr[]): DataRecord {
  var getAttr: (name: string) => any = getAttrOrDefault.bind(null, result);
  return {
    id: getAttr("ID"),
    caseNumber: getAttr("Case Number"),
    date: getAttr("Date"),
    primaryType: getAttr("Primary Type"),
    description: getAttr("Description"),
    locationDescription: getAttr("Location Description"),
    isArrest: getAttr("Arrest"),
    isDomestic: getAttr("Domestic"),
    updatedOn: getAttr("Updated On"),
    latitude: getAttr("Latitude"),
    longitude: getAttr("Longitude"),
  };
}

export class DataService {
  private data: DataRecord[];

  constructor() {
    this.data = parseData();
  }

  public readData(limit: number, offset: number): DataRecord[] {
    return this.data.slice(offset, offset + limit);
  }

  public searchData(searchTerm: string): DataRecord[] {
    searchTerm = searchTerm.toUpperCase();
    return this.data
      .filter((datum: DataRecord) => {
        return (datum.caseNumber != null && datum.caseNumber.toUpperCase().indexOf(searchTerm) !== -1) ||
          (datum.date != null && datum.date.toString().toUpperCase().indexOf(searchTerm) !== -1) ||
          (datum.primaryType != null && datum.primaryType.toUpperCase().indexOf(searchTerm) !== -1) ||
          (datum.description != null && datum.description.toUpperCase().indexOf(searchTerm) !== -1) ||
          (datum.locationDescription != null && datum.locationDescription.toUpperCase().indexOf(searchTerm) !== -1) ||
          (datum.updatedOn != null && datum.updatedOn.toString().toUpperCase().indexOf(searchTerm) !== -1);
      });
  }
}
