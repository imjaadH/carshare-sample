import React from "react";

export const ReservationLoadingView = () => {
  return (
    <div className=" flex flex-col bg-secondary  drop-shadow-xl shadow-white-400 mb-2 rounded-lg px-2 py-3">
      <div className={"flex w-full flex-col text-white"}>
        <div className={"flex items-center"}>
          <div
            className={
              "w-[2.5rem] h-[2.5rem] rounded-md object-cover bg-[#24262a] animate-pulse"
            }
          />
          <div className={"flex items-center flex-1 justify-between"}>
            <span className={"ml-3"}>
              <div
                className={"bg-[#24262a] animate-pulse h-3 w-16 rounded-lg "}
              />
              <div
                className={
                  "bg-[#24262a] animate-pulse h-2 w-7 rounded-lg mt-2 "
                }
              />
            </span>
          </div>
        </div>

        <div className={"flex flex-col w-full  mt-1"}>
          <div className={"flex flex-1 justify-around text-center mt-4"}>
            <span className={"flex flex-col items-center"}>
              <div
                className={"bg-[#24262a] animate-pulse h-3 w-8 rounded-lg "}
              />
              <div
                className={
                  "bg-[#24262a] animate-pulse mt-1 h-2 w-4 rounded-lg "
                }
              />
            </span>

            <span className={"flex flex-col items-center"}>
              <div
                className={"bg-[#24262a] animate-pulse h-3 w-8 rounded-lg "}
              />
              <div
                className={
                  "bg-[#24262a] animate-pulse mt-1 h-2 w-4 rounded-lg "
                }
              />
            </span>

            <span className={"flex flex-col items-center"}>
              <div
                className={"bg-[#24262a] animate-pulse h-3 w-8 rounded-lg "}
              />
              <div
                className={
                  "bg-[#24262a] animate-pulse mt-1 h-2 w-4 rounded-lg "
                }
              />
            </span>
            <span className={"flex flex-col items-center"}>
              <div
                className={"bg-[#24262a] animate-pulse h-3 w-8 rounded-lg "}
              />
              <div
                className={
                  "bg-[#24262a] animate-pulse mt-1 h-2 w-4 rounded-lg "
                }
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReservationLoadingView;
