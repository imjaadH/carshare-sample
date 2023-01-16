import axios from "axios";
import * as turf from "@turf/turf";
import { EndMarker, EndPoint, StartPoint } from "../assets";
import * as dateFns from "date-fns";
import { useLocation } from "react-router";
import React from "react";
import { isFuture, isToday } from "date-fns";

export const addLocationOffset = ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) => {
  const R = 6378137;
  const dLat = 1000 / R;
  const dLng = 1000 / (R * Math.cos((3.14 * lat) / 180));
  const oLat = lat + (dLat * 180) / 3.14;
  const oLng = lng + (dLng * 180) / 3.14;
  return { oLat, oLng };
};

export const reverseGeocode = async ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) => {
  try {
    const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=place%2Cpostcode%2Caddress%2Cdistrict%2Clocality%2Cneighborhood%2Cpoi&limit=1&access_token=${process.env.REACT_APP_MAP_KEY}`;
    const response = await axios.get(geoCodeURL);
    return response.data?.features[0].text || " Not found ";
  } catch (e) {
    console.log(e);
    return " Not found ";
  }
};

export const getPointsCenter = (
  coords: [
    {
      lat: number;
      lng: number;
    },
    {
      lat: number;
      lng: number;
    }
  ]
) => {
  const A = coords[0];
  const B = coords[1];
  const lat = (A.lat + B.lat) / 2;
  const lng = (A.lng + B.lng) / 2;

  return {
    lat,
    lng,
  };
};

export const getTurfEnvelope = (coords: [number, number][]) => {
  const from = [coords[0][0], coords[0][1]];
  const to = [coords[1][0], coords[1][1]];

  const features = turf.points([from, to]);
  const center = turf.center(features);
  const distance = turf.distance(turf.point(from), turf.point(to), {
    units: "kilometers",
  });

  return turf.buffer(center, distance / 2, { units: "kilometers" });
};

export const getLineDistance = (points: Array<[number, number]>) => {
  const line = turf.lineString(points);
  return turf.length(line, { units: "kilometers" });
};

export const createMarkerIcon = (type: string) => {
  let el = document.createElement("img");
  el.className = `w-[2.2rem] h-auto object-cover`;
  el.id = type;
  el.src = type === "start" ? StartPoint : EndPoint;

  return el;
};

export const createTextMarkerIcon = (val: string) => {
  let el = document.createElement("img");
  el.className = `w-[2.2rem] h-auto object-cover`;
  el.id = val;
  el.src = EndMarker;

  return el;
};

export const formatCurrentDay = () => {
  const today = new Date();
  const addedHrs = dateFns.addHours(today, 10);
  return dateFns.format(addedHrs, "yyyy-MM-dd'T'HH:mm");
};

//Returns coordinates based on user's city from IP address
export const getMapCenter = async () => {
  try {
    const response = await axios.get(
      `https://ipinfo.io/json?token=cf3c3559b2f8bc`
    );
    const location = response.data?.loc;
    return location.split(",");
  } catch (e) {
    return [37.092, 95.7129];
  }
};

export function useNavQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function formatTripStatus(date: string) {
  let now = new Date();
  const cmp = new Date(date);

  if (isFuture(cmp)) return "Upcoming";
  if (dateFns.isBefore(cmp, now)) return "Past";
  if (isToday(cmp)) return "Starting";
  return "Upcoming";
}
