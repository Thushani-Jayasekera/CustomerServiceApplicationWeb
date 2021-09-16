import React, { useState } from 'react';
import {
  Columns,
  Container,
  Section,
  Content,
  Table,
  Button
} from 'react-bulma-components';
import Layout from '../components/Layout';
import Header from '../components/Header';
import styled from 'styled-components';
import { GET_SR_BY_ID } from '../gql/query';
import { useMutation, useQuery } from '@apollo/client';
import Loader from '../components/utils/Loader';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';
//import {handleChangefn} from "../utils"
//import { ADD_JOB_BID } from "../gql/mutation";
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

//const Container = tw.div`relative`;
const Content2 = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Form = tw.form`mx-auto lg:max-w-lg max-w-sm`;
const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-300 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,
  textarea,
  select {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder,
    option {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const ViewServiceRequestPage = ({ match }) => {
  const [values, setValues] = useState();
  const [view, setView] = useState({ renderView: 1 });

  const { id } = useParams(0);
  console.log(id);
  const jobPostingQuery = useQuery(GET_SR_BY_ID, {
    variables: {
      getServiceRequestByIdId: `${id}`
    }
  });
  const { addToast } = useToasts();
  const history = useHistory();

  if (jobPostingQuery.loading) {
    return <Loader />;
  }

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
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

                <Button
                  onClick={clickDetails}
                  rounded
                  className="button is-info is-medium mx-5 px-6"
                >
                  View Details
                </Button>
                <Button
                  onClick={clickReschedule}
                  rounded
                  className="button is-info is-medium mx-5 px-6"
                >
                  Reschedule
                </Button>
                <Button
                  onClick={clickEdit}
                  rounded
                  className="button is-info is-medium mx-5 px-6"
                >
                  Edit
                </Button>
                <Button
                  rounded
                  className="button is-danger is-medium mx-5 px-6"
                >
                  Cancel
                </Button>
              </Section>
              <Section>
                <Content>
                  <Columns>
                    <Columns.Column>
                      Provider Name: Lasith Malinga
                    </Columns.Column>
                    <Columns.Column>Service Date: 05-09-2018</Columns.Column>
                    <Columns.Column>Service Time: 13:05 a.m</Columns.Column>
                  </Columns>
                </Content>
              </Section>

              <Section>
                <Content>
                  <Columns>
                    <Columns.Column>
                      Agrred Price Range: 500 -700 LKR
                    </Columns.Column>
                    <Columns.Column>
                      Service Provider Estimate: 650 LKR
                    </Columns.Column>
                    <Columns.Column>Approval Status: Accepted</Columns.Column>
                  </Columns>
                </Content>
              </Section>
            </Container>
          </Layout>
        );
      case 1:
        return (
          <Layout>
            <Header />
            <Container>
              <Section>
                <Content>
                  <h1>Service Request details</h1>
                </Content>

                <Button
                  onClick={clickDetails}
                  rounded
                  className="button is-info is-medium mx-5 px-6"
                >
                  View Details
                </Button>
                <Button
                  onClick={clickReschedule}
                  rounded
                  className="button is-info is-medium mx-5 px-6"
                >
                  Reschedule
                </Button>
                <Button
                  onClick={clickEdit}
                  rounded
                  className="button is-info is-medium mx-5 px-6"
                >
                  Edit
                </Button>
                <Button
                  rounded
                  className="button is-danger is-medium mx-5 px-6"
                >
                  Cancel
                </Button>

                <Content2>
                  <FormContainer>
                    <h3>Reschedule the Service Request</h3>
                    <Form
                      onSubmit={event => {
                        event.preventDefault();
                        console.log(values);
                        rescheduleServiceRequest({
                          variables: {
                            ...values
                          }
                        });
                      }}
                    >
                      <InputContainer>
                        <Label htmlFor="date-input">Resheduled date</Label>
                        <Input
                          id="date-input"
                          type="date"
                          name={'createServiceRequestDate'}
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
                          name={'createServiceRequestTime'}
                          placeholder="E.g. john@mail.com"
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
      case 2:
        return (
          <Layout>
            <Header />
            <Container>
              <Section>
                <Content>
                  <h1>Service Request details</h1>
                </Content>

                
                <Button
                  onClick={clickDetails}
                  rounded
                  className="button is-info is-medium mx-5 px-6"
                >
                  View Details
                </Button>
                <Button
                  onClick={clickReschedule}
                  rounded
                  className="button is-info is-medium mx-5 px-6"
                >
                  Reschedule
                </Button>
                <Button
                  onClick={clickEdit}
                  rounded
                  className="button is-info is-medium mx-5 px-6"
                >
                  Edit
                </Button>
                <Button
                  rounded
                  className="button is-danger is-medium mx-5 px-6"
                >
                  Cancel
                </Button>

                <Content2>
                  <FormContainer>
                    <h3>Edit the Service Request</h3>
                    <Form
                      onSubmit={event => {
                        event.preventDefault();
                        console.log(values);
                        editServiceRequest({
                          variables: {
                            ...values
                          }
                        });
                      }}
                    >
                      <InputContainer tw="flex-1">
                        <Label htmlFor="job-input">Job Description</Label>
                        <TextArea
                          id="job-input"
                          name={'createServiceRequestTask'}
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
                          name={'createServiceRequestImage1'}
                          accept="image/*"
                          onChange={handleChange}
                        />
                        <input
                          type="file"
                          name={'createServiceRequestImage2'}
                          accept="image/*"
                          onChange={handleChange}
                        />
                        <input
                          type="file"
                          name={'createServiceRequestImage3'}
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
