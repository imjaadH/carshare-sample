import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { AppContext } from "../../context";
import { MapDisplay, NavBar } from "../index";
import {
  UserList,
  TripInfo,
  RouteDetails,
  CreateJourney,
  BookingsList,
  BookTrip,
  LoginForm,
} from "../../pages";

export const AuthLayout = (props: any) => {
  const { state } = useContext(AppContext);
  return state.authenticated ? (
    <>
      <div className="flex w-[4%]">
        <NavBar />
      </div>

      <div className="flex w-[96%] relative">
        <MapDisplay />

        <Switch>
          <Route path={"/"} exact component={UserList} />
          <Route path={"/trip-info"} component={TripInfo} />
          <Route path={"/new-booking"} component={BookTrip} />
          <Route path={"/user-bookings"} component={BookingsList} />
          <Route path={"/create-journey"} component={CreateJourney} />
        </Switch>
      </div>
    </>
  ) : (
    <LoginForm />
  );
};
