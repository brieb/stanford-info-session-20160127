import * as React from "react";
import * as MapGL from "react-map-gl";
import * as HeatmapOverlay from "react-map-gl-heatmap-overlay";
import * as Immutable from "immutable";
import * as rasterTileStyle from "raster-tile-style";
import pureRender from "pure-render-decorator";

import {MapLocation} from "./MapLocation";

const tileSource: string = "//tile.stamen.com/toner/{z}/{x}/{y}.png";
const mapStyle: any = Immutable.fromJS(rasterTileStyle([tileSource]));

export interface MapProps extends React.Props<any> {
  width: number;
  height: number;
  viewport: MapGLViewport;
  locations: MapLocation[];
  onChangeViewport: (viewport: MapGLViewport) => void;
}

export interface MapComponentState { }

@pureRender
export class Map extends React.Component<MapProps, MapComponentState> {

  public render(): JSX.Element {
    return <MapGL
      width={this.props.width}
      height={this.props.height}
      latitude={this.props.viewport.latitude}
      longitude={this.props.viewport.longitude}
      zoom={this.props.viewport.zoom}
      startDragLngLat={this.props.viewport.startDragLngLat}
      isDragging={this.props.viewport.isDragging}
      mapStyle={mapStyle}
      onChangeViewport={this.props.onChangeViewport}>
       {this.props.locations == null ? null :
         <HeatmapOverlay
           width={this.props.width}
           height={this.props.height}
           latitude={this.props.viewport.latitude}
           longitude={this.props.viewport.longitude}
           zoom={this.props.viewport.zoom}
           mapStyle={mapStyle}
           locations={this.props.locations}
       />}
     </MapGL>;
  }
}
