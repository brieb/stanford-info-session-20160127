import * as React from "react";
import pureRender from "pure-render-decorator";
import * as _ from "lodash";

const ENTER_KEY_CODE: number = 13;

export interface SearchProps extends React.Props<any> {
  onSearch: (searchText: string) => void;
}

export interface SearchState {}

@pureRender
export class Search extends React.Component<SearchProps, SearchState> {

  private onKeyUp = (evt: React.KeyboardEvent) => {
    const searchText: string = (evt as any).target.value;
    if (evt.keyCode === ENTER_KEY_CODE && !_.isEmpty(searchText)) {
      this.props.onSearch(searchText);
    }
  };

  public render(): JSX.Element {
    return <div className="search">
      <input onKeyUp={this.onKeyUp} />
    </div>;
  }
}
