import * as _ from "lodash";

import * as ActionTypes from "./actionTypes";
import {Action} from "./Action";
import {RootState} from "./RootState";

const initialState: RootState = {
};

const actionHandlers: { [actionType: string]: (state: RootState, payload: any) => RootState } = {

  [ActionTypes.FOO]: (state: RootState) => {
    const newState: RootState = _.clone(state);
    return newState;
  },

};

export function rootReducer(state: RootState = initialState, action: Action<any>): RootState {
  if (action && action.type && actionHandlers[action.type]) {
    return actionHandlers[action.type](state, action.payload);
  }

  return state;
}
