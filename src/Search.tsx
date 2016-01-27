import * as React from "react";
import pureRender from "pure-render-decorator";
import * as _ from "lodash";

const ENTER_KEY_CODE: number = 13;

export interface SearchProps extends React.Props<any> {
  onSearch: (searchText: string) => void;
}

export interface SearchState {
  searchText: string;
}

@pureRender
export class Search extends React.Component<SearchProps, SearchState> {

  state: SearchState = {
    searchText: null,
  };

  private onChange = (event: React.FormEvent) => {
    let searchText: string = (event as any).target.value;
    this.setState({ searchText });
  };

  private onKeyUp = (event: React.KeyboardEvent) => {
    if (event.keyCode === ENTER_KEY_CODE && !_.isEmpty(this.state.searchText)) {
      this.props.onSearch(this.state.searchText);
      this.setState({ searchText: null });
    }
  };

  public render(): JSX.Element {
    return <div className="search">
      <input
        onChange={this.onChange}
        onKeyUp={this.onKeyUp}
      />
    </div>;
  }
}
