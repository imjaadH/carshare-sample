import React, { FC } from "react";
import * as Icon from "react-feather";

const NavBar = () => {
  return (
    <div className="nav w-full py-7 bg-primary h-full items-center flex flex-col justify-between overflow-auto">
      <div className={`flex flex-col items-center`}>
        <div className={`text-white`}>Logo</div>
        <ul className={`mt-10 flex flex-col gap-7 items-center`}>
          <li>
            <a href="/">
              <Icon.Map color={"white"} size={"1.3rem"} />
            </a>
          </li>
          <li>
            <a href="#">
              <Icon.User color={"white"} />
            </a>
          </li>
          <li>
            <a href="#">
              <Icon.PlusSquare color={"white"} />
            </a>
          </li>
          <li>
            <h2>Item</h2>
          </li>
        </ul>
      </div>
      <div className={`flex flex-col items-center`}>
        <ul>
          <li>
            <a href="#">
              <Icon.LogOut color={"white"} size={"1.3rem"} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
