import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
  const [loggedInUser] = useContext(UserContext);
  console.log("LoggedInUser Private", loggedInUser);
  console.log("Private Token", sessionStorage.getItem("token"));
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.email || sessionStorage.getItem("token") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
