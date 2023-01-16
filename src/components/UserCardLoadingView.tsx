import * as Icon from "react-feather";
import React from "react";

export const UserCardLoadingView = () => {
  return (
    <div
      className={
        "w-full h-auto overflow-auto scroll-smooth flex flex-col p-4 gap-3  bg-primary rounded-lg"
      }
    >
      <div className={"flex justify-between align-start"}>
        <div className={"flex gap-3"}>
          <div
            className={
              "animate-pulse bg-[#24262a] w-[3rem] h-[3rem] rounded-md object-cover"
            }
          />

          <div className={"flex flex-col mt-1"}>
            <div className={"w-16 h-2 bg-[#24262a] rounded animate-pulse"} />
            <div
              className={"w-5 h-2 bg-[#24262a] rounded animate-pulse mt-2"}
            />
          </div>
        </div>
      </div>

      <div className={"grid grid-row grid-cols-4 gap-3 mt-2"}>
        <div className={"flex flex-col justify-start"}>
          <div className={"w-8 bg-[#24262a] rounded h-2 animate-pulse"} />
          <div className={"w-5 bg-[#24262a] rounded mt-1 h-2 animate-pulse"} />
        </div>

        <div className={"col-span-2 flex pl-4 flex-col justify-start"}>
          <div className={"w-12 bg-[#24262a] rounded h-2 animate-pulse"} />
          <div className={"w-5 bg-[#24262a] rounded mt-1 h-2 animate-pulse"} />
        </div>

        <div className={"flex flex-col justify-center text-center pl-3"}>
          <div className={"w-8 bg-[#24262a] rounded h-2 animate-pulse"} />
          <div className={"w-5 bg-[#24262a] rounded mt-1 h-2 animate-pulse"} />
        </div>
      </div>
    </div>
  );
};

export default UserCardLoadingView;
