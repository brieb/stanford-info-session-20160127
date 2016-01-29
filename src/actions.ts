import {Dispatch} from "redux";

import {MapLocation} from "./MapLocation";
import * as actionTypes from "./actionTypes";
import {Action} from "./Action";
import {RootState} from "./RootState";

import {fetchJson, Method} from "./fetchJson";

export function setLocations(locations: MapLocation[]): Action<MapLocation[]> {
  return {
    type: actionTypes.SET_LOCATIONS,
    payload: locations
  };
}

export function doSearch(searchText: string): Function {
  return function(dispatch: Dispatch, getState: () => RootState): Promise<void> {
    return fetchJson("http://localhost:4000/api/data/search?searchTerm=" + searchText, Method.GET)
      .then((results: { longitude: number, latitude: number }[]) => {
        let locations: MapLocation[] = results.map((result: { longitude: number, latitude: number }) => {
          return {
            latitude: result.latitude,
            longitude: result.longitude
          };
        });
        dispatch(setLocations(locations));
      });
  };
}
