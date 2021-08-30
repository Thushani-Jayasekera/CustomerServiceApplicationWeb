import React from "react";
import {BrowserRouter as Router , Route , Redirect} from "react-router-dom";
import { useQuery ,gql} from "@apollo/client";
import {GET_ME} from "../../gql/query";

const ServiceProviderRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(GET_ME);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  return (
    <Route
      {...rest}
      render={props => {
        if(error){
          return(<Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />)
        }
        else if (data.me.roles.includes("service_provider")) {
          return (
            <Component {...props} />
          )
        }
        else {
          return(
            <Redirect
              to={{
                pathname: '/service_provider/register',
                state: { from: props.location }
              }}
            />
          )
        }
      }}
    />
  );
};

export default ServiceProviderRoute