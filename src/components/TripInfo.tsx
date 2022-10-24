import React from "react";
import * as Icon from "react-feather";
import { Cash, Clock, End, Info, SeatIcon, Start } from "../assets";
import { useHistory } from "react-router";
import { BookTrip, RouteDetails } from "./index";

export const TripInfo = () => {
  let history = useHistory();
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

      <div
        className={
          "w-full h-auto overflow-auto scroll-smooth flex flex-col p-4 gap-3  bg-primary rounded-lg"
        }
      >
        <div className={"flex justify-between align-start"}>
          <div className={"flex gap-3"}>
            <img
              className={"w-[3rem] h-[3rem] rounded-md object-cover"}
              src="https://variety.com/wp-content/uploads/2020/06/unnamed-1-2-e1593560403821.jpg"
              alt="weeknd"
            />

            <div className={"flex flex-col"}>
              <p
                className={
                  "text-normal font-nunito text-lg font-medium leading-tight"
                }
              >
                Adam West
              </p>
              <p
                className={
                  "text-darkWhite font-nunito text-xs font-regular leading-tight"
                }
              >
                Rs 50/ km
              </p>
            </div>
          </div>

          <span>
            <button
              onClick={() => history.push("/new-booking")}
              className={
                "bg-infoBG rounded-md px-2 py-1 flex items-evenly items-center gap-2"
              }
            >
              <Icon.Check color={"white"} size={"0.8rem"} />
              <p className={"text-normal text-xs font-nunito"}>Book Now</p>
            </button>
          </span>
        </div>

        <div className={"grid grid-row grid-cols-4 gap-3 mt-2"}>
          <div className={"flex flex-col justify-start"}>
            <p
              className={
                "text-darkWhite font-nunito text-xs font-regular leading-normal"
              }
            >
              ID number
            </p>
            <p className={"text-white text-sm font-nunito leading-normal"}>
              17484-A4
            </p>
          </div>

          <div className={"flex flex-col justify-start"}>
            <p
              className={
                "text-darkWhite font-nunito text-xs font-regular leading-normal"
              }
            >
              Vehicle
            </p>
            <p
              className={
                "text-white text-sm font-nunito leading-normal truncate overflow-hidden"
              }
            >
              Honda City 2005
            </p>
          </div>

          <div className={"flex flex-col justify-start"}>
            <p
              className={
                "text-darkWhite font-nunito text-xs font-regular leading-normal"
              }
            >
              Insurance
            </p>
            <p className={"text-white text-sm font-nunito leading-normal"}>
              VR32423D
            </p>
          </div>
          <div
            className={
              "flex flex-col justify-center text-center border-l border-gray-700 "
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
              4.5
            </p>
          </div>
        </div>
      </div>

      <RouteDetails />
    </div>
  );
};

export default TripInfo;
