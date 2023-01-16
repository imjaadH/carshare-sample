import React, { useContext } from "react";
import { Milestone } from "../../assets";
import { format } from "date-fns";
import * as Icon from "react-feather";
import { Trip } from "../../graphql/__generated__/graphql";
import { AppContext } from "../../context";
import { useHistory } from "react-router-dom";

type TripData = Pick<
  Trip,
  | "id"
  | "startingPoint"
  | "destination"
  | "startAddress"
  | "endAddress"
  | "startTime"
  | "offeredBy"
  | "seatLimit"
> & {
  user: Pick<Trip["user"], "contact" | "age" | "avgRating" | "hourlyRate">;
};

interface IProps {
  data: TripData;
}

const TripInfoCard = ({ data }: IProps) => {
  let { addNewMarker } = useContext(AppContext);
  let history = useHistory();

  const addPointsToMap = (data: {
    startingPoint: string;
    destination: string;
  }) => {
    const points = [
      {
        lat: Number(data?.startingPoint.split(",")[0]),
        lng: Number(data?.startingPoint.split(",")[1]),
        key: Date.now(),
        type: "point",
      },
      {
        lat: Number(data?.destination.split(",")[0]),
        lng: Number(data?.destination.split(",")[1]),
        key: Date.now() + 1,
        type: "point",
      },
    ];
    addNewMarker(points);
  };
  return (
    <div
      className={
        "hover:border-2 hover:border-slate-600 border-2 border-black flex w-full flex-col text-white p-4 bg-secondary rounded-lg"
      }
    >
      <div className="flex gap-4 items-center">
        <div
          className={
            "journey-container transition-opacity relative flex flex-col items-center justify-between"
          }
        >
          <img
            alt={"ico"}
            src={Milestone}
            className={"w-[0.8rem] h-[0.8rem] object-fill z-2"}
          />

          <div className={"separator"} />
          <img
            alt={"ico"}
            src={Milestone}
            className={"w-[0.8rem] h-[0.8rem] object-fill"}
          />
        </div>

        <button
          onClick={() =>
            addPointsToMap({
              startingPoint: data?.startingPoint ?? "",
              destination: data?.destination ?? "",
            })
          }
          className={"flex text-left flex-col divide-y divide-gray-700 w-full"}
        >
          <div className={"flex flex-col py-2 w-full"}>
            <p className={"text-tealGreen text-regular text-xs font-nunito"}>
              {format(new Date(data?.startTime), "d MMMM hh:mm aaa")}
            </p>
            <p
              className={
                "text-white mt-1 text-regular text-md font-medium font-nunito"
              }
            >
              {data?.startAddress}
            </p>
          </div>
          <div className={"felx flex-col py-2 w-full"}>
            <p className={"text-darkWhite text-regular text-xs font-nunito"}>
              End
            </p>

            <p
              className={
                "text-white mt-1 text-regular text-md font-medium font-nunito"
              }
            >
              {data?.endAddress}
            </p>
          </div>
        </button>
      </div>

      <div
        className={
          "flex w-full shadow rounded-md py-3 w-100 items-center justify-evenly gap-2 mt-5"
        }
      >
        <div className={"flex flex-col items-center gap-2"}>
          <div
            className={
              "rounded-full bg-[#24262a] w-[3rem] h-[3rem] flex items-center justify-center"
            }
          >
            <p
              className={
                "text-white font-nunito text-lg font-medium tracking-wider"
              }
            >
              {data?.user?.avgRating ?? "0.0"}
            </p>
          </div>

          <p className={"text-normal text-xs font-nunito font-thin"}>Rating</p>
        </div>

        <div className={"flex flex-col items-center gap-2"}>
          <div
            className={
              "rounded-full bg-[#24262a] w-[3rem] h-[3rem] flex items-center justify-center"
            }
          >
            <p
              className={
                "text-white font-nunito text-lg font-semibold tracking-wider"
              }
            >
              {data?.user?.hourlyRate}
            </p>
          </div>

          <p className={"text-normal text-xs font-nunito font-thin"}>
            Fare /km
          </p>
        </div>

        <div className={"flex flex-col items-center gap-2"}>
          <div
            className={
              "rounded-full bg-[#24262a] w-[3rem] h-[3rem] flex items-center justify-center"
            }
          >
            {(data?.seatLimit ?? 0) > 0 ? (
              <p
                className={
                  "text-white font-nunito text-lg font-semibold tracking-wider"
                }
              >
                {data?.seatLimit}
              </p>
            ) : (
              <Icon.X color={"#e84118"} size={"1.5rem"} />
            )}
          </div>

          <p className={"text-normal text-xs font-nunito font-thin"}>Seats</p>
        </div>

        <div className={"flex flex-col items-center gap-2"}>
          <button
            onClick={() =>
              history.push(`/trip-info?id=${data?.id}`, {
                start: data?.startAddress,
                end: data?.endAddress,
                time: data?.startTime,
                coords: [data?.startingPoint, data?.destination],
              })
            }
            className={
              "rounded-full bg-infoBG w-[3rem] h-[3rem] flex items-center justify-center"
            }
          >
            <Icon.ArrowRight color={"white"} size={"1.5rem"} />
          </button>

          <p className={"text-normal text-xs font-nunito font-regular"}>
            Learn more
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripInfoCard;
