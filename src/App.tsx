import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import pureRender from "pure-render-decorator";

import {RootState} from "./RootState";
import {Map} from "./Map";
import {Search} from "./Search";
import * as actions from "./actions";

export interface AppProps extends React.Props<any> {
  dispatch?: Dispatch;
  state?: RootState;
}

export interface AppState {
  viewport: MapGLViewport;
}

@connect((state: RootState) => ({ state }))
@pureRender
export class App extends React.Component<AppProps, AppState> {

  state: AppState = {
    viewport: {
      latitude: 41.86431081,
      longitude: -87.65819874,
      zoom: 8,
      startDragLngLat: null,
      isDragging: false,
    },
  };

  private onSearch = (searchText: string) => {
    this.props.dispatch(actions.search(searchText));
  };

  private onChangeViewport = (viewport: MapGLViewport) => {
    this.setState({ viewport });
  };

  public render(): JSX.Element {
    return <div className="app">
      <Search
        onSearch={this.onSearch}
      />

      <Map
        width={window.innerWidth}
        height={window.innerHeight}
        viewport={this.state.viewport}
        locations={this.props.state.locations}
        onChangeViewport={this.onChangeViewport}
      />
    </div>;
  }
}
