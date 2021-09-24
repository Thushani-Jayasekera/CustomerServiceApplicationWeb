import React, { useState } from 'react';
import {
  Columns,
  Container,
  Section,
  Content,
  Table,
  Button,
  Message
} from 'react-bulma-components';

import Layout from '../components/Layout';
import Header from '../components/Header';
import styled from 'styled-components';
import {
  GET_SR_BY_ID,
  GET_USER_BY_ID,
  GET_ME,
  GET_ME_USER_BY_ID_SR_DETAILS
} from '../gql/query';
import { useMutation, useQuery } from '@apollo/client';
import Loader from '../components/utils/Loader';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';
//import {handleChangefn} from "../utils"
//import { ADD_JOB_BID } from "../gql/mutation";
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import {
  ACCEPT_SR,
  CANCEL_SR,
  CUSTOMER_FEEDBACK_SR,
  EDIT_SR,
  FEEDBACK_SR,
  REJECT_SR,
  RESCHEDULE_SR,
  START_SR
} from '../gql/mutation';
import { ValuesOfCorrectType } from 'graphql/validation/rules/ValuesOfCorrectType';
import ReactStars from 'react-rating-stars-component';

//const Container = tw.div`relative`;
const Content2 = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Form = tw.form`mx-auto lg:max-w-lg max-w-sm`;
const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-gray-100 text-black rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,
  textarea,
  select {
    ${tw`w-full bg-transparent  text-base font-medium tracking-wide border-b-2 py-2 text-black hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder,
    option {
      ${tw`text-gray-500`}
    }
  }
`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 px-6 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const ViewServiceRequestPage = () => {
  const { id } = useParams(0);
  const [values, setValues] = useState();
  const [status,setStatus]=useState();
  const [rating,setRating]=useState();
  const [view, setView] = useState({ renderView: 0 });
  //const [user,setUser]=useState({});

  const now = new Date();
  now.setMinutes(now.getMinutes() + 25);
  console.log(now);
  const sr_request_query = useQuery(GET_ME_USER_BY_ID_SR_DETAILS, {
    variables: {
      getServiceRequestByIdId: `${id}`
    }
  });

  //console.log(data_provider);

  const { addToast } = useToasts();
  const history = useHistory();

  const [cancelServiceRequest, { loading_cancel, error_cancel }] = useMutation(
    CANCEL_SR,
    {
      onCompleted: data => {
        addToast('Successfully canceled request', { appearance: 'success' });
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

  const [rejectServiceRequest, { loading_reject, error_reject }] = useMutation(
    REJECT_SR,
    {
      onCompleted: data => {
        addToast('Successfully rejected the request', {
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

  const [acceptServiceRequest, { loading_accept, error_accept }] = useMutation(
    ACCEPT_SR,
    {
      onCompleted: data => {
        addToast('Successfully accepted the request', {
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
  const [
    rescheduleServiceRequest,
    { loading_reschedule, error_reschedule }
  ] = useMutation(RESCHEDULE_SR, {
    onCompleted: data => {
      addToast('Successfully rescheduled the request', {
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
  });

  const [editServiceRequest, { loading_edit, error_edit }] = useMutation(
    EDIT_SR,
    {
      onCompleted: data => {
        addToast('Successfully edited the request', { appearance: 'success' });
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

  const [feedbackServiceRequest, { loading_feedback, error_feedback }] = useMutation(
    FEEDBACK_SR,
    {
      onCompleted: data => {
        addToast('Successfully reviewed the request', { appearance: 'success' });
        setView({
          renderView: 0
        });
        setStatus('Reviewed')
        history.push(`/service_request/${id}`);
      },
      onError: error => {
        console.log(error);
        addToast('Failed ', { appearance: 'error' });
      }
    }
  );

  const [customerfeedbackServiceRequest, { loading_Cfeedback, error_Cfeedback }] = useMutation(
    CUSTOMER_FEEDBACK_SR,
    {
      onCompleted: data => {
        addToast('Successfully reviewed the customer', { appearance: 'success' });
        setView({
          renderView: 0
        });
        setStatus('Reviewed')
        history.push(`/service_request/${id}`);
      },
      onError: error => {
        console.log(error);
        addToast('Failed ', { appearance: 'error' });
      }
    }
  );

  //const providerDetails=data_provider.getUserbyId;
  if (sr_request_query.loading) return <Loader />;

  const data_serviceRequest = sr_request_query.data;
  console.log(data_serviceRequest);
  const serviceReqDetails = data_serviceRequest.getServiceRequestByID;

  const provider_id = serviceReqDetails.provider_id;
  const requester_id = serviceReqDetails.requester_id;

  const date = new Date(serviceReqDetails.date + 'T' + serviceReqDetails.time);
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  const dayName = days[date.getDay()];
  console.log(date.getDay());
  showDay = `${serviceReqDetails.date}, ${dayName}`;
  const myDetails = data_serviceRequest.me;

  const handleChange = event => {
    
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const cancelRequest = event => {
    setValues({});
    cancelServiceRequest({
      variables: {
        cancelServiceRequestId: id
      }
    });
  };

  const rejectRequest = event => {
    setValues({});
    rejectServiceRequest({
      variables: {
        rejectServiceRequestId: id
      }
    });
  };

  const startRequest = event => {
    setValues({});
    startServiceRequest({
      variables: {
        startServiceRequestId: id
      }
    });
  };

  const acceptRequest = event => {
    setValues({});
    acceptServiceRequest({
      variables: {
        acceptServiceRequestId: id,
        acceptServiceRequestEstimate: values.acceptServiceRequestEstimate
      }
    });
  };

  const ratingChanged = newRating => {
    setRating(newRating);
    console.log(newRating);
  };



  ///////////////////////////////////////////////////////////////
  const clickDetails = event => {
    setView({
      renderView: 0
    });
  };
  const clickReschedule = event => {
    setView({
      renderView: 1
    });
  };
  const clickEdit = event => {
    setView({
      renderView: 2
    });
  };

  ////////////////////////////////////////////////////////////////
  {
    switch (view.renderView) {
      case 0:
        return (
          <Layout>
            <Header />
            <Container>
              <Section>
                <Content>
                  <h1>Service Request details</h1>
                </Content>

                {myDetails.id === requester_id ? (
                  <>
                    <Button
                      onClick={clickDetails}
                      rounded
                      className="button is-info is-medium mx-4 my-2 px-6"
                    >
                      View Details
                    </Button>

                    <Button
                      onClick={clickReschedule}
                      rounded
                      className="button is-info is-medium mx-4 my-2 px-6"
                      disabled={
                        serviceReqDetails.date + 'T' + serviceReqDetails.time <
                          now.toISOString().substr(0, 16) ||
                        serviceReqDetails.state === 'Canceled' ||
                        serviceReqDetails.state === 'Rejected' ||
                        serviceReqDetails.state === 'Completed' ||
                        serviceReqDetails.state === 'Reviewed' ||
                        serviceReqDetails.state === 'Started' 
                      }
                    >
                      Reschedule
                    </Button>
                    <Button
                      onClick={clickEdit}
                      rounded
                      className="button is-info is-medium mx-4 my-2 px-6"
                      disabled={
                        serviceReqDetails.state !== 'Pending' ||
                        serviceReqDetails.date + 'T' + serviceReqDetails.time <
                          new Date().toISOString().substr(0, 16)
                      }
                    >
                      Edit Task
                    </Button>
                    <Button
                      rounded
                      className="button is-danger is-medium mx-4 my-2 px-6"
                      onClick={cancelRequest}
                      disabled={
                        serviceReqDetails.date + 'T' + serviceReqDetails.time <
                          now.toISOString().substr(0, 16) ||
                        (serviceReqDetails.state !== 'Pending'&& serviceReqDetails.state !== 'Accepted')
                      }
                    >
                      Cancel
                    </Button>

                    <Button
                      rounded
                      className="button is-success is-centered is-medium mx-4 my-2 px-6"
                      disabled={
                        serviceReqDetails.state === 'Pending' ||
                        serviceReqDetails.state === 'Canceled' ||
                        serviceReqDetails.state === 'Rejected'
                      }
                    >
                      Make Payment
                    </Button>
                  </>
                ) : (
                  <>
                    <Columns>
                      <Actions>
                        <input
                          type="text"
                          placeholder="Enter your estimate"
                          name={'acceptServiceRequestEstimate'}
                          onChange={handleChange}
                        />
                        <Button
                          rounded
                          className="button is-success is-medium mx-4 my-2 px-6"
                          onClick={acceptRequest}
                          disabled={
                            serviceReqDetails.date +
                              'T' +
                              serviceReqDetails.time <
                              new Date().toISOString().substr(0, 16) ||
                            serviceReqDetails.state !== 'Pending'
                          }
                        >
                          Accept
                        </Button>
                      </Actions>

                      <Button
                        rounded
                        className="button is-info is-medium mx-4 my-2 px-6"
                        onClick={startRequest}
                        disabled={
                          serviceReqDetails.state!=='Accepted'
                        }
                      >
                        Start
                      </Button>

                      <Button
                        rounded
                        className="button is-danger is-medium mx-4 my-2 px-6"
                        onClick={rejectRequest}
                        disabled={
                          serviceReqDetails.date +
                            'T' +
                            serviceReqDetails.time <
                          now.toISOString().substr(0, 16) || serviceReqDetails.state==='Completed'||serviceReqDetails.state==='Started'||serviceReqDetails.state==='Reviewed'
                        }
                      >
                        Reject
                      </Button>
                      <Button
                      rounded
                      className="button is-success is-medium mx-4 my-2 px-6"
                      
                      disabled={
                        serviceReqDetails.state!=='Started'
                      }
                    >
                      Mark Completed
                    </Button>
                    </Columns>
                  </>
                )}
              </Section>
              <Section>
                <Content>
                  <Table className="table is-responsive is-centerd">
                    <tbody>
                      <tr>
                        <td>Selected Provider Profile</td>

                        <td>
                          <Link to={'/profile'}>
                            <p tw="text-blue-600">{'View Profile'}</p>
                          </Link>
                        </td>
                      </tr>

                      <tr>
                        <td>Service Requester</td>
                        <td>
                          <Link to={'/profile'}>
                            <p tw="text-blue-600">{'View Profile'}</p>
                          </Link>
                        </td>
                      </tr>

                      <tr>
                        <td>Service Date</td>
                        <td>{showDay}</td>
                      </tr>
                      <tr>
                        <td>Service Time</td>
                        <td>{serviceReqDetails.time}</td>
                      </tr>
                      <tr>
                        <td>Service Location</td>
                        <td>
                          <b>{serviceReqDetails.location}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>Description of Task</td>
                        <td>{serviceReqDetails.task}</td>
                      </tr>
                      <tr>
                        <td>Agreed Price Range</td>
                        <td>
                          {serviceReqDetails.min_price}-
                          {serviceReqDetails.max_price} LKR
                        </td>
                      </tr>

                      <tr>
                        <td>Service Provider Estimate</td>
                        <td>
                          {serviceReqDetails.estimate
                            ? `${serviceReqDetails.estimate} LKR`
                            : 'Not Available Yet'}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Amount Paid to date</td>
                        <td>{serviceReqDetails.task}</td>
                      </tr>
                      <tr>
                        <td>Status of Request</td>
                        <td>
                          {serviceReqDetails.state === 'Accepted' ? (
                            <Button
                              rounded
                              className="button is-success is-small mx-5 px-6"
                            >
                              {serviceReqDetails.state}
                            </Button>
                          ) : serviceReqDetails.state === 'Pending' ? (
                            <Button
                              rounded
                              className="button is-warning is-small mx-5 px-6"
                            >
                              {serviceReqDetails.state}
                            </Button>
                          ) : (
                            <Button
                              rounded
                              className="button is-danger is-small mx-5 px-6"
                            >
                              {serviceReqDetails.state}
                            </Button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  {serviceReqDetails.state === 'Completed' && myDetails.id === requester_id && status!=='Reviewed'? (
                    <>
                      <FormContainer>
                    <div tw="mx-auto max-w-4xl">
                      <h2>Add Review</h2>
                     <Form
                      onSubmit={event => {
                        event.preventDefault();
                        console.log(values);
                        feedbackServiceRequest({
                          variables: {
                            feedbackServiceRequestId: id,
                            feedbackServiceRequestRequestRating:
                              rating,
                              feedbackServiceRequestRequestReview:
                              values.feedbackServiceRequestRequestReview
                          }
                        });
                      }}
                    >
                    <Columns>
                    <h5>How much do you rate the service?  - {rating}/5</h5>
                    </Columns>
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        id="star"
                      />
                      
                      
                     
                      <InputContainer tw="flex-1">
                      <Label htmlFor="review-input">Share your experience </Label>
                      <TextArea
                        id="review-input"
                        name={'feedbackServiceRequestRequestReview'}
                        placeholder="Add your Review Here!"
                        onChange={handleChange}
                        required
                      />
                    </InputContainer>
                    <SubmitButton type="submit" value="Submit">
                        Submit Review
                      </SubmitButton>
                      </Form>
                      </div>
                      </FormContainer>
                    </>
                  ) : (
                    <>
                    {status==='Reviewed'?(
                      <Message color={'success'}>
                      <Message.Body>
                        Thank you for your feedback!
                      </Message.Body>
                    </Message>
                    ) :
                      <Message color={'warning'}>
                        <Message.Body>
                          You can cancel/ reschedule / reject a request only 20
                          minuites before the scheduled time
                        </Message.Body>
                      </Message>
                    }
                    </>
                  )}



              {serviceReqDetails.state === 'Completed' && myDetails.id === provider_id && status!=='Reviewed'? (
                    <>
                      <FormContainer>
                    <div tw="mx-auto max-w-4xl">
                      <h2>Add Review about your customer</h2>
                     <Form
                      onSubmit={event => {
                        event.preventDefault();
                        console.log(values);
                        customerfeedbackServiceRequest({
                          variables: {
                            customerfeedbackServiceRequestId: id,
                            customerfeedbackServiceRequestCustomerRating:
                              rating,
                              customerfeedbackServiceRequestCustomerReview:
                              values.customerfeedbackServiceRequestRequestReview
                          }
                        });
                      }}
                    >
                    <Columns>
                    <h5>How much do you rate your customer?  - {rating}/5</h5>
                    </Columns>
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        id="star"
                      />
                      
                      
                     
                      <InputContainer tw="flex-1">
                      <Label htmlFor="review-input">Share your experience </Label>
                      <TextArea
                        id="review-input"
                        name={'customerfeedbackServiceRequestRequestReview'}
                        placeholder="Add your Review Here!"
                        onChange={handleChange}
                        required
                      />
                    </InputContainer>
                    <SubmitButton type="submit" value="Submit">
                        Submit Review
                      </SubmitButton>
                      </Form>
                      </div>
                      </FormContainer>
                    </>
                  ) : (
                    <>
                    {status==='Reviewed'?(
                      <Message color={'success'}>
                      <Message.Body>
                        Thank you for your feedback!
                      </Message.Body>
                    </Message>
                    ) :
                      <Message color={'warning'}>
                        <Message.Body>
                          You can cancel/ reschedule / reject a request only 20
                          minuites before the scheduled time
                        </Message.Body>
                      </Message>
                    }
                    </>
                  )}
                </Content>
              </Section>
            </Container>
          </Layout>
        );

      /////////////////////////////////////////////////
      case 1:
        return (
          <Layout>
            <Header />
            <Container>
              <Section>
                <Content>
                  <h1>Service Request details</h1>
                </Content>
                {myDetails.id === requester_id ? (
                  <>
                    <Button
                      onClick={clickDetails}
                      rounded
                      className="button is-info is-medium mx-4 my-2 px-6"
                    >
                      View Details
                    </Button>

                    <Button
                      onClick={clickReschedule}
                      rounded
                      className="button is-info is-medium mx-4 my-2 px-6"
                      disabled={
                        serviceReqDetails.date + 'T' + serviceReqDetails.time <
                        now.toISOString().substr(0, 16)
                      }
                    >
                      Reschedule
                    </Button>
                    <Button
                      onClick={clickEdit}
                      rounded
                      className="button is-info is-medium mx-4 my-2 px-6"
                      disabled={
                        serviceReqDetails.state !== 'Pending' ||
                        serviceReqDetails.date + 'T' + serviceReqDetails.time <
                          new Date().toISOString().substr(0, 16)
                      }
                    >
                      Edit Task
                    </Button>
                    <Button
                      rounded
                      className="button is-danger is-medium mx-4 my-2 px-6"
                      onClick={cancelRequest}
                      disabled={
                        serviceReqDetails.date + 'T' + serviceReqDetails.time <
                        now.toISOString().substr(0, 16)
                      }
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      rounded
                      className="button is-success is-medium mx-4 my-2 px-6"
                      onClick={acceptRequest}
                      disabled={
                        serviceReqDetails.date + 'T' + serviceReqDetails.time <
                        new Date().toISOString().substr(0, 16)
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      rounded
                      className="button is-danger is-medium mx-4 my-2 px-6"
                      onClick={rejectRequest}
                      disabled={
                        serviceReqDetails.date + 'T' + serviceReqDetails.time <
                        now.toISOString().substr(0, 16)
                      }
                    >
                      Reject
                    </Button>
                    <Button
                      rounded
                      className="button is-success is-medium mx-4 my-2 px-6"
                      
                      disabled={
                        serviceReqDetails.state!=='Started'
                      }
                    >
                      Mark Completed
                    </Button>
                  </>
                )}

                <Content2>
                  <FormContainer>
                    <h3>Reschedule the Service Request</h3>
                    <Form
                      onSubmit={event => {
                        event.preventDefault();
                        console.log(values);
                        rescheduleServiceRequest({
                          variables: {
                            rescheduleServiceRequestId: id,
                            rescheduleServiceRequestDate:
                              values.rescheduleServiceRequestDate,
                            rescheduleServiceRequestTime:
                              values.rescheduleServiceRequestTime
                          }
                        });
                      }}
                    >
                      <InputContainer>
                        <Label htmlFor="date-input">Resheduled date</Label>
                        <Input
                          id="date-input"
                          type="date"
                          name={'rescheduleServiceRequestDate'}
                          placeholder="E.g. john@mail.com"
                          onChange={handleChange}
                          required
                        />
                      </InputContainer>

                      <InputContainer>
                        <Label htmlFor="time-input">Rescheduled time</Label>
                        <Input
                          id="time-input"
                          type="time"
                          name={'rescheduleServiceRequestTime'}
                          onChange={handleChange}
                          required
                        />
                      </InputContainer>
                      <SubmitButton type="submit" value="Submit">
                        Reschedule
                      </SubmitButton>
                    </Form>
                  </FormContainer>
                </Content2>
              </Section>
            </Container>
          </Layout>
        );

      //////////////////////////////////////////////////////////
      case 2:
        return (
          <Layout>
            <Header />
            <Container>
              <Section>
                <Content>
                  <h1>Service Request details</h1>
                </Content>

                {myDetails.id === requester_id ? (
                  <>
                    <Button
                      onClick={clickDetails}
                      rounded
                      className="button is-info is-medium mx-4 my-2 px-6"
                    >
                      View Details
                    </Button>

                    <Button
                      onClick={clickReschedule}
                      rounded
                      className="button is-info is-medium mx-4 my-2 px-6"
                      disabled={
                        serviceReqDetails.date + 'T' + serviceReqDetails.time <
                        now.toISOString().substr(0, 16)
                      }
                    >
                      Reschedule
                    </Button>
                    <Button
                      onClick={clickEdit}
                      rounded
                      className="button is-info is-medium mx-4 my-2 px-6"
                      disabled={
                        serviceReqDetails.state !== 'Pending' ||
                        serviceReqDetails.date + 'T' + serviceReqDetails.time <
                          new Date().toISOString().substr(0, 16)
                      }
                    >
                      Edit Task
                    </Button>
                    <Button
                      rounded
                      className="button is-danger is-medium mx-4 my-2 px-6"
                      onClick={cancelRequest}
                      disabled={
                        serviceReqDetails.date + 'T' + serviceReqDetails.time <
                        now.toISOString().substr(0, 16)
                      }
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      rounded
                      className="button is-success is-medium mx-4 my-2 px-6"
                      onClick={acceptRequest}
                      disabled={
                        serviceReqDetails.date + 'T' + serviceReqDetails.time <
                        new Date().toISOString().substr(0, 16)
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      rounded
                      className="button is-danger is-medium mx-4 my-2 px-6"
                      onClick={rejectRequest}
                      disabled={
                        serviceReqDetails.date + 'T' + serviceReqDetails.time <
                        now.toISOString().substr(0, 16)
                      }
                    >
                      Reject
                    </Button>
                  </>
                )}

                <Content2>
                  <FormContainer>
                    <h3>Edit the Service Request</h3>
                    <Form
                      onSubmit={event => {
                        event.preventDefault();
                        console.log(values);
                        editServiceRequest({
                          variables: {
                            editServiceRequestId: id,
                            editServiceRequestTask:
                              values.editServiceRequestTask,
                            editServiceRequestImage1:
                              values.editServiceRequestImage1,
                            editServiceRequestImage2:
                              values.editServiceRequestImage2,
                            editServiceRequestImage3:
                              values.editServiceRequestImage3
                          }
                        });
                      }}
                    >
                      <InputContainer tw="flex-1">
                        <Label htmlFor="job-input">Job Description</Label>
                        <TextArea
                          id="job-input"
                          name={'editServiceRequestTask'}
                          placeholder="E.g. Details about the service request"
                          onChange={handleChange}
                          required
                        />
                      </InputContainer>
                      <InputContainer tw="flex-1">
                        <Label htmlFor="name-input">
                          Three Images of the issue you are facing (Optional)
                        </Label>
                        <input
                          type="file"
                          name={'editServiceRequestImage1'}
                          accept="image/*"
                          onChange={handleChange}
                        />
                        <input
                          type="file"
                          name={'editServiceRequestImage2'}
                          accept="image/*"
                          onChange={handleChange}
                        />
                        <input
                          type="file"
                          name={'editServiceRequestImage3'}
                          accept="image/*"
                          onChange={handleChange}
                        />
                      </InputContainer>

                      <SubmitButton type="submit" value="Submit">
                        Confirm Edit
                      </SubmitButton>
                    </Form>
                  </FormContainer>
                </Content2>
              </Section>
            </Container>
          </Layout>
        );
    }
  }
};

export default ViewServiceRequestPage;
