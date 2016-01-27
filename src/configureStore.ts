/* tslint:disable:no-require-imports */

import { Reducer, Store, createStore, applyMiddleware } from "redux";
import * as createLogger from "redux-logger";
import * as thunk from "redux-thunk";

import {rootReducer} from "./rootReducer";

interface HotModule {
  hot?: { accept: (path: string, callback: () => void) => void };
}

declare const module: HotModule;

const logger: Redux.Middleware = createLogger();

// create a store that has redux-thunk middleware enabled
const createStoreWithMiddleware: (reducer: Reducer) => Store =
  applyMiddleware(thunk, logger)(createStore);

export function configureStore(): Store {
  const store: Store = createStoreWithMiddleware(rootReducer);

  if (module.hot) {
    // enable Webpack hot module replacement for reducers
    module.hot.accept("./rootReducer", () => {
      const nextRootReducer: any = require("./rootReducer");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
