import React from "react";
import {BrowserRouter as Router , Route , Redirect} from "react-router-dom";
import { useQuery ,gql} from "@apollo/client";
import {GET_ME_AS_SERVICE_PROVIDER} from "../../gql/query";
import Loader from "./Loader";
import Layout from "../Layout";
import Header from "../Header";
import { Container, Message } from "react-bulma-components";

const ServiceProviderRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(GET_ME_AS_SERVICE_PROVIDER,{
    fetchPolicy:"cache-and-network"
  });
  // if the data is loading, display a loading message
  if (loading) return <Loader/>;
  // if there is an error fetching the data, display an error message
  return (
    <Route
      {...rest}
      render={props => {
        if(error){
          console.log(error)
          return(<Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />)
        }
        else if(data.me.profile_state === "created"){
          return <Layout>
            <Header/>
            <Container>
              <Message color={"danger"}>
                <Message.Body>
                  You are waiting to be accepted
                </Message.Body>
              </Message>
            </Container>
          </Layout>
        }else if(data.me.profile_state==="suspended"){
          return<Layout>
            <Header/>
            <Container>
              <Message color={"danger"}>
                <Message.Body>
                  You are suspended
                </Message.Body>
              </Message>
            </Container>
          </Layout>
        }else if(data.me.profile_state==="paused"){
          return<Layout>
            <Header/>
            <Container>
              <Message color={"danger"}>
                <Message.Body>
                  You are Paused
                </Message.Body>
              </Message>
            </Container>
          </Layout>
        } else if (data.me.roles.includes("service_provider")) {
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