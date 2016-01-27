// Type definitions for redux-thunk
// Project: https://github.com/gaearon/redux-thunk
// Definitions by: Qubo <https://github.com/tkqubo>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../redux/redux.d.ts" />

interface Thunk extends Redux.Middleware { }

interface ThunkInterface {
    <T>(dispatch: Redux.Dispatch, getState?: () => T): any;
}

declare module "redux-thunk" {
    var thunk: Thunk;
    export = thunk;
}
