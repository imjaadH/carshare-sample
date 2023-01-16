import React, { useCallback, useContext, useEffect, useState } from "react";
import { GeoJSONSource, MarkerDragEvent, useMap } from "react-map-gl";
import { useHistory } from "react-router";
import { ApolloError, useMutation } from "@apollo/client";
import { equals, isNil } from "ramda";
import * as Icon from "react-feather";
import { Marker } from "mapbox-gl";
import { Id, toast } from "react-toastify";
import axios from "axios";

// Components
import { AppContext } from "../context";
import { tempData } from "../components/tempData";
import { UserInfoCard } from "../components";

// Utils
import {
  addLocationOffset,
  createMarkerIcon,
  getLineDistance,
  getPointsCenter,
  reverseGeocode,
  useNavQuery,
} from "../utils";

// Assets
import { Place, Wallet } from "../assets";

// GraphQL
import { CREATE_RESERVATION } from "../graphql/mutations.graphql";
import { Status } from "../graphql/__generated__/graphql";

let start: Marker | null = null;
let destination: Marker | null = null;

export const BookTrip = () => {
  const query = useNavQuery();
  let history = useHistory();
  const toastId = React.useRef<Id | undefined>();

  const [createReservation, { data, loading, error }] = useMutation(
    CREATE_RESERVATION,
    {
      onError: (e) => handleApolloError(e),
    }
  );
  const { state, addPoint } = useContext(AppContext);
  let [endPoint, setEndPoint] = useState<MarkerPoint>({
    title: "select on map",
    coords: { lat: 0, lng: 0 },
  });
  let [startPoint, setStartPoint] = useState<MarkerPoint>({
    title: "select on map",
    coords: { lat: 0, lng: 0 },
  });
  let [tripData, setTripData] = useState({
    fare: 0,
    distance: 0, //in Km
  });
  const { baseMap } = useMap();

  useEffect(() => {
    return () => {
      start?.remove();
      destination?.remove();
      baseMap?.getMap().removeLayer("route-line");
      baseMap?.getMap().removeSource("route-line");
      start = null;
      destination = null;
    };
  }, [baseMap]);

  useEffect(() => {
    if (!isNil(start) && !isNil(destination)) {
      void getRouteLineData([
        [startPoint.coords?.lng, startPoint.coords?.lat],
        [endPoint.coords?.lng, endPoint.coords?.lat],
      ]);
    }
  }, [startPoint.coords, endPoint.coords]);

  const addMarkerPoint = async (type: string) => {
    if (canAddMarker(type)) return;

    const point = getPointsCenter(
      state.markers.filter((item: StateMarker) => item.type === "point")
    );

    let { lat, lng } = point;
    if (equals(type, "end")) {
      const offset = addLocationOffset({
        lat: point?.lat,
        lng: point?.lng,
      });
      lat = offset?.oLat;
      lng = offset?.oLng;
    }

    let mapInstance = baseMap?.getMap();
    let elem = createMarkerIcon(type);
    const address = await reverseGeocode({ lat, lng });

    if (equals(type, "start")) {
      start = new Marker(elem, {
        draggable: true,
      })
        .setLngLat([lng, lat])
        .setOffset([0, -5]);
      mapInstance && start.addTo(mapInstance);
      setStartPoint({ title: address, coords: point });
      start.on("dragend", (e) => onMarkerDragEnd(e as MarkerDragEvent, type));
    } else {
      destination = new Marker(elem, {
        draggable: true,
      }).setLngLat([lng, lat]);
      mapInstance && destination.addTo(mapInstance);
      setEndPoint({ title: address, coords: { lat, lng } });
      destination.on("dragend", (e) =>
        onMarkerDragEnd(e as MarkerDragEvent, type)
      );
    }
  };

  const onMarkerDragEnd = useCallback(
    async (event: MarkerDragEvent, key: string) => {
      const point = event.target.getLngLat();

      const address = await reverseGeocode(point);
      if (equals(key, "start"))
        setStartPoint({ title: address, coords: point });
      else setEndPoint({ title: address, coords: point });
    },
    []
  );

  const getRouteLineData = async (coords: Array<[number, number]>) => {
    if (coords.length) {
      let startCoords = coords[0];
      let endCoords = coords[1];
      const endpoint = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?access_token=${process.env.REACT_APP_MAP_KEY}&geometries=geojson&overview=full`;

      try {
        const response = await axios.get(endpoint);
        if (response.data.routes?.length) {
          let geometry = response.data.routes[0]?.geometry;
          const distance = getLineDistance(geometry?.coordinates);
          setTripData((prevState) => ({
            ...prevState,
            distance: Number(distance.toFixed(1)),
            fare: Number(distance.toFixed(1)) * 40,
          }));
          const source = baseMap
            ?.getMap()
            .getSource("route-line") as GeoJSONSource;
          source?.setData({
            ...tempData,
            features: [
              {
                ...tempData.features[0],
                geometry: {
                  ...tempData.features[0].geometry,
                  coordinates: geometry.coordinates,
                },
              },
            ],
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const canAddMarker = (type: string) => {
    if (equals(type, "start")) return Boolean(start);
    return Boolean(destination);
  };

  const notify = () =>
    (toastId.current = toast.loading("Creating reservation. please wait...", {
      position: toast.POSITION.BOTTOM_CENTER,
      type: toast.TYPE.INFO,
      theme: "dark",

      autoClose: false,
    }));
  function handleApolloError({ graphQLErrors, networkError }: ApolloError) {
    if (graphQLErrors) {
      const { message, locations, path } = graphQLErrors[0];
      if (toastId.current)
        toast.update(toastId.current, {
          render: `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: 4000,
        });
    }
  }
  function handleSubmit() {
    notify();
    createReservation({
      variables: {
        createReservationData: {
          approxDistance: String(tripData.distance),
          fare: tripData.fare,
          startAddress: `${startPoint.coords.lat}, ${startPoint.coords.lng}`,
          endAddress: `${endPoint.coords.lat}, ${endPoint.coords.lng}`,
          pickupTitle: startPoint.title,
          status: Status.Pending,
          tripId: query.get("id") ?? "",
          userId: state.user,
        },
      },
    }).then((res) => {
      if (!isNil(res.data)) {
        history.push("/");
        toastId.current &&
          toast.update(toastId.current, {
            render: "Reservation was created successfully",
            type: toast.TYPE.SUCCESS,
            isLoading: false,
            autoClose: 4000,
          });
      }
    });
  }
  return (
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

      <UserInfoCard bookingEnabled={false} tripId={query.get("id") ?? ""} />
      <div
        className={
          "w-full flex-1 mt-2 overflow-auto scroll-smooth flex flex-col gap-3 bg-secondary rounded-lg"
        }
      >
        <div className={"flex bg-primary items-center justify-center py-1"}>
          <p
            className={
              "text-normal font-nunito text-xs font-regular leading-normal"
            }
          >
            New Booking
          </p>
        </div>

        <div className={"flex flex-col"}>
          <div className="flex flex-col  mx-1 ">
            <div className=" flex flex-col bg-secondary p-2 drop-shadow-xl shadow-white-400">
              <div className="flex gap-4 items-center">
                <div
                  className={
                    "journey-container transition-opacity relative flex flex-col items-center justify-between"
                  }
                >
                  <img
                    alt={"ico"}
                    src={Place}
                    className={"w-[0.8rem] h-[0.8rem] object-fill z-2"}
                  />

                  <div className={"separator"}></div>
                  <img
                    alt={"ico"}
                    src={Place}
                    className={"w-[0.8rem] h-[0.8rem] object-fill"}
                  />
                </div>

                <div
                  className={"flex flex-col divide-y divide-zinc-700 w-full "}
                >
                  <button
                    type="button"
                    className={"flex flex-col py-2 w-full"}
                    onClick={() => addMarkerPoint("start")}
                  >
                    <p
                      className={
                        "text-darkWhite text-regular text-xs font-nunito"
                      }
                    >
                      start
                    </p>

                    <p
                      className={
                        "text-white mt-1 truncate text-regular text-sm font-medium font-nunito"
                      }
                    >
                      {startPoint.title}
                    </p>
                  </button>

                  <button
                    type="button"
                    className={"flex flex-col py-2 w-full"}
                    onClick={() => addMarkerPoint("end")}
                  >
                    <p
                      className={
                        "text-darkWhite text-wrap overflow-hidden text-regular text-xs font-nunito"
                      }
                    >
                      Drop off
                    </p>
                    <p
                      className={
                        "text-white truncate mt-1 text-regular text-sm font-medium font-nunito"
                      }
                    >
                      {endPoint.title}
                    </p>
                  </button>
                </div>
              </div>

              <div className={"grid grid-cols-3 divide-zinc-700 divide-x py-5"}>
                <span className={"text-center"}>
                  <p
                    className={
                      "text-white tracking-wider font-nunito text-base font-bold leading-normal"
                    }
                  >
                    {tripData.distance ?? "--"} KM
                  </p>
                  <p
                    className={
                      "text-darkWhite text-regular text-xs font-nunito"
                    }
                  >
                    Distance
                  </p>
                </span>

                <span className={"text-center"}>
                  <p
                    className={
                      "text-white font-nunito tracking-wider text-base font-bold leading-normal"
                    }
                  >
                    Rs {tripData.fare ?? "--"}
                  </p>
                  <p
                    className={
                      "text-darkWhite  text-regular text-xs font-nunito"
                    }
                  >
                    Total Fare
                  </p>
                </span>

                <span className={"text-center"}>
                  <p
                    className={
                      "text-white font-nunito tracking-wider text-base font-bold leading-normal"
                    }
                  >
                    1 Seat
                  </p>
                  <p
                    className={
                      "text-darkWhite text-regular text-xs font-nunito"
                    }
                  >
                    Reserved
                  </p>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col border-b border-slate-800 mx-1 mt-3">
            <div className=" flex flex-col bg-secondary p-2 drop-shadow-xl shadow-white-400">
              <span>
                <p
                  className={
                    "text-heading font-nunito text-xs font-bold leading-normal"
                  }
                >
                  PAYMENT
                </p>
              </span>

              <div className={"flex justify-between py-3"}>
                <div className={"flex"}>
                  <div className={"bg-[#2e3131] rounded-lg p-3"}>
                    <img
                      src={Wallet}
                      alt="cash"
                      className={"object-cover w[1.2rem] h-[1.2rem]"}
                    />
                  </div>

                  <div className={"flex flex-col ml-3"}>
                    <p
                      className={
                        "text-white font-nunito text-base font-semibold leading-normal"
                      }
                    >
                      Rs {tripData.fare ?? "--"}
                    </p>
                    <p
                      className={
                        "text-darkWhite text-regular text-xs font-nunito"
                      }
                    >
                      Balance
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={
                    "bg-tealGreen text-secondary font-bold px-3 rounded-lg text-base font-nunito"
                  }
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTrip;
