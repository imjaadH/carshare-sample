import React, { FC, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../context";

interface IProps {
  Component: FC<any>;
  path: string;
  exact?: boolean;
}
export const ProtectedRoute = (props: IProps) => {
  const { Component, ...rest } = props;
  const { state } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={(matchProps) =>
        state.authenticated ? (
          <Component {...matchProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};
