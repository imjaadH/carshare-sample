import React from "react";
import { End, Start } from "../assets";
import * as Icon from "react-feather";
export const RouteDetails = () => {
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
        <div className="flex gap-4 items-center border-b border-slate-800 mx-1">
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

            <div className={"separator"}></div>
            <img
              alt={"ico"}
              src={End}
              className={"w-[0.8rem] h-[0.8rem] object-fill"}
            />
          </div>

          <div className={"flex flex-col divide-y divide-gray-700 w-full "}>
            <div className={"flex flex-col py-2 w-full"}>
              <p className={"text-darkWhite text-regular text-xs font-nunito"}>
                Where from?
              </p>
              <p
                className={
                  "text-white text-regular text-sm font-medium font-nunito"
                }
              >
                345 Spear St, San Francisco
              </p>
            </div>
            <div className={"felx flex-col py-2 w-full"}>
              <p className={"text-darkWhite text-regular text-xs font-nunito"}>
                Where to?
              </p>
              <p
                className={
                  "text-white text-regular text-sm font-medium font-nunito"
                }
              >
                345 Spear St, San Francisco
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
                Route Details{" "}
              </p>
            </span>

            <span>
              <button
                className={
                  "bg-uiGray rounded-md px-2 py-1 flex items-evenly items-center gap-2"
                }
              >
                <Icon.RefreshCw color={"white"} size={"0.7rem"} />
                <p className={"text-normal text-xs font-nunito"}>Refresh</p>
              </button>
            </span>
          </div>

          <div className="stop-list">
            <ul className={"mt-2"}>
              {[1, 2, 4, 5, 6, 2, 6, 34].map((item) => {
                return (
                  <li className={"mb-3 list-item pl-10"}>
                    <div className={"flex items-start"}>
                      <div className={"flex flex-col overflow-hidden"}>
                        <p
                          className={
                            "text-white font-nunito text-sm font-regular leading-normal"
                          }
                        >
                          Ahsan Saleem
                        </p>
                        <p
                          className={
                            "text-darkWhite font-nunito text-xs font-regular text-wrap overflow-hidden"
                          }
                        >
                          New southwest murphy street, WSX. handlebar is not
                          same and we are not there
                        </p>
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

export default RouteDetails;
