import React, { useCallback, useContext, useEffect, useState } from "react";
import { GeoJSONSource, LngLat, MarkerDragEvent, useMap } from "react-map-gl";
import { ApolloError, useMutation } from "@apollo/client";
import { Id, toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Marker, Popup } from "mapbox-gl";
import { equals, isNil } from "ramda";
import { useHistory } from "react-router";
import { format, toDate } from "date-fns";
import * as Icon from "react-feather";
import axios from "axios";

// Utils
import {
  addLocationOffset,
  createMarkerIcon,
  formatCurrentDay,
  getLineDistance,
  reverseGeocode,
} from "../utils";

// GraphQL
import { CREATE_TRIP } from "../graphql/mutations.graphql";
import { Status } from "../graphql/__generated__/graphql";

// Misc
import { End, Start } from "../assets";
import { AppContext } from "../context";
import { tempData } from "../components/tempData";

let start: Marker | null = null;
let destination: Marker | null = null;
let dataPopup: Popup | undefined = new Popup({
  offset: 25,
  closeButton: false,
});

export const CreateJourney = () => {
  let history = useHistory();
  const { state } = useContext(AppContext);
  const toastId = React.useRef<Id | undefined>();
  const [createNewTrip, { data, loading, error }] = useMutation(CREATE_TRIP, {
    onError: (e) => handleApolloError(e),
  });
  let [endPoint, setEndPoint] = useState<MarkerPoint>({
    title: "select on map",
    coords: { lat: 0, lng: 0 },
  });
  let [startPoint, setStartPoint] = useState<MarkerPoint>({
    title: "select on map",
    coords: { lat: 0, lng: 0 },
  });
  let [tripData, setTripData] = useState({
    seats: 3,
    startTime: formatCurrentDay(),
    distance: 0, // in Km
  });
  const { baseMap } = useMap();
  let mapInstance = baseMap?.getMap();
  useEffect(() => {
    if (!isNil(start) && !isNil(destination)) {
      getRouteLineData([
        [startPoint.coords?.lng, startPoint.coords?.lat],
        [endPoint.coords?.lng, endPoint.coords?.lat],
      ]);
    }
  }, [startPoint.coords, endPoint.coords]);

  useEffect(() => {
    return () => {
      start?.remove();
      destination?.remove();
      baseMap?.getMap().removeLayer("route-line");
      baseMap?.getMap().removeSource("route-line");
    };
  }, [baseMap]);

  const notify = () =>
    (toastId.current = toast.loading("Creating trip. please wait...", {
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
          dataPopup = dataPopup?.setHTML(
            `<span class="rounded-lg border-1 border-zinc-500"><p class="text-secondary font-semibold font-nunito">${Number(
              distance.toFixed()
            )} km</p></p></span>`
          );
          destination && destination.setPopup(dataPopup).togglePopup();
          setTripData((prevState) => ({
            ...prevState,
            distance: Number(distance.toFixed(1)),
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

  function updateTripData(e: React.SyntheticEvent<any>) {
    let element = e.currentTarget;
    let date = toDate(new Date(element.value));
    setTripData((prevState) => ({
      ...prevState,
      [element.name]:
        element.name === "seats"
          ? Number(element.value)
          : format(date, "yyyy-MM-dd'T'HH:mm"),
    }));
  }

  const addMarkerPoint = async (type: string) => {
    const point = baseMap?.getCenter() as LngLat;

    let { lat, lng } = point;
    if (equals(type, "end")) {
      const offset = addLocationOffset({
        lat: point?.lat,
        lng: point?.lng,
      });
      lat = offset?.oLat;
      lng = offset?.oLng;
    }

    let elem = createMarkerIcon(type);
    const address = await reverseGeocode({ lat, lng });

    if (equals(type, "start")) {
      start = new Marker(elem, {
        draggable: true,
      }).setLngLat([lng, lat]);
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

  const createTrip = () => {
    if (startPoint.coords.lat !== 0 && endPoint.coords.lat !== 0) {
      notify();
      createNewTrip({
        variables: {
          data: {
            startingPoint: `${startPoint.coords.lat}, ${startPoint.coords.lng}`,
            destination: `${endPoint.coords.lat}, ${endPoint.coords.lng}`,
            offeredBy: state.user,
            startAddress: startPoint.title,
            endAddress: endPoint.title,
            seatLimit: tripData.seats,
            startTime: tripData.startTime,
            status: Status.Pending,
          },
        },
      }).then((res) => {
        if (!isNil(res.data)) {
          history.push("/");
          toastId.current &&
            toast.update(toastId.current, {
              render: "Trip was created successfully",
              type: toast.TYPE.SUCCESS,
              isLoading: false,
              autoClose: 4000,
            });
        }
      });
    }
  };

  return (
    <>
      <Helmet>
        <title> Create journey </title>
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

        <div
          className={
            "w-full flex-1 mt-2 overflow-auto scroll-smooth flex flex-col gap-3 bg-secondary rounded-lg"
          }
        >
          <div className={"flex bg-primary items-center justify-center py-2"}>
            <p
              className={
                "text-normal font-nunito text-xs font-regular leading-normal"
              }
            >
              Create New Journey
            </p>
          </div>

          <div className={"flex flex-col"}>
            <div className="flex gap-4 items-center border-b border-slate-800 mx-1">
              <div
                className={
                  "journey-container transition-opacity relative flex flex-col items-center justify-between"
                }
              >
                <img
                  alt={"ico"}
                  src={Start}
                  className={"w-[0.8rem] h-[0.8rem] object-fill z-2"}
                />

                <div className={"separator"} />
                <img
                  alt={"ico"}
                  src={End}
                  className={"w-[0.8rem] h-[0.8rem] object-fill"}
                />
              </div>

              <div className={"flex flex-col divide-y divide-gray-700 w-full "}>
                <button
                  className={"flex flex-col py-2 w-full"}
                  onClick={() => addMarkerPoint("start")}
                >
                  <p
                    className={
                      "text-darkWhite text-regular text-xs font-nunito"
                    }
                  >
                    Where from?
                  </p>
                  <p
                    className={
                      "text-white text-regular text-sm font-medium font-nunito"
                    }
                  >
                    {startPoint.title}
                  </p>
                </button>
                <button
                  className={"flex flex-col py-2 w-full"}
                  onClick={() => addMarkerPoint("end")}
                >
                  <p
                    className={
                      "text-darkWhite text-regular text-xs font-nunito"
                    }
                  >
                    Where are you going to?
                  </p>

                  <p
                    className={
                      "text-white text-regular text-sm font-medium font-nunito"
                    }
                  >
                    {endPoint.title}
                  </p>
                </button>
              </div>
            </div>

            <div className="flex flex-col border-b border-slate-800 mx-1 p-2">
              <span>
                <p
                  className={
                    "text-darkWhite font-nunito text-sm font-regular leading-normal"
                  }
                >
                  Available Seats{" "}
                </p>
              </span>

              <div
                className={
                  "flex flex-1 w-full justify-evenly items-center my-3"
                }
              >
                {[1, 2, 3, 4].map((s) => {
                  return (
                    <button
                      name={"seats"}
                      onClick={updateTripData}
                      value={Number(s)}
                      className={`bg-${
                        tripData.seats === s ? "infoBG" : "uiBlack"
                      } w-[3rem] border-slate-700 border h-[3rem] justify-center items-center p-2 rounded-full`}
                    >
                      <p
                        className={
                          "font-nunito text-white text-base font-semibold"
                        }
                      >
                        {s}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col border-b border-slate-800 mx-1 p-2">
              <span>
                <p
                  className={
                    "text-darkWhite font-nunito text-sm font-regular leading-normal"
                  }
                >
                  Start Time{" "}
                </p>
              </span>

              <div
                className={"flex flex-1 w-full justify-start items-center my-3"}
              >
                <span>
                  <input
                    onChange={updateTripData}
                    placeholder={"select"}
                    type={"datetime-local"}
                    value={tripData.startTime}
                    name={"startTime"}
                    className={
                      "border text-base font-nunito rounded-md border-zinc-500 p-2 bg-secondary text-white"
                    }
                  />
                  <p className={"text-sm font-nunito text-darkWhite mt-1"}>
                    {format(
                      new Date(tripData.startTime),
                      "EEEE, do LLLL 'at' K:mm aaa "
                    )}
                  </p>
                </span>
              </div>
              <span>
                <p className={"text-xs font-poppins text-uiGray mt-1"}>
                  trip status will be closed 20 hours after the start time.
                </p>
              </span>
            </div>

            <div className="flex flex-col border-b border-slate-800 mx-1 p-2">
              <div
                className={"flex flex-1 w-full justify-start items-center my-3"}
              >
                <button
                  onClick={createTrip}
                  disabled={loading}
                  className={
                    "text-white font-nunito text-base font-medium w-[50%] text-center rounded-lg bg-tealGreen py-2 ml-5"
                  }
                >
                  Create Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJourney;
