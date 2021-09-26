import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route, Link,Redirect } from 'react-router-dom';

import { motion } from 'framer-motion';
const _ = require('underscore');
import Header from "../components/Header"
import {
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
import FeatherIcon from 'feather-icons-react';
import { useToasts } from 'react-toast-notifications';
//import { Loader } from "react-feather";
import { GET_ACCEPTED_SERVICE_REQUESTS_OF_ME, GET_COMPLETED_SERVICE_REQUESTS_FOR_ME, GET_COMPLETED_SERVICE_REQUESTS_OF_ME, GET_ME_AS_SERVICE_REQUESTER, GET_PENDING_SERVICE_REQUESTS_OF_ME, GET_SERVICE_REQUESTS_OF_ME } from "../gql/query";
import { CANCEL_SR } from '../gql/mutation';
import Requests from '../components/Requests';


const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;

const Heading = tw(SectionHeading)``;



const ServiceRequesterStatusPage=({history})=>{
    const {loading,error,data} = useQuery(GET_ME_AS_SERVICE_REQUESTER);

    const requestsByMe=useQuery(GET_SERVICE_REQUESTS_OF_ME);

    const { addToast } = useToasts();

    

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
    const canceledRequests=requestsByMe.data.canceledServiceRequestsbyMe;
    const rejectedRequests=requestsByMe.data.rejectedServiceRequestsbyMe;
    const reviewedRequests=requestsByMe.data.reviewedServiceRequestsbyMe;

  

    if(error){
      console.log(error)
      return <Redirect to={"/profile/serviceRequestsSent"}/>
    } 
    return (
        <Container>
          <Header/>
          <ContentWithPaddingXl>
        <HeaderRow>
        <p tw="text-3xl font-sans">Started Requests</p>
        </HeaderRow>
        <br/>
        <Requests
          requests={startedRequests}
          loading={loading}
          state="Started"
          user="Requester"
          history={history}
        />

        <HeaderRow>
        <p tw="text-3xl font-sans">Rejected Requests</p>
        </HeaderRow>
        <br/>
        <Requests
          requests={rejectedRequests}
          loading={loading}
          state="Rejected"
          user="Requester"
          history={history}
        />

        <HeaderRow>
        <p tw="text-3xl font-sans">Accepted Requests</p>
        </HeaderRow>
        <br/>

        <Requests
          requests={acceptedRequests}
          loading={loading}
          state="Accepted"
          user="Requester"
          history={history}
        />

        <HeaderRow>
        <p tw="text-3xl font-sans">Pending Requests</p>
        </HeaderRow>
        <br/>

        <Requests
          requests={pendingRequests}
          loading={loading}
          state="Accepted"
          user="Requester"
          history={history}
        />

        
      
        <HeaderRow>
        <p tw="text-3xl font-sans">Completed Requests</p>
        </HeaderRow>
        <br/>

        <Requests
          requests={completedRequests}
          loading={loading}
          state="Completed"
          user="Requester"
          history={history}
        />

        <HeaderRow>
        <p tw="text-3xl font-sans">Reviewed Requests</p>
        </HeaderRow>
        <br/>

        <Requests
          requests={reviewedRequests}
          loading={loading}
          state="Reviewed"
          user="Requester"
          history={history}
        />

        <HeaderRow>
        <p tw="text-3xl font-sans">Canceled Requests</p>
        </HeaderRow>
        <br/>
        <Requests
          requests={canceledRequests}
          loading={loading}
          state="Canceled"
          user="Requester"
          history={history}
        />
      </ContentWithPaddingXl>
        </Container>
      );
    };
    
    export default ServiceRequesterStatusPage;
    
