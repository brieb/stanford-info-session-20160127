import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import pureRender from "pure-render-decorator";

import {RootState} from "./RootState";
import {Map, Viewport} from "./Map";
import {Search} from "./Search";
import * as actions from "./actions";

export interface AppProps extends React.Props<any> {
  dispatch?: Dispatch;
  state?: RootState;
}

export interface AppState {
  viewport: Viewport;
}

@connect((state: RootState) => ({ state }))
@pureRender
export class App extends React.Component<AppProps, AppState> {

  state: AppState = {
    viewport: {
      latitude: 37.78,
      longitude: -122.45,
      zoom: 11,
      startDragLngLat: null,
      isDragging: false,
    },
  };

  private onSearch = (searchText: string) => {
    this.props.dispatch(actions.search(searchText));
  };

  private onChangeViewport = (viewport: Viewport) => {
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
