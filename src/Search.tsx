import * as React from "react";
import pureRender from "pure-render-decorator";

export interface SearchProps extends React.Props<any> {
  onSearch: (searchText: string) => void;
}

export interface SearchComponentState { }

@pureRender
export class Search extends React.Component<SearchProps, SearchComponentState> {

  private onChange = (evt: React.FormEvent) => {
    // console.log((evt.target as any).value);
  };

  private onKeyUp = (evt: React.KeyboardEvent) => {
    if (evt.keyCode === 13) {
      this.props.onSearch((evt.target as any).value);
    }
  };

  public render(): JSX.Element {
    return <div className="search">
      <input
        type="text"
        onChange={this.onChange}
        onKeyUp={this.onKeyUp}
      />
    </div>;
  }
}
