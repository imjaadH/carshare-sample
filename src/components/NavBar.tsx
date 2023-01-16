import React, { FC } from "react";
import * as Icon from "react-feather";
import AppLogo from "../assets/images/AppLogo.svg";
import { useLocation, withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const performLogout = () => {
    localStorage.removeItem("uat");
    window.location.reload();
  };

  const location = useLocation();

  return (
    <div className="nav w-full py-7 bg-primary h-full items-center flex flex-col justify-between overflow-auto">
      <div className={`flex flex-col items-center`}>
        <div>
          <img
            alt={"app-logo"}
            src={AppLogo}
            className={`w[1.5rem] h-[1.5rem] object-cover`}
          />
        </div>
        <ul className={`mt-10 flex flex-col gap-7 items-center`}>
          <li>
            <NavLink
              to="/"
              exact={true}
              className={"hover:shadow-lg hover:shadow-indigo-500/50"}
            >
              <Icon.Map
                color={
                  ["/", "/trip-info", "/new-booking"].includes(
                    location.pathname
                  )
                    ? "#17c477"
                    : "#9d9d9d"
                }
                size={"1.3rem"}
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/user-bookings" exact={true}>
              <Icon.User
                color={
                  location.pathname === "/user-bookings" ? "#17c477" : "#9d9d9d"
                }
                size={"1.3rem"}
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/create-journey">
              <Icon.PlusSquare
                color={
                  location.pathname === "/create-journey"
                    ? "#17c477"
                    : "#9d9d9d"
                }
                size={"1.3rem"}
              />
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={`flex flex-col items-center`}>
        <ul>
          <li>
            <button onClick={performLogout}>
              <Icon.LogOut color={"white"} size={"1.3rem"} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default withRouter(NavBar);
