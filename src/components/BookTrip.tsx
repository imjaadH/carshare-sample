import React from "react";
import { Cash, End, Milestone, Place, Start, Wallet } from "../assets";
import * as Icon from "react-feather";
import { useHistory } from "react-router";

export const BookTrip = () => {
  const updateMarker = (type: string) => {
    return console.log(type);
  };
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
            New Booking
          </p>
        </div>

        <div className={"flex flex-col"}>
          <div className="flex flex-col  mx-1 ">
            <div className=" flex flex-col bg-secondary p-2 drop-shadow-xl shadow-white-400">
              <span>
                <p
                  className={
                    "text-heading font-nunito text-xs font-bold leading-normal"
                  }
                >
                  TODAY, 8:50AM
                </p>
              </span>
              <div className="flex gap-4 items-center">
                <div
                  className={
                    "journey-container transition-opacity relative flex flex-col items-center justify-between"
                  }
                >
                  <img
                    alt={"ico"}
                    src={Place}
                    className={"w-[0.8rem] h-[0.8rem] object-fill z-2"}
                  />

                  <div className={"separator"}></div>
                  <img
                    alt={"ico"}
                    src={Place}
                    className={"w-[0.8rem] h-[0.8rem] object-fill"}
                  />
                </div>

                <div
                  className={"flex flex-col divide-y divide-zinc-700 w-full "}
                >
                  <button
                    className={"flex flex-col py-2 w-full"}
                    onClick={() => updateMarker("start")}
                  >
                    <p
                      className={
                        "text-darkWhite text-regular text-xs font-nunito"
                      }
                    >
                      Pickup
                    </p>
                    <p
                      className={
                        "text-white mt-1 text-regular text-sm font-medium font-nunito"
                      }
                    >
                      select a pickup
                    </p>
                  </button>

                  <button
                    className={"flex flex-col py-2 w-full"}
                    onClick={() => updateMarker("end")}
                  >
                    <p
                      className={
                        "text-darkWhite text-regular text-xs font-nunito"
                      }
                    >
                      Drop off
                    </p>
                    <p
                      className={
                        "text-white mt-1 text-regular text-sm font-medium font-nunito"
                      }
                    >
                      select a drop off location
                    </p>
                  </button>
                </div>
              </div>

              <div className={"grid grid-cols-3 divide-zinc-700 divide-x py-5"}>
                <span className={"text-center"}>
                  <p
                    className={
                      "text-white tracking-wider font-nunito text-base font-bold leading-normal"
                    }
                  >
                    15 KM
                  </p>
                  <p
                    className={
                      "text-darkWhite text-regular text-xs font-nunito"
                    }
                  >
                    Distance
                  </p>
                </span>

                <span className={"text-center"}>
                  <p
                    className={
                      "text-white font-nunito tracking-wider text-base font-bold leading-normal"
                    }
                  >
                    Rs 250
                  </p>
                  <p
                    className={
                      "text-darkWhite  text-regular text-xs font-nunito"
                    }
                  >
                    Total Fare
                  </p>
                </span>

                <span className={"text-center"}>
                  <p
                    className={
                      "text-white font-nunito tracking-wider text-base font-bold leading-normal"
                    }
                  >
                    1 Seat
                  </p>
                  <p
                    className={
                      "text-darkWhite text-regular text-xs font-nunito"
                    }
                  >
                    Reserved
                  </p>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col border-b border-slate-800 mx-1 mt-3">
            <div className=" flex flex-col bg-secondary p-2 drop-shadow-xl shadow-white-400">
              <span>
                <p
                  className={
                    "text-heading font-nunito text-xs font-bold leading-normal"
                  }
                >
                  PAYMENT
                </p>
              </span>

              <div className={"flex justify-between py-3"}>
                <div className={"flex"}>
                  <div className={"bg-[#2e3131] rounded-lg p-3"}>
                    <img
                      src={Wallet}
                      alt="cash"
                      className={"object-cover w[1.2rem] h-[1.2rem]"}
                    />
                  </div>

                  <div className={"flex flex-col ml-3"}>
                    <p
                      className={
                        "text-white font-nunito text-base font-semibold leading-normal"
                      }
                    >
                      Rs 2430.00
                    </p>
                    <p
                      className={
                        "text-darkWhite text-regular text-xs font-nunito"
                      }
                    >
                      Wallet
                    </p>
                  </div>
                </div>

                <button
                  className={
                    "bg-tealGreen text-secondary font-bold px-3 rounded-lg text-base font-nunito"
                  }
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTrip;
