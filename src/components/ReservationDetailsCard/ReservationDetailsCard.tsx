import React from "react";
import { isNil } from "ramda";
import { format } from "date-fns";
import * as Icon from "react-feather";
import { Reservation } from "../../graphql/__generated__/graphql";
import { formatTripStatus } from "../../utils";

type PickedReservation = Pick<
  Reservation,
  "id" | "approxDistance" | "fare" | "pickupTitle"
> & {
  tripData: Pick<Reservation["tripData"], "id" | "startTime">;
  userInfo: Pick<
    Reservation["userInfo"],
    "avgRating" | "firstName" | "lastName" | "photoUrl"
  >;
};

interface IProps {
  data: PickedReservation;
}

const StatusIcon = {
  Past: <Icon.Clock color={"#3a3b33"} />,
  Starting: <Icon.Activity color={"#0d9d57"} />,
  Upcoming: <Icon.Calendar color={"#7e720a"} />,
};

export const ReservationDetailsCard = ({ data }: IProps) => {
  if (isNil(data)) return null;
  return (
    <div className=" flex flex-col bg-secondary  drop-shadow-xl shadow-white-400 mb-2 rounded-lg px-2 py-3">
      <div className={"flex w-full flex-col text-white"}>
        <div className={"flex items-center"}>
          <img
            className={"w-[2.5rem] h-[2.5rem] rounded-md object-cover"}
            src={data.userInfo?.photoUrl ?? "https://robohash.org/image"}
            alt="user"
          />
          <div className={"flex items-center flex-1 justify-between"}>
            <span className={"ml-3"}>
              <p className={"font-nunito text-white text-base font-medium"}>
                {data.userInfo.firstName + " " + data.userInfo.lastName}
              </p>
              <p className={"text-darkWhite text-regular text-xs font-nunito"}>
                {format(new Date(data.tripData.startTime), "d MMMM hh:mm aaa")}
              </p>
            </span>
            {StatusIcon[formatTripStatus(data.tripData.startTime)]}
          </div>
        </div>

        <div className={"flex flex-col w-full  mt-1"}>
          <div className={"flex flex-1 justify-around text-center mt-4"}>
            <span>
              <p
                className={
                  "text-yellow-400 font-nunito text-base font-medium leading-normal"
                }
              >
                {data.userInfo.avgRating}
              </p>
              <p className={"text-darkWhite text-regular text-xs font-nunito"}>
                Rating
              </p>
            </span>

            <span>
              <p
                className={
                  "text-white font-nunito text-base font-medium leading-normal"
                }
              >
                {data.approxDistance} km
              </p>
              <p
                className={
                  "text-darkWhite text-right text-regular text-xs font-nunito"
                }
              >
                Distance
              </p>
            </span>

            <span>
              <p
                className={
                  "text-white font-nunito text-base font-medium leading-normal"
                }
              >
                <sup>Rs</sup> {data?.fare ?? ""}
              </p>
              <p
                className={
                  "text-darkWhite text-right text-regular text-xs font-nunito"
                }
              >
                Total fare
              </p>
            </span>
            <span>
              <p
                className={
                  "text-white font-nunito text-base font-medium leading-normal"
                }
              >
                {formatTripStatus(data.tripData.startTime)}
              </p>
              <p className={"text-darkWhite text-regular text-xs font-nunito"}>
                Status
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailsCard;
