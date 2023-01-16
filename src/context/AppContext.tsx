import React, { useReducer, useEffect } from "react";
import { equals, isNil } from "ramda";
import jwt_decode from "jwt-decode";
import { getMapCenter } from "../utils";

export const AppContext = React.createContext<any>(null);

const initialState = {
  mapCenter: {
    longitude: 0,
    latitude: 0,
  },
  markers: [],
  authenticated: false,
  user: null,
};

const reducer = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case actionTypes.UPDATE_AUTH_STATE:
      const decodedValue = jwt_decode<{ data: string }>(action.payload.user);
      return { ...state, authenticated: true, user: decodedValue.data };

    case actionTypes.SET_MAP_CENTER:
      console.log(action.payload);
      return {
        ...state,
        mapCenter: {
          latitude: action.payload[0],
          longitude: action.payload[1],
          zoom: 12,
        },
      };

    case actionTypes.ADD_NEW_MARKER:
      return { ...state, markers: action.payload };

    case actionTypes.RESET_MARKERS:
      return { ...state, markers: [] };

    case actionTypes.ADD_POINT:
      return { ...state, markers: [...state.markers, ...action.payload] };

    case actionTypes.UPDATE_POINT:
      let { id, data } = action.payload;

      const tmp = state.markers.map(
        (point: { key: string; lat: number; lng: number; type: string }) => {
          return point.key === id
            ? { ...point, lat: data.lat, lng: data.lng }
            : point;
        }
      );

      return { ...state, markers: tmp };
  }
};

const actionTypes = {
  SET_MAP_CENTER: "SET_MAP_CENTER",
  ADD_NEW_MARKER: "ADD_NEW_MARKER",
  RESET_MARKERS: "RESET_MARKERS",
  REMOVE_MARKER: "REMOVE_MARKER",
  ADD_POINT: "ADD_POINT",
  UPDATE_POINT: "UPDATE_POINT",
  UPDATE_AUTH_STATE: "UPDATE_AUTH_STATE",
};

export const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    checkAuth();
    if (equals(state?.mapCenter.latitude as number, 0)) {
      void getCityCoords();
    }
  }, []);

  const getCityCoords = async () => {
    const mapCenter = await getMapCenter();
    dispatch({ type: actionTypes.SET_MAP_CENTER, payload: mapCenter });
  };

  const checkAuth = () => {
    const token = localStorage.getItem("uat");

    if (!isNil(token)) {
      dispatch({
        type: actionTypes.UPDATE_AUTH_STATE,
        payload: { user: token },
      });
    }
  };
  const value = {
    state,
    updateAuthState: (isAuthenticated: boolean) => {
      dispatch({
        type: actionTypes.UPDATE_AUTH_STATE,
        payload: isAuthenticated,
      });
    },
    setMapCenter: (coords: { latitude: number; longitude: number }) => {
      dispatch({
        type: actionTypes.SET_MAP_CENTER,
        payload: coords,
      });
    },
    addNewMarker: (data: any) => {
      dispatch({
        type: actionTypes.ADD_NEW_MARKER,
        payload: data,
      });
    },
    addPoint: (data: any) => {
      dispatch({
        type: actionTypes.ADD_POINT,
        payload: data,
      });
    },
    updatePoint: (data: { id: string; coords: object }) => {
      dispatch({
        type: actionTypes.UPDATE_POINT,
        payload: data,
      });
    },
    resetMarkers: () => {
      dispatch({
        type: actionTypes.RESET_MARKERS,
        payload: null,
      });
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
