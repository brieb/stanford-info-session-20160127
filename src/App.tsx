import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import pureRender from "pure-render-decorator";
import * as MapGL from "react-map-gl";

import {RootState} from "./RootState";

export interface AppProps extends React.Props<any> {
  dispatch?: Dispatch;
  state?: RootState;
}

export interface AppComponentState { }

@connect((state: RootState) => ({ state }))
@pureRender
export class App extends React.Component<AppProps, AppComponentState> {

  public render(): JSX.Element {
    return <div className="app">
    <MapGL
      width={700}
      height={450}
      latitude={37.78}
      longitude={-122.45}
      zoom={11}
     />
    </div>;
  }
}
