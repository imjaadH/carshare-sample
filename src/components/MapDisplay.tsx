import React, {
  useRef,
  useState,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import Map, {
  GeoJSONSource,
  Layer,
  LngLat,
  MapRef,
  Marker,
  MarkerDragEvent,
  Source,
} from "react-map-gl";
import { MapboxPin } from "./index";
import { AppContext } from "../context";
import { tempData } from "./tempData";
import { EndPoint, StartPoint } from "../assets";
import { getTurfEnvelope } from "../utils";

const layerStyle = {
  id: "route-line",
  type: "line" as any,
  source: "route",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-width": 4,
    "line-color": "#6862d7",
  },
};

export const MapDisplay = () => {
  let { state, updatePoint } = useContext(AppContext);
  const mapRef = React.useRef<MapRef | null>(null);

  const [marker, setMarker] = useState(state.mapCenter);
  const [initialState, setInitialState] = useState({
    latitude: 31.5133,
    longitude: 74.1232,
    zoom: 5,
  });
  const [routePath, setRoutePath] = useState([]);
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  useEffect(() => {
    if (state.mapCenter.latitude !== initialState.latitude) {
      mapRef.current?.getMap().setCenter({
        lat: state.mapCenter.latitude,
        lng: state.mapCenter.longitude,
      });
      mapRef.current?.flyTo({
        zoom: 10,
        center: [state.mapCenter.longitude, state.mapCenter.latitude],
      });
    }
  }, [state.mapCenter.latitude]);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent, key: number) => {
    const point = event.lngLat;
    updatePoint({ id: key, data: { lat: point.lat, lng: point.lng } });
  }, []);

  const handleOnLoad = React.useCallback(() => {
    // mapRef.current?.easeTo({
    //   padding: { left: 200, top: 100, bottom: 100, right: 0 },
    // });
    return;
    //
    // mapRef.current?.fitBounds(
    //   [
    //     [-81.724659, 38.92801],
    //     [-81.634879, 38.35995],
    //   ],
    //   { padding: 40, duration: 1000 }
    // );
  }, []);

  useEffect(() => {
    if (state.markers.length) {
      let storeMarkers = state.markers;

      const edgePoints = storeMarkers
        .filter(
          (data: { lat: any; lng: any; key: any; type: string }) =>
            data.type === "point"
        )
        .map((item: StateMarker) => [item.lng, item.lat]);

      mapRef.current?.fitBounds(edgePoints, {
        padding: {
          top: 200,
          bottom: 200,
          right: 200,
          left: 310,
        },
        offset: [50, 29],
        duration: 1500,
        // zoom: 11,
      });
      addFenceLayer(edgePoints);
    }
  }, [state.markers]);

  const addFenceLayer = (data: any) => {
    const result = getTurfEnvelope([data[0], data[1]]);
    const mapInstance = mapRef.current?.getMap();
    const source = mapInstance?.getSource("route-points") as GeoJSONSource;
    source?.setData({
      type: "Feature" as const,
      geometry: {
        type: "Polygon" as const,
        coordinates: [result.geometry.coordinates[0]],
      },
      properties: {},
    });
  };

  const markers = React.useMemo(() => {
    return (
      state.markers.length &&
      state.markers.map(
        (data: { key: number; lat: number; lng: number; type: string }) => {
          return (
            <Marker
              key={data.key}
              longitude={data.lng}
              latitude={data.lat}
              anchor="bottom"
              draggable={data.type !== "point"}
              onDragEnd={(e) => onMarkerDragEnd(e, data.key)}
            >
              {data.type !== "point" ? (
                <img
                  src={data.type === "start" ? StartPoint : EndPoint}
                  alt="start"
                  className={`w-[2.2rem] h-auto object-cover`}
                />
              ) : (
                <MapboxPin size={30} color={"#56d94e"} />
              )}
            </Marker>
          );
        }
      )
    );
  }, [state.markers]);
  return (
    <>
      <Map
        initialViewState={initialState}
        ref={mapRef}
        id={"baseMap"}
        attributionControl={false}
        mapboxAccessToken={process.env.REACT_APP_MAP_KEY}
        minZoom={5}
        pitch={10}
        onLoad={handleOnLoad}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
      >
        {markers}
        <Source id="route-line" type="geojson">
          <Layer {...layerStyle} />
        </Source>

        <Source type="geojson" id="route-points">
          <Layer
            id="route-points"
            type={"fill"}
            source={"route-points"}
            paint={{
              "fill-color": "#476444",
              "fill-opacity": 0.2,
            }}
          />
        </Source>
      </Map>
    </>
  );
};

export default MapDisplay;
