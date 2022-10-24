import React from "react";
import { Cash, End, Start, Clock, Info, SeatIcon, Milestone } from "../assets";
import * as Icon from "react-feather";
import { useHistory } from "react-router-dom";

export const UserList = () => {
  let history = useHistory();
  console.log(history);
  function handleClick() {
    history.push("/trip");
  }

  return (
    <div
      className={"absolute left-[1%] top-[2%] w-[28vw] h-[96%] flex flex-col"}
    >
      <div
        className={
          "w-full h-full overflow-auto scroll-smooth flex flex-col p-3 gap-3  bg-primary rounded-lg"
        }
      >
        {[1, 4, 4, 6, 2].map((item, index) => {
          return (
            <div
              key={index}
              className={
                "flex w-full flex-col text-white p-4 bg-secondary rounded-lg"
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

                  <div className={"separator"}></div>
                  <img
                    alt={"ico"}
                    src={Milestone}
                    className={"w-[0.8rem] h-[0.8rem] object-fill"}
                  />
                </div>

                <div
                  className={"flex flex-col divide-y divide-gray-700 w-full"}
                >
                  <div className={"flex flex-col py-2 w-full"}>
                    <p
                      className={
                        "text-darkWhite text-regular text-xs font-nunito"
                      }
                    >
                      From
                    </p>
                    <p
                      className={
                        "text-white mt-1 text-regular text-md font-medium font-nunito"
                      }
                    >
                      345 Spear St, San Francisco
                    </p>
                  </div>
                  <div className={"felx flex-col py-2 w-full"}>
                    <p
                      className={
                        "text-darkWhite text-regular text-xs font-nunito"
                      }
                    >
                      End
                    </p>
                    <p
                      className={
                        "text-white mt-1 text-regular text-md font-medium font-nunito"
                      }
                    >
                      345 Spear St, San Francisco
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={
                  "flex w-full w-100 items-center justify-evenly gap-2 mt-7"
                }
              >
                <div className={"flex flex-col items-center gap-2"}>
                  <div
                    className={
                      "rounded-full bg-infoBG p-3 flex items-center justify-center"
                    }
                  >
                    <img
                      src={Cash}
                      alt="cash"
                      className={`w-[1.7rem] h-auto object-fill`}
                    />
                  </div>

                  <p className={"text-normal text-xs font-nunito font-regular"}>
                    Cash
                  </p>
                </div>

                <div className={"flex flex-col items-center gap-2"}>
                  <div
                    className={
                      "rounded-full bg-infoBG p-3 flex items-center justify-center"
                    }
                  >
                    <img
                      src={Clock}
                      alt="cash"
                      className={`w-[1.7rem] h-auto object-fill`}
                    />
                  </div>

                  <p className={"text-normal text-xs font-nunito font-regular"}>
                    9:50 AM
                  </p>
                </div>

                <div className={"flex flex-col items-center gap-2"}>
                  <div
                    className={
                      "rounded-full bg-infoBG p-3 flex items-center justify-center"
                    }
                  >
                    <img
                      src={SeatIcon}
                      alt="cash"
                      className={`w-[1.7rem] h-auto object-fill`}
                    />
                  </div>

                  <p className={"text-normal text-xs font-nunito font-regular"}>
                    2 Person
                  </p>
                </div>

                <div className={"flex flex-col items-center gap-2"}>
                  <div
                    className={
                      "rounded-full bg-infoBG p-3 flex items-center justify-center"
                    }
                  >
                    <img
                      src={Info}
                      alt="cash"
                      className={`w-[1.7rem] h-auto object-fill`}
                    />
                  </div>

                  <p className={"text-normal text-xs font-nunito font-regular"}>
                    Learn more
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
