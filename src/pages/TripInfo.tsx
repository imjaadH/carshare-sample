import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import * as Icon from "react-feather";
import { equals } from "ramda";

// Misc
import { RouteDetails, UserInfoCard } from "../components";
import { useNavQuery } from "../utils";
import { AppContext } from "../context";

interface LocationState {
  start: string;
  end: string;
  time: string;
  coords: string[];
}

export const TripInfo = () => {
  let history = useHistory();
  const { state, addNewMarker } = useContext(AppContext);
  const query = useNavQuery();
  const location = useLocation<LocationState>();

  function verifyPointGeofence() {
    const markers = state.markers;
    if (markers.length) {
      const point = {
        lat: Number(location.state.coords[0].split(",")[0]),
        lng: Number(location.state.coords[0].split(",")[1]),
      };

      const geofenceExists = markers.some(
        (item: { lat: any; lng: any }) =>
          equals(item.lat, point.lat) && equals(item.lng, point.lng)
      );

      if (!geofenceExists) {
        addGeofenceLayer();
      }
    } else {
      addGeofenceLayer();
    }
  }

  const addGeofenceLayer = () => {
    const points = [
      {
        lat: Number(location?.state.coords[0].split(",")[0]),
        lng: Number(location?.state.coords[0].split(",")[1]),
        key: Date.now(),
        type: "point",
      },
      {
        lat: Number(location?.state.coords[1].split(",")[0]),
        lng: Number(location?.state.coords[1].split(",")[1]),
        key: Date.now() + 1,
        type: "point",
      },
    ];
    addNewMarker(points);
  };

  useEffect(() => {
    verifyPointGeofence();
  }, [location.state.coords, addNewMarker]);

  return (
    <>
      <Helmet>
        <title>Trip Details</title>
      </Helmet>
      <div
        className={"absolute left-[1%] top-[2%] w-[28vw] h-[96%] flex flex-col"}
      >
        <span className={"inline-block mb-2"}>
          <button
            type={"button"}
            className={
              "text-white text-sm hover:shadow-md hover:shadow-blue-500/50 shadow-sm shadow-slate-500/50 font-nunito flex " +
              "items-center rounded-lg gap-2 bg-primary py-1 px-4 inline-block"
            }
            onClick={() => history.goBack()}
          >
            <Icon.ChevronLeft color={"white"} size={"1rem"} />
            Go Back
          </button>
        </span>

        <UserInfoCard
          bookingEnabled={true}
          tripId={query.get("id") ?? ""}
          onBookRoute={() => history.push(`/new-booking?id=${query.get("id")}`)}
        />
        <RouteDetails
          tripId={query.get("id") ?? ""}
          start={location.state?.start ?? ""}
          end={location.state?.end ?? ""}
          time={location.state?.time}
        />
      </div>
    </>
  );
};

export default TripInfo;
