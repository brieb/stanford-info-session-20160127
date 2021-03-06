declare interface MapGLViewport {
  latitude: number;
  longitude: number;
  zoom: number;
  startDragLngLat: {
    latitude: number;
    longitude: number;
  };
  isDragging: boolean;
}

declare module "react-map-gl" {
  import {ComponentClass} from "react";

  var MapGL: ComponentClass<any>;
  export = MapGL;
}

declare module "raster-tile-style" {
  var rasterTileStyle: any;
  export = rasterTileStyle;
}

declare module "react-map-gl-heatmap-overlay" {
  import {ComponentClass} from "react";

  var HeatmapOverlay: ComponentClass<any>;
  export = HeatmapOverlay;
}
