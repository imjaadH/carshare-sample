export const layer = {
  id: "route",
  type: "line",
  source: "mapbox",
  // layout: {
  //   "line-join": "round",
  //   "line-cap": "round",
  // },
  "source-layer": "landuse",
  paint: {
    "line-color": "red",
    "line-width": 8,
  },
  filter: ["==", "class", "park"],
};
export const route1 = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "LineString",
    coordinates: [
      [31.780632, 76.994168],
      [31.781929, 76.993894],
      [31.783204, 76.997771],
      [31.782787, 77.005974],
      [31.786132, 77.007503],
      [31.788978, 77.009612],
      [31.794107, 77.012691],
      [31.796991, 77.017183],
      [31.797196, 77.020515],
      [31.794456, 77.032804],
      [31.794735, 77.050037],
      [31.791744, 77.052444],
      [31.792045, 77.053965],
    ],
  },
};
