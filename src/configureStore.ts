/* tslint:disable:no-require-imports */

import { Reducer, Store, createStore, applyMiddleware } from "redux";
import * as createLogger from "redux-logger";
import * as thunk from "redux-thunk";

import {rootReducer} from "./rootReducer";

const logger: Redux.Middleware = createLogger();

// create a store that has redux-thunk middleware enabled
const createStoreWithMiddleware: (reducer: Reducer) => Store =
  applyMiddleware(thunk, logger)(createStore);

export function configureStore(): Store {
  return createStoreWithMiddleware(rootReducer);
}
