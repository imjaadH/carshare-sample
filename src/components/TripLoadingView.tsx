import React from "react";
export const TripLoadingView = ({ count }: { count: number }) => {
  return (
    <div>
      {new Array(count).fill("v").map((item, index) => {
        return (
          <div
            className={
              "border-black flex w-full flex-col text-white p-4 mt-3 bg-secondary rounded-lg"
            }
          >
            <div className="flex gap-4 items-center">
              <div className={"flex text-left flex-col w-full"}>
                <div
                  className={
                    "animate-pulse flex flex-col bg-[#24262a] rounded-lg py-2 w-1/2 h-3"
                  }
                />
                <div
                  className={
                    "animate-pulse flex flex-col bg-[#24262a] mt-4 rounded-lg py-2 w-full h-3"
                  }
                />
              </div>
            </div>

            <div
              className={
                "flex w-full shadow rounded-md py-3 w-100 items-center justify-evenly gap-2 mt-5"
              }
            >
              <div className={"flex flex-col items-center gap-2"}>
                <div
                  className={
                    "animate-pulse rounded-full bg-[#24262a] w-[3rem] h-[3rem] flex items-center justify-center"
                  }
                />

                <div
                  className={
                    "animate-pulse text-normal text-xs font-nunito font-thin h-2"
                  }
                />
              </div>

              <div className={"flex flex-col items-center gap-2"}>
                <div
                  className={
                    "animate-pulse rounded-full bg-[#24262a] w-[3rem] h-[3rem] flex items-center justify-center"
                  }
                />

                <div
                  className={
                    "animate-pulse text-normal text-xs font-nunito font-thin h-2"
                  }
                />
              </div>

              <div className={"flex flex-col items-center gap-2"}>
                <div
                  className={
                    "animate-pulse rounded-full bg-[#24262a] w-[3rem] h-[3rem] flex items-center justify-center"
                  }
                />

                <div
                  className={
                    "animate-pulse text-normal text-xs font-nunito font-thin h-2"
                  }
                />
              </div>

              <div className={"flex flex-col items-center gap-2"}>
                <div
                  className={
                    "animate-pulse rounded-full bg-[#24262a] w-[3rem] h-[3rem] flex items-center justify-center"
                  }
                />

                <div
                  className={
                    "animate-pulse text-normal text-xs font-nunito font-thin h-2"
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TripLoadingView;
