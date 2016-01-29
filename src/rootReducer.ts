import * as _ from "lodash";

import {Action} from "./Action";
import {RootState} from "./RootState";
import {SET_LOCATIONS} from "./actionTypes";
import {MapLocation} from "./MapLocation";

const initialState: RootState = {
  locations: [
    {
      latitude: 40,
      longitude: 40
    }
  ]
};

const actionHandlers: { [actionType: string]: (state: RootState, payload: any) => RootState } = {

  [SET_LOCATIONS]: (state: RootState, locations: MapLocation[]) => {
    let newState: RootState = _.clone(state);
    newState.locations = locations;
    return newState;
  },

};

export function rootReducer(state: RootState = initialState, action: Action<any>): RootState {
  if (action && action.type && actionHandlers[action.type]) {
    return actionHandlers[action.type](state, action.payload);
  }

  return state;
}
