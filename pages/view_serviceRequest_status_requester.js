import React, { useState } from 'react';
import { useParams } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
const _ = require('underscore');
import Header from "../components/Header"
import {
  PrimaryButton,
  PrimaryButton2,
  PrimaryButton as PrimaryButtonBase,
  DisabledPrimaryButton as DisabledButtonBase
} from '../components/misc/Buttons.js';
import tw from 'twin.macro';
import styled from 'styled-components';
import { gql, useMutation, useQuery } from '@apollo/client';
import Loader from '../components/utils/Loader';


import { css } from 'styled-components/macro'; //eslint-disable-line
import { Container, ContentWithPaddingXl } from '../components/misc/Layouts.js';
import { SectionHeading } from '../components/misc/Headings.js';

import { useToasts } from 'react-toast-notifications';
//import { Loader } from "react-feather";
import { GET_ACCEPTED_SERVICE_REQUESTS_OF_ME, GET_COMPLETED_SERVICE_REQUESTS_FOR_ME, GET_COMPLETED_SERVICE_REQUESTS_OF_ME, GET_ME_AS_SERVICE_REQUESTER, GET_PENDING_SERVICE_REQUESTS_OF_ME, GET_SERVICE_REQUESTS_OF_ME } from "../gql/query";
import { CANCEL_SR } from '../gql/mutation';


const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const Heading = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;
const Actions = styled.div`
  ${tw`relative max-w-lg text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-144 font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-72 sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const TabContent = tw(
  motion.div
)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-full sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props =>
    css`
      background-image: url(${props.imageSrc});
    `}
  ${tw`h-40  xl:h-40 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(
  PrimaryButtonBase
)`text-sm rounded-full m-5 bg-green-500`;
const CardButton2 = tw(
  PrimaryButtonBase
)`text-sm rounded-full m-5 bg-blue-600`;
const CardButtonUnAvailable = tw(
  DisabledButtonBase
)`text-sm rounded-full m-5 bg-red-500`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;

const ServiceRequesterStatusPage=({history})=>{
    const {loading,error,data} = useQuery(GET_ME_AS_SERVICE_REQUESTER);
    //const accepted = useQuery(GET_ACCEPTED_SERVICE_REQUESTS_OF_ME);
    //const pending= useQuery(GET_PENDING_SERVICE_REQUESTS_OF_ME);
    //const started=useQuery(GET_COMPLETED_SERVICE_REQUESTS_OF_ME);
    //const completed=useQuery(GET_COMPLETED_SERVICE_REQUESTS_OF_ME);
    const requestsByMe=useQuery(GET_SERVICE_REQUESTS_OF_ME);

    const { addToast } = useToasts();
    //const[values,setValues]=useState();
    

    const [cancelServiceRequest,{loading_cancel,error_cancel}] = useMutation(CANCEL_SR,{
        onCompleted:(data)=>{
          addToast("Successfully canceled request",{appearance:"success"})
          history.push(`/profile/serviceRequestsSent`)
        },
        onError:(error)=>{
          addToast("Failed ",{appearance:"error"})
        }
        
        
      });
      if(loading|| requestsByMe.loading) return <Loader/>


    const acceptedRequests=requestsByMe.data.acceptedServiceRequestsbyMe;
    const pendingRequests=requestsByMe.data.pendingServiceRequestsbyMe;
    const startedRequests=requestsByMe.data.startedServiceRequestsbyMe;
    const completedRequests=requestsByMe.data.completedServiceRequestsbyMe;

    

      const cancelRequest=(event)=>{
        //setValues({ })
        cancelServiceRequest({
          variables: {
            cancelServiceRequestId:id
          }
        });  
      }

    if(error) return <Redirect to={"/"}/>
    return (
        <Container>
          <Header/>
          <ContentWithPaddingXl>
          <HeaderRow>
              <Heading>Started Requests</Heading>
            </HeaderRow>
            
            {startedRequests
              .map((request, index) => (
                <CardContainer key={index}>
                  <Card
                    className="group"
                    href={request.url}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <TwoColumn>
                      
                      <Column>
                        <CardText>
                          <CardTitle>{request.task}</CardTitle>
                          <CardContent>{request.date} at {request.time}Hrs</CardContent>
                        </CardText>
                      </Column>
                     
                      <Column>
                        <CardButton2 className="button is-info">Pay Now</CardButton2>
                        <CardButton2 className="button is-danger">Mark Completed</CardButton2>
                       
                      </Column>
                    </TwoColumn>
                  </Card>
                </CardContainer>
              ))}
            <HeaderRow>
              <Heading>Accepted Requests</Heading>
            </HeaderRow>
            
            {acceptedRequests
              .map((request, index) => (
                <CardContainer key={index}>
                  <Card
                    className="group"
                    href={request.url}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <TwoColumn>
                      
                      <Column>
                        <CardText>
                          <CardTitle>{request.task}</CardTitle>
                          <CardContent>{request.date} at {request.time}Hrs</CardContent>
                        </CardText>
                      </Column>
                     
                      <Column>
                        <CardButton2 className="button is-info">View and Edit</CardButton2>
                        <CardButton2 name={'cancelServiceRequestId'} className="button is-danger" onClick={event=>{
                            cancelServiceRequest({
                                variables:{
                                    cancelServiceRequestId:request.id
                                }})
                        }} >Cancel</CardButton2>
                        
                       
                      </Column>
                    </TwoColumn>
                  </Card>
                </CardContainer>
              ))}

<HeaderRow>
              <Heading>Pending Requests</Heading>
            </HeaderRow>
            
            {pendingRequests
              .map((request, index) => (
                <CardContainer key={index}>
                  <Card
                    className="group"
                    href={request.url}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <TwoColumn>
                      
                      <Column>
                        <CardText>
                          <CardTitle>{request.task}</CardTitle>
                          <CardContent>{request.date} at {request.time}Hrs</CardContent>
                        </CardText>
                      </Column>
                     
                      <Column>
                        <CardButton2 className="button is-info">View and Edit</CardButton2>
                        <CardButton2 className="button is-danger" onClick={cancelRequest}>Cancel</CardButton2>
                      
                       
                      </Column>
                    </TwoColumn>
                  </Card>
                </CardContainer>
              ))}
              <HeaderRow>
              <Heading>Completed Requests</Heading>
            </HeaderRow>
            
            {completedRequests
              .map((request, index) => (
                <CardContainer key={index}>
                  <Card
                    className="group"
                    href={request.url}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <TwoColumn>
                      
                      <Column>
                        <CardText>
                          <CardTitle>{request.task}</CardTitle>
                          <CardContent>{request.date} at {request.time}Hrs</CardContent>
                        </CardText>
                      </Column>
                     
                      <Column>
                        <CardButton2 className="button is-info">View</CardButton2>
                        
                       
                      </Column>
                    </TwoColumn>
                  </Card>
                </CardContainer>
              ))}
          </ContentWithPaddingXl>
        </Container>
      );
    };
    
    export default ServiceRequesterStatusPage;
    
