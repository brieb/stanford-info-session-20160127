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
      isDragging: false,
      startDragLngLat: null,
      latitude: 40,
      longitude: 40,
      zoom: 10
    },
  };

  componentDidMount() {
    this.props.dispatch(actions.setLocations([
      {
        latitude: 50,
        longitude: 50
      },
      {
        latitude: 60,
        longitude: 60
      },
    ]));
  }

  private onChangeViewport = (viewport: MapGLViewport) => {
    this.setState({ viewport });
  };

  private onSearch = (searchText: string) => {
    this.props.dispatch(actions.doSearch(searchText));
  };

  public render(): JSX.Element {
    return <div className="app">
      <Search
        onSearch={this.onSearch}
      />

      <Map
        width={500}
        height={500}
        locations={this.props.state.locations}
        onChangeViewport={this.onChangeViewport}
        viewport={this.state.viewport}
      />
    </div>;
  }

}
