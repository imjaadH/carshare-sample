import React from "react";

export const TripInfoLoadingView = () => {
  return (
    <div
      className={
        "w-full flex-1 mt-2 overflow-auto flex flex-col gap-3 bg-secondary rounded-lg"
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
        <div className="flex gap-4 items-center border-b border-slate-800 mx-1">
          <div className={"flex flex-col divide-y divide-gray-700 w-full "}>
            <div className={"flex flex-col py-2 w-full"}>
              <div
                className={"w-[70%] h-3 bg-[#24262a] rounded-lg animate-pulse"}
              />
              <div
                className={
                  "w-[50%] h-3 bg-[#24262a] rounded-lg animate-pulse mt-2"
                }
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col border-b border-slate-800 mx-1 p-2">
          <div>
            <ul className={"mt-2"}>
              {[1, 2, 4, 5].map((item) => {
                return (
                  <li className={"flex mb-3 list-item"}>
                    <div className={"flex flex-row justify-start"}>
                      <div
                        className={
                          "animate-pulse bg-[#24262a] w-[2rem] h-[2rem] rounded-lg object-cover"
                        }
                      />
                      <div className={"flex w-full items-start"}>
                        <div className={"flex flex-col ml-3 w-full"}>
                          <div
                            className={
                              "w-[70%] h-3 bg-[#24262a] rounded-lg animate-pulse"
                            }
                          />
                          <div
                            className={
                              "w-[40%] h-3 bg-[#24262a] rounded animate-pulse mt-1"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripInfoLoadingView;
