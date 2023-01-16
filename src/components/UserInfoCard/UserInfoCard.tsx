import React from "react";
import { useQuery } from "@apollo/client";
import * as Icon from "react-feather";
import { isEmpty } from "ramda";

//Misc
import { GET_TRIP_DETAILS } from "../../graphql/queries.graphql";
import { UserCardLoadingView } from "../index";

interface IProps {
  onBookRoute?: () => void;
  bookingEnabled: boolean;
  tripId: string;
}

export const UserInfoCard = ({
  tripId,
  bookingEnabled = false,
  onBookRoute,
}: IProps) => {
  const { loading, data, error } = useQuery(GET_TRIP_DETAILS, {
    fetchPolicy: "no-cache",
    variables: {
      getTripDetailsId: tripId,
    },
  });
  if (loading) return <UserCardLoadingView />;
  if (data?.getTripDetails.user && !isEmpty(data.getTripDetails.user)) {
    return (
      <div
        className={
          "w-full h-auto overflow-auto scroll-smooth flex flex-col p-4 gap-3  bg-primary rounded-lg"
        }
      >
        <div className={"flex justify-between align-start"}>
          <div className={"flex gap-3"}>
            <img
              className={"w-[3rem] h-[3rem] rounded-md object-cover"}
              src={
                data.getTripDetails?.user?.photoUrl ??
                "https://robohash.org/image"
              }
              alt="user"
            />

            <div className={"flex flex-col"}>
              <p
                className={
                  "text-normal font-nunito text-lg font-medium leading-tight"
                }
              >
                {data.getTripDetails.user.firstName +
                  " " +
                  data.getTripDetails.user.lastName}
              </p>
              <p
                className={
                  "text-darkWhite font-nunito text-xs font-regular leading-tight"
                }
              >
                Rs {data.getTripDetails.user.hourlyRate}/ km
              </p>
            </div>
          </div>

          {bookingEnabled && (data.getTripDetails?.seatLimit ?? 0) > 0 && (
            <span>
              <button
                onClick={onBookRoute}
                className={
                  "bg-infoBG rounded-md px-2 py-1 flex items-evenly items-center gap-2"
                }
              >
                <Icon.Check color={"white"} size={"0.8rem"} />
                <p className={"text-normal text-xs font-nunito"}>Book Now</p>
              </button>
            </span>
          )}
        </div>

        <div className={"grid grid-row grid-cols-6 gap-2 mt-2"}>
          <div className={"flex flex-col justify-start"}>
            <p
              className={
                "text-darkWhite font-nunito text-xs font-regular leading-normal"
              }
            >
              Trips
            </p>
            <p className={"text-white text-sm font-nunito leading-normal"}>
              {data.getTripDetails.user.tripsTaken}
            </p>
          </div>

          <div
            className={
              "flex pl-4 flex-col justify-start border-l border-gray-700"
            }
          >
            <p
              className={
                "text-darkWhite font-nunito text-xs font-regular leading-normal"
              }
            >
              Seats
            </p>
            <p
              className={
                "text-white text-sm font-nunito leading-normal truncate overflow-hidden"
              }
            >
              {data.getTripDetails.seatLimit}
            </p>
          </div>

          <div
            className={
              "flex pl-4 flex-col col-span-3  border-l border-gray-700 col-span-auto "
            }
          >
            <p
              className={
                "text-darkWhite font-nunito text-xs font-regular leading-normal"
              }
            >
              Contact
            </p>
            <p
              className={
                "text-white text-sm font-nunito leading-normal truncate overflow-hidden"
              }
            >
              {data.getTripDetails.user.contact}
            </p>
          </div>

          <div
            className={
              "flex flex-col justify-center text-center border-l border-gray-700"
            }
          >
            <p
              className={
                "text-darkWhite font-nunito text-xs font-regular leading-normal"
              }
            >
              Rating
            </p>
            <p className={"text-white text-sm font-nunito leading-normal"}>
              {data.getTripDetails.user.avgRating}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default UserInfoCard;
