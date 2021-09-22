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
import { Columns, Message } from 'react-bulma-components';

import { REJECT_SR, START_SR } from '../gql/mutation';

import { CANCEL_SR } from '../gql/mutation';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';
import SlideshowWithPagination from 'react-slideshow-with-pagination';
import reactStars from 'react-rating-stars-component';

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const Heading = tw(SectionHeading)``;

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
        setView({
          renderView: 0
        });
        history.push(`/service_request/${id}`);
      },
      onError: error => {
        addToast('Failed ', { appearance: 'error' });
      }
    }
  );

  if (loading || loading_reject || loading_cancel||loading_start) {
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
                      <reactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        value={request.requestRating}
                        activeColor="blue"
                        id="star"
                      />
                      <FeatherIcon icon="user-check" />
                      <CardTitle>Customer Review- {request.requestReview}</CardTitle>
                      <FeatherIcon icon="star" />
                      <CardTitle>Service Rating - {request.requestRating} / 5.0</CardTitle>

                      </>:<></>}
                    </CardText>
                  </Column>

                  <Column>
                    <Columns>
                      <Link
                        to={{
                          pathname: `/service_request/${request.id}`
                        }}
                      >
                        <CardButton2 className="button is-info  w-max px-6 py-3 font-bold text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm rounded-full m-5">
                          View
                        </CardButton2>
                      </Link>
                     
                    </Columns>

                    {user === 'Provider' ? (
                      <>
                        <Link
                        to={{
                          pathname: `/service_request/${request.id}`
                        }}
                      >
                        <CardButton2
                          disabled={state !== 'Pending' || user != 'Provider'}
                          hidden={user != 'Provider'}
                          className="button is-success  px-6 py-3 font-bold text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm rounded-full m-5"
                        >
                          View and Accept
                        </CardButton2>
                        </Link>

                        <CardButton2
                          disabled={
                            (state !== 'Pending' && state !== 'Accepted') ||
                            user != 'Provider'
                          }
                          hidden={user != 'Provider'}
                          className="button is-danger"
                          onClick={event => {
                            rejectServiceRequest({
                              variables: {
                                rejectServiceRequestId: request.id
                              }
                            });
                          }}
                        >
                          {reject}
                        </CardButton2>
                        <CardButton2
                          disabled={state !== 'Accepted' || user != 'Provider'}
                          hidden={user != 'Provider'}
                          className="button is-success  px-6 py-3 font-bold text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm rounded-full m-5"
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
                        </CardButton2>

                        <CardButton2
                          disabled={state !== 'Started' || user != 'Provider'}
                          hidden={user != 'Provider'}
                          className="button is-success  px-6 py-3 font-bold text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm rounded-full m-5"
                        >
                          Mark Completed
                        </CardButton2>


                      </>
                    ) : (
                      <>
                        <CardButton2
                          disabled={
                            (state !== 'Pending' && state !== 'Accepted') ||
                            user != 'Requester'
                          }
                          hidden={user != 'Provider'}
                          className="button is-danger"
                          onClick={event => {
                            cancelServiceRequest({
                              variables: {
                                cancelServiceRequestId: request.id
                              }
                            });
                          }}
                        >
                         {cancel}
                        </CardButton2>


                        <CardButton2
                          disabled={state !== 'Started' || user != 'Provider'}
                          hidden={user != 'Provider'}
                          className="button is-success  px-6 py-3 font-bold text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 text-sm rounded-full m-5"
                        >
                          Mark Completed
                        </CardButton2>
                      </>
                    )}
                  </Column>
                </TwoColumn>
              </Card>
            </CardContainer>
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
