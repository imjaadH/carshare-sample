import React, { useContext } from "react";
import * as Icon from "react-feather";
import { useHistory } from "react-router";
import { useQuery } from "@apollo/client";
import { isNil } from "ramda";

// Components
import { ReservationDetailsCard, ReservationLoadingView } from "../components";
import { GET_USER_RESERVATIONS } from "../graphql/queries.graphql";
import { AppContext } from "../context";

export const BookingsList = () => {
  let history = useHistory();
  let { state } = useContext(AppContext);
  console.log(state);
  const { data, loading, error } = useQuery(GET_USER_RESERVATIONS, {
    variables: {
      userId: state.user,
    },
  });

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
          "w-full flex-1 mt-2 overflow-auto scroll-smooth flex flex-col gap-3 bg-uiBlack rounded-lg"
        }
      >
        <div className={"flex bg-primary items-center justify-center py-2"}>
          <p
            className={
              "text-normal font-nunito text-xs font-regular leading-normal"
            }
          >
            My Bookings
          </p>
        </div>

        {loading ? (
          <div>
            {[1, 2, 3, 4].map((item) => {
              return <ReservationLoadingView />;
            })}
          </div>
        ) : null}

        <div className="flex flex-col m-2 rounded-lg">
          {!isNil(data?.getUserReservations) &&
            data?.getUserReservations.length &&
            data?.getUserReservations.map((item) => {
              if (isNil(item)) return null as any;
              return <ReservationDetailsCard key={item?.id} data={item} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default BookingsList;
