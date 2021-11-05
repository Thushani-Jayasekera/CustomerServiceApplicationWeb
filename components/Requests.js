import React, { useState } from 'react';

import { motion } from 'framer-motion';
const _ = require('underscore');

import {
  PrimaryButton as PrimaryButtonBase,
  DisabledPrimaryButton as DisabledButtonBase
} from '../components/misc/Buttons.js';
import tw from 'twin.macro';
import styled from 'styled-components';
import { gql, useMutation, useQuery } from '@apollo/client';
import Loader from '../components/utils/Loader';

import { useToasts } from 'react-toast-notifications';
import { css } from 'styled-components/macro'; //eslint-disable-line

import { SectionHeading } from '../components/misc/Headings.js';
import FeatherIcon from 'feather-icons-react';
import { Columns, Container, Message ,Box, Button} from 'react-bulma-components';

import { REJECT_SR, START_SR, COMPLETE_SR } from '../gql/mutation';
import { Image } from "cloudinary-react";
import { CANCEL_SR } from '../gql/mutation';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';
import SlideshowWithPagination from 'react-slideshow-with-pagination';
import ImagePicker from 'react-image-picker'
import ReactStars from 'react-rating-stars-component';
import SmartGallery from 'react-smart-gallery';
const Row = tw.div`flex flex-col lg:flex-row -mb-10`;
const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const Heading = tw(SectionHeading)``;
const CardImageContainer = styled.div`
  ${props =>
    css`
      background-image: url(${props.imageSrc});
    `}
  ${tw`h-40 w-40  xl:h-40 w-40 bg-center bg-cover relative rounded-t`}
`;

const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-full sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;

const CardButton = tw(PrimaryButtonBase)`text-sm rounded-full m-5 bg-green-500`;
const CardButton2 = tw(PrimaryButtonBase)`text-sm rounded-full m-5 bg-blue-600`;
const CardButtonUnAvailable = tw(
  DisabledButtonBase
)`text-sm rounded-full m-5 bg-red-500`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const ratingChanged = newRating => {
  setRating(newRating);
  console.log(newRating);
};

