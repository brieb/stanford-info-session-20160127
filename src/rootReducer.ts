import * as _ from "lodash";

import * as ActionTypes from "./actionTypes";
import {Action} from "./Action";
import {RootState} from "./RootState";
import {MapLocation} from "./MapLocation";

const initialState: RootState = {
  locations: null,
};

const actionHandlers: { [actionType: string]: (state: RootState, payload: any) => RootState } = {

  [ActionTypes.SET_LOCATIONS]: (state: RootState, locations: MapLocation[]) => {
    const newState: RootState = _.clone(state);
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
