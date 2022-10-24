import React from "react";
import Map, {
  Layer,
  NavigationControl,
  ScaleControl,
  Source,
} from "react-map-gl";
import { MAPBOX_TOKEN } from "../constants";
export const MapDisplay = () => {
  return (
    <Map
      attributionControl={false}
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 12,
      }}
      minZoom={8}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/dark-v9"
    ></Map>
  );
};

export default MapDisplay;
