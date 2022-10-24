import React from "react";
import { BookTrip, MapDisplay, NavBar, TripInfo, UserList } from "./components";
import { Router, Switch, Route, Link, Redirect } from "react-router-dom";
function App() {
  return (
    <div
      className={`wrapper w-full min-h-screen bg-gray-200 flex items-center justify-center`}
    >
      <div className={`body max-w-xxl m-0 m-auto`}>
        <div className="flex w-[4%]">
          <NavBar />
        </div>

        <div className="flex w-[96%] relative">
          <MapDisplay />

          <Switch>
            <Route path={"/"} exact component={UserList} />
            <Route path={"/trip"} component={TripInfo} />
            <Route path={"/new-booking"} component={BookTrip} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
