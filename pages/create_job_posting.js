import React, { useState } from 'react';
import { useParams } from 'react-router';
import { ADD_JOB_POSTING } from '../gql/mutation';
import {
  GET_ALL_SERVICE_TYPES,
  GET_ME_AS_SERVICE_REQUESTER
} from '../gql/query';
import { useToasts } from 'react-toast-notifications';
import Layout from '../components/Layout';
import Header from '../components/Header';
import tw from 'twin.macro';
import styled from 'styled-components';
import { gql, useMutation, useQuery } from '@apollo/client';
import Loader from '../components/utils/Loader';
import { handleChangefn } from '../utils';
import * as towns from '../data/towns.json';
import * as provinces from '../data/provinces.json';
// import TextField from "@mui/material/TextField";
//import {ReactComponent as SvgDotPatternIcon} from "../images/dot-pattern.svg"
// Styling

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Form = tw.form`mx-auto lg:max-w-lg max-w-sm`;
const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-600 text-gray-100 rounded-lg relative`}
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
//const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`
// End of styling

//TODO// //Prevent from booking servcice requests for user it self
const CreateJobPostingPage = ({ history }) => {
  const [values, setValues] = useState({
    createJobPostingProvince: 'Northern',
    createJobPostingCity: 'Jaffna',
    createJobPostingTown: 'Allaipiddi'
  });
  const { loading, error, data } = useQuery(GET_ME_AS_SERVICE_REQUESTER);
  const serviceQuery = useQuery(GET_ALL_SERVICE_TYPES, {
    onCompleted: data => {
      setValues({
        ...values,
        createJobPostingCategory: data.viewAllServiceTypes[0].service_name
      });
    }
  });
  const { addToast } = useToasts();
  const [createJobPosting, state] = useMutation(ADD_JOB_POSTING, {
    onCompleted: data => {
      addToast('Success', { appearance: 'success' });
      history.push('/');
    },
    onError: error1 => {
      addToast('Error ', { appearance: 'error' });
    }
  });
  if (loading || serviceQuery.loading) {
    return <Loader />;
  }
  const handleChange = handleChangefn(setValues, values);
  const handleSubmit = event => {
    event.preventDefault();
    const lower = parseFloat(values.createJobPostingLowerLimit);
    const upper = parseFloat(values.createJobPostingUpperLimit);
    if (lower > upper) {
      addToast('Upper limit has to be greater than lower limit ', {
        appearance: 'error'
      });
      return;
    }
    createJobPosting({
      variables: {
        ...values,
        createJobPostingLowerLimit: lower,
        createJobPostingUpperLimit: upper
      }
    });
  };

  return (
    <Container>
      <Header />
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Create job posting</h2>
            <p>Creator {data.me.username}</p>
            <Form onSubmit={handleSubmit}>
              <InputContainer>
                <Label>Job Title</Label>
                <Input
                  type="text"
                  name={'createJobPostingHeading'}
                  placeholder="Job title"
                  onChange={handleChange}
                  required
                />
              </InputContainer>
              {/*<InputContainer>*/}
              {/*  <Label htmlFor="date-input">Pick a date</Label>*/}
              {/*  <Input*/}
              {/*    id="date-input"*/}
              {/*    type="date"*/}
              {/*    name={''}*/}
              {/*    placeholder="E.g. john@mail.com"*/}
              {/*    onChange={handleChange}*/}
              {/*    required*/}
              {/*  />*/}
              {/*</InputContainer>*/}

              {/*<InputContainer>*/}
              {/*  <Label htmlFor="time-input">Pick a time</Label>*/}
              {/*  <Input*/}
              {/*    id="time-input"*/}
              {/*    type="time"*/}
              {/*    name={'createServiceRequestTime'}*/}
              {/*    placeholder="E.g. john@mail.com"*/}
              {/*    onChange={handleChange}*/}
              {/*    required*/}
              {/*  />*/}
              {/*</InputContainer>*/}

              {/*<InputContainer>*/}
              {/*  <Label htmlFor="loc-input">Service Location</Label>*/}
              {/*  <Input*/}
              {/*    id="loc-input"*/}
              {/*    type="email"*/}
              {/*    name="location"*/}
              {/*    placeholder={data.me.address}*/}
              {/*    disabled={true}*/}
              {/*  />*/}
              {/*</InputContainer>*/}
              <InputContainer>
                <Label>Province</Label>
                <select
                  name={'createJobPostingProvince'}
                  placeholder="Province"
                  onChange={handleChange}
                  required
                >
                  {Object.keys(provinces).map((item, key) => {
                    return <option key={key}>{item}</option>;
                  })}
                </select>
              </InputContainer>
              <InputContainer>
                <Label>City</Label>
                <select
                  name={'createJobPostingCity'}
                  placeholder="City"
                  onChange={handleChange}
                  required
                >
                  {provinces[values.createJobPostingProvince].map(
                    (item, key) => (
                      <option key={key}>{item}</option>
                    )
                  )}
                </select>
              </InputContainer>
              <InputContainer>
                <Label>Town</Label>
                <select
                  name={'createJobPostingTown'}
                  placeholder="Town"
                  onChange={handleChange}
                  required
                >
                  {towns[values.createJobPostingCity].cities.map(
                    (item, key) => (
                      <option key={key}>{item}</option>
                    )
                  )}
                </select>
              </InputContainer>
              <InputContainer>
                <Label>Category</Label>
                <select
                  name={'createJobPostingCategory'}
                  placeholder="Category"
                  onChange={handleChange}
                  required
                >
                  {serviceQuery.data.viewAllServiceTypes.map((item, key) => (
                    <option key={key}>{item.service_name}</option>
                  ))}
                </select>
              </InputContainer>

              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="min-input">Price Range in (LKR)</Label>
                    <Input
                      id="min-input"
                      type="text"
                      name={'createJobPostingLowerLimit'}
                      placeholder="Min value"
                      onChange={handleChange}
                    />
                  </InputContainer>
                </Column>
                <Column>
                  <InputContainer>
                    <Input
                      id="max-input"
                      type="text"
                      name={'createJobPostingUpperLimit'}
                      placeholder="Max Value"
                      onChange={handleChange}
                    />
                  </InputContainer>
                </Column>
              </TwoColumn>

              {/*<InputContainer tw="flex-1">*/}
              {/*  <Label htmlFor="method-input">Payment Method</Label>*/}
              {/*  <select*/}
              {/*    name={'createJobPostingPaymentMethod'}*/}
              {/*    onChange={handleChange}*/}
              {/*  >*/}
              {/*    <option value="">Choose..</option>*/}
              {/*    <option value="1">Cash</option>*/}
              {/*    <option value="0">Card</option>*/}
              {/*  </select>*/}
              {/*</InputContainer>*/}

              <InputContainer tw="flex-1">
                <Label htmlFor="job-input">Job Description</Label>
                <TextArea
                  id="job-input"
                  name={'createJobPostingDescription'}
                  placeholder="E.g. Details about the job posting"
                  onChange={handleChange}
                  required
                />
              </InputContainer>
              {/*<InputContainer tw="flex-1">*/}
              {/*  <Label htmlFor="name-input">*/}
              {/*    Three Images of the issue you are facing (Optional)*/}
              {/*  </Label>*/}
              {/*  <input*/}
              {/*    type="file"*/}
              {/*    name={'createServiceRequestImage1'}*/}
              {/*    accept="image/*"*/}
              {/*    onChange={handleChange}*/}
              {/*  />*/}
              {/*  <input*/}
              {/*    type="file"*/}
              {/*    name={'createServiceRequestImage2'}*/}
              {/*    accept="image/*"*/}
              {/*    onChange={handleChange}*/}
              {/*  />*/}
              {/*  <input*/}
              {/*    type="file"*/}
              {/*    name={'createServiceRequestImage3'}*/}
              {/*    accept="image/*"*/}
              {/*    onChange={handleChange}*/}
              {/*  />*/}
              {/*</InputContainer>*/}

              <SubmitButton type="submit" value="Submit">
                Submit
              </SubmitButton>
            </Form>
          </div>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default CreateJobPostingPage;
