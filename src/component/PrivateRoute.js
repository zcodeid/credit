import React from "react";
import { Redirect, Route } from "react-router-dom";

export default ({ component: Component, ...rest }) => {
  // <Redirect to={{ pathName: "/login", state: { from: props.location } }} />
  const renderRoute = (props) => {
    return localStorage.getItem("token") ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    );
  };
  return <Route {...rest} render={renderRoute} />;
};
