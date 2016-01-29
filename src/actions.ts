import {Dispatch} from "redux";

import {RootState} from "./RootState";
import {Action} from "./Action";
import * as actionTypes from "./actionTypes";
import {fetchJson, Method} from "./fetchJson";
import {MapLocation} from "./MapLocation";

import {DataRecord} from "../data-service/DataService";

export function search(searchText: string): Function {
  return function(dispatch: Dispatch, getState: () => RootState): Promise<void> {
    return fetchJson(`http://localhost:4000/api/data/search?searchTerm=${searchText}`, Method.GET)
      .then((records: DataRecord[]) => {
        let locations: MapLocation[] = records
          .map((record: DataRecord): MapLocation => ({
            latitude: record.latitude,
            longitude: record.longitude,
          }));
        dispatch(setLocations(locations));
      });
  };
}

export function setLocations(locations: MapLocation[]): Action<MapLocation[]> {
  return {
    type: actionTypes.SET_LOCATIONS,
    payload: locations
  };
}
