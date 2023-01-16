import React, { useEffect } from "react";
import { format } from "date-fns";
import * as Icon from "react-feather";
import { useQuery } from "@apollo/client";

// Misc
import { GET_TRIP_RESERVATIONS } from "../graphql/queries.graphql";
import { TripInfoLoadingView } from "../components";
import { End, Start } from "../assets";

export const RouteDetails = ({
  tripId,
  start,
  end,
  time,
}: {
  tripId: string;
  start: string;
  end: string;
  time: string;
}) => {
  const { loading, data, refetch } = useQuery(GET_TRIP_RESERVATIONS, {
    fetchPolicy: "no-cache",
    variables: {
      tripId,
      take: 10,
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return <TripInfoLoadingView />;
  if (data?.getTripReservations) {
    return (
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
            Trip Information
          </p>
        </div>

        <div className={"flex flex-col"}>
          <span className={"mx-3 my-1"}>
            <p
              className={
                "text-heading font-nunito uppercase text-xs font-bold leading-normal"
              }
            >
              {format(new Date(time), "EEEE, do hh:mm aaa")}
            </p>
          </span>
          <div className="flex items-center border-b border-slate-800 mx-1">
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

            <div
              className={"flex flex-col divide-y divide-gray-700 w-full ml-1 "}
            >
              <div className={"flex flex-col py-2 w-full"}>
                <p
                  className={"text-darkWhite text-regular text-xs font-nunito"}
                >
                  From
                </p>
                <p
                  className={
                    "text-white text-regular text-sm font-medium font-nunito"
                  }
                >
                  {start}
                </p>
              </div>
              <div className={"flex flex-col py-2 w-full"}>
                <p
                  className={"text-darkWhite text-regular text-xs font-nunito"}
                >
                  To
                </p>
                <p
                  className={
                    "text-white text-regular text-sm font-medium font-nunito"
                  }
                >
                  {end}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col border-b border-slate-800 mx-1 p-2">
            <div className="flex w-full items-center justify-between">
              <span>
                <p
                  className={
                    "text-darkWhite font-nunito text-sm font-regular leading-normal"
                  }
                >
                  Recent Bookings{" "}
                </p>
              </span>

              <span>
                <button
                  onClick={() => refetch()}
                  className={
                    "bg-uiGray rounded-md px-2 py-1 flex items-evenly items-center gap-2"
                  }
                >
                  <Icon.RefreshCw color={"white"} size={"0.7rem"} />
                  <p className={"text-normal text-xs font-nunito"}>Refresh</p>
                </button>
              </span>
            </div>

            {data.getTripReservations.length ? (
              <div className="stop-list">
                <ul className={"mt-2"}>
                  {data.getTripReservations.map((item) => {
                    return (
                      <li className={"mb-3 list-item pl-10"}>
                        <div className={"flex items-start"}>
                          <div className={"flex flex-col overflow-hidden"}>
                            <p
                              className={
                                "text-white font-nunito text-sm font-regular leading-normal"
                              }
                            >
                              {item?.userInfo.firstName +
                                " " +
                                item?.userInfo.lastName}
                            </p>
                            <p
                              className={
                                "text-darkWhite font-nunito text-xs font-regular text-wrap overflow-hidden"
                              }
                            >
                              from {item?.pickupTitle}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div>
                <p className={"font-nunito text-xs mt-3 text-darkWhite"}>
                  no bookings found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default RouteDetails;