const Requests = ({ requests, loading, state, user,history }) => {
  const { addToast } = useToasts();
  //const[values,setValues]=useState();
  const [cancel,setCancel]=useState('Cancel');
  const [reject,setReject]=useState('Reject');
  const [cancelServiceRequest, { loading_cancel, error_cancel }] = useMutation(
    CANCEL_SR,
    {
      onCompleted: data => {
        addToast('Successfully canceled request', { appearance: 'success' });
        setCancel('Canceled');
        history.push(`/profile/serviceRequestsSent`);
      },
      onError: error => {
          console.log(error)
        addToast('Failed ', { appearance: 'error' });
      }
    }
  );

  const [rejectServiceRequest, { loading_reject, error_reject }] = useMutation(
    REJECT_SR,
    {
      onCompleted: data => {
        addToast('Successfully rejected request', { appearance: 'success' });
        setCancel('Rejected');
        history.push(`/profile/serviceRequestsForMe`);
      },
      onError: error => {
        addToast('Failed ', { appearance: 'error' });
      }
    }
  );

  const [startServiceRequest, { loading_start, error_start }] = useMutation(
    START_SR,
    {
      onCompleted: data => {
        addToast('Successfully started the request', {
          appearance: 'success'
        });

        history.push(`/profile/serviceRequestsForMe`);
      },
      onError: error => {
        console.log(error);
        addToast('Failed ', { appearance: 'error' });
      }
    }
  );

  const [completeServiceRequest, { loading_complete, error_complete }] = useMutation(
    COMPLETE_SR,
    {
      onCompleted: data => {
        addToast('Successfully completed the request', {
          appearance: 'success'
        });

        history.push(`/profile/serviceRequestsForMe`);
      },
      onError: error => {
        console.log(error);
        addToast('Failed ', { appearance: 'error' });
      }
    }
  );

  if (loading || loading_reject || loading_cancel||loading_start||loading_complete) {
    return <Loader />;
  }
  

  return (
    <>
      {requests.length !== 0 ? (
        <SlideshowWithPagination
          showNumbers={true}
          showDots={true}
          showArrows={true}
          autoplay={false}
          enableMouseEvents={false}
        >
          {requests.map((request, index) => (
            <Box key={index}  >
           
              <Box
                class="has-background-link-light my-0"
                className="group"
                href={request.url}
                initial="rest"
                whileHover="hover"
                animate="rest"
                box-radius={5}
              >
                <TwoColumn>
               
                  <Column>
             <Container>
               <br/>
                    <CardText>
                    <Columns>
                        <FeatherIcon icon="tool" />
                        <CardTitle> {request.task.length>57?request.task.substring(0, 57):request.task}...</CardTitle>
                      </Columns>
                      <br />
                      <Columns>
                        <FeatherIcon icon="calendar" />
                        <CardTitle> Date - {request.date}</CardTitle>
                      </Columns>
                      <br />
                      <Columns>
                        <FeatherIcon icon="clock" />
                        <CardTitle>Time - {request.time} H</CardTitle>
                      </Columns>

                      
                      {(state==='Reviewed')?<>
                      
                      <FeatherIcon icon="user-check" />
                      <CardTitle tw="font-style: italic">Customer Review- {request.requestReview.length>57?request.requestReview.substring(0, 57):request.requestReview}...</CardTitle>
                     
                      <ReactStars 
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                            id="star"
                            value={request.requestRating}
                            edit={false}/>
                           

                      </>:<></>}
                      <br/>
                    </CardText>
                    </Container>
                  </Column>

                  <Column>
                    <div>

                 
                     


                      {state==='Pending' && user==='Provider'?
                      
                      (

                        <>
                        
                        <Columns>
                        <Link
                        to={{
                          pathname: `/service_request/${request.id}`
                        }}
                      >
                        <Button
                          disabled={state !== 'Pending' || user != 'Provider'}
                          hidden={user != 'Provider'}
                          className="button is-success  px-6 py-3 font-bold text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm rounded-full my-6 m-5"
                        >
                          View and Accept
                        </Button>
                        </Link>

                        <Button
                          disabled={
                            (state !== 'Pending' && state !== 'Accepted') ||
                            user != 'Provider'
                          }
                          hidden={user != 'Provider'}
                          className="button is-danger  px-6 py-3 font-bold text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm rounded-full my-6 m-5"
                          onClick={event => {
                            rejectServiceRequest({
                              variables: {
                                rejectServiceRequestId: request.id
                              }
                            });
                          }}
                        >
                          {reject}
                        </Button>
                        </Columns>
                        </>
                      ):(<></>)}

{(state==='Pending'|| state==='Accepted') && user==='Requester'?
                      
                      (

                        <>
                        
                        <Columns>
                        <Link
                        to={{
                          pathname: `/service_request/${request.id}`
                        }}
                      >
                        <Button
                         
                         
                          className="button is-info  px-6 py-3 font-bold text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm rounded-full my-6 m-5"
                        >
                          View
                        </Button>
                        </Link>

                        <Button
                          disabled={
                            (state !== 'Pending' && state !== 'Accepted') ||
                            user != 'Requester'
                          }
                          hidden={user != 'Provider'}
                          className="button is-danger  px-6 py-3 font-bold text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm rounded-full my-6 m-5"
                          onClick={event => {
                            cancelServiceRequest({
                              variables: {
                                cancelServiceRequestId: request.id
                              }
                            });
                          }}
                        >
                         {cancel}
                        </Button>
                        </Columns>
                        </>
                      ):(<></>)}

                      {state==='Accepted'  && user==='Provider'?(

                        <Columns>
                        <Link
                        to={{
                          pathname: `/service_request/${request.id}`
                        }}
                      >
                        <Button className="button is-info  w-max px-6 py-3 font-bold text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm rounded-full my-6 m-5">
                          View
                        </Button>
                      </Link>

                      <Button
                          disabled={
                            (state !== 'Pending' && state !== 'Accepted') ||
                            user != 'Provider'
                          }
                          hidden={user != 'Provider'}
                          className="button is-danger  px-6 py-3 font-bold text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm rounded-full my-6 m-5"
                          onClick={event => {
                            rejectServiceRequest({
                              variables: {
                                rejectServiceRequestId: request.id
                              }
                            });
                          }}
                        >
                          {reject}
                        </Button>

                        <Button
                          disabled={state !== 'Accepted' || user != 'Provider'}
                          hidden={user != 'Provider'}
                          className="button is-success  px-6 py-3 font-bold text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm rounded-full my-6 m-2"
                          onClick={event=>{
                            startServiceRequest({
                              variables:{
                                startServiceRequestId: request.id
                              }
                            })
                          }

                          }
                        >
                          Start
                        </Button>
                     
                        </Columns>
                      ):(<></>)}

                      {state==='Started' && (user==='Provider'||user==='Requester')?(

                        <Columns>
                           <Link
                        to={{
                          pathname: `/service_request/${request.id}`
                        }}
                      >
                        <Button className="button is-info  w-max px-6 py-3 font-bold text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm rounded-full my-6 m-5">
                          View
                        </Button>
                      </Link>
                      <Link
                        to={{
                          pathname: `/service_request/${request.id}`
                        }}
                      >

                      <Button
                          disabled={state !== 'Started' || user != 'Provider'}
                          hidden={user != 'Provider'}
                          className="button is-success  px-6 py-3 font-bold text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm rounded-full my-6 m-5"
                          
                        >
                          Mark Completed
                        </Button>
                        </Link>

                        </Columns>

                        
                      ):(<></>)}
                      {(state==='Completed'|| state==='Reviewed'|| state==='Canceled'|| state==='Rejected')?<>
                      
                      <Columns>
                           <Link
                        to={{
                          pathname: `/service_request/${request.id}`
                        }}
                      >
                        <Button className="button is-info  w-max px-6 py-3 font-bold text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm rounded-full my-6 m-5">
                          View
                        </Button>
                      </Link>
                      </Columns>
                      </>:<></>}
                    




                   </div>
                  </Column>
                </TwoColumn>
              </Box>
              </Box>
          ))}
        </SlideshowWithPagination>
      ) : (
        <Message color={'danger'}>
          <Message.Body>No Requests! Check Later</Message.Body>
        </Message>
      )}
    </>
  );
};

export default Requests;
