import React from "react";
import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { isNil } from "ramda";

// Misc
import { GET_TRIPS } from "../graphql/queries.graphql";
import { TripInfoCard, TripLoadingView } from "../components";

export const TripsHome = () => {
  const { loading, error, data } = useQuery(GET_TRIPS, {
    fetchPolicy: "no-cache",
    variables: {
      skip: 0,
      take: 100,
    },
  });

  return (
    <>
      <Helmet>
        <title> Carpoolin - Trips </title>
      </Helmet>
      <div
        className={"absolute left-[1%] top-[2%] w-[28vw] h-[96%] flex flex-col"}
      >
        <div
          className={
            "w-full h-full overflow-auto scroll-smooth flex flex-col p-3 gap-3 bg-primary rounded-lg"
          }
        >
          {loading ? <TripLoadingView count={5} /> : null}
          {data?.getAllTrips.length &&
            data?.getAllTrips.map((item, index) => {
              if (isNil(item)) return null;
              return <TripInfoCard key={item?.id} data={item} />;
            })}
        </div>
      </div>
    </>
  );
};

export default TripsHome;
