/* tslint:disable: no-require-imports no-var-requires */
require("es6-promise").polyfill();

import * as React from "react";
import * as ReactDOM from "react-dom";
import {Store} from "redux";
import {Provider} from "react-redux";

import {configureStore} from "./configureStore";
import {App} from "./App";

const store: Store = configureStore();

var reactContainer: HTMLDivElement = document.createElement("div");
document.body.appendChild(reactContainer);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  reactContainer);
