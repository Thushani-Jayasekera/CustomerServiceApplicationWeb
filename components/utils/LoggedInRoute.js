import React from "react";
import {BrowserRouter as Router , Route , Redirect} from "react-router-dom";
import { useQuery ,gql} from "@apollo/client";
import { IS_LOGGED_IN } from "/gql/query";
import Loader from "./Loader";
const LoggedInRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading</p>;
  // if there is an error fetching the data, display an error message
  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default LoggedInRoute