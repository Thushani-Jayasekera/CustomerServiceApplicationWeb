import React, { useState } from 'react';
import { useParams } from 'react-router';
import { CREATE_SERVICE } from '../../gql/mutation';
import Layout from '../../components/Layout';
import AdminNavbar from '../../components/AdminNavbar';
import tw from 'twin.macro';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import Loader from '../../components/utils/Loader';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// *************************************Stylings***************************************
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Form = tw.form`mx-auto lg:max-w-lg max-w-sm`;
const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-green-600 text-gray-100 rounded-lg relative`}
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
// ***********************************End of styling******************************************

const AddService = ({ history }) => {
  const [values, setValues] = useState({});

  const [createService, { loading, error }] = useMutation(CREATE_SERVICE, {
    onCompleted: data => {
      history.push('/admin/addService');
    }
  });
  if (loading) {
    return <Loader />;
  }

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Container>
      <AdminNavbar />
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Add New Service</h2>
            <Form
              onSubmit={event => {
                event.preventDefault();
                console.log(values);
                createService({
                  variables: {
                    ...values
                  }
                });
              }}
            >
              <InputContainer>
                <Label htmlFor="date-input">Service Name</Label>
                <Input
                  id="date-input"
                  type="text"
                  name={'createServiceServiceName'}
                  placeholder="Service Name"
                  onChange={handleChange}
                  required
                />
              </InputContainer>

              <InputContainer>
                <Label htmlFor="date-input">User Type</Label>
                <Input
                  id="date-input"
                  type="text"
                  name={'createServiceUserType'}
                  placeholder="User Type"
                  onChange={handleChange}
                  required
                />
              </InputContainer>

              <InputContainer tw="flex-1">
                <Label htmlFor="job-input">Service Description</Label>
                <TextArea
                  id="job-input"
                  name={'createServiceDescription'}
                  placeholder="Details about the type of service"
                  onChange={handleChange}
                  required
                />
              </InputContainer>

              <InputContainer tw="flex-1">
                <Label htmlFor="name-input">Add a Display Image</Label>
                <input
                  type="file"
                  name={'createServiceImage'}
                  accept="image/*"
                  onChange={handleChange}
                />
              </InputContainer>

              <SubmitButton type="submit" value="Submit">
                ADD SERVICE
              </SubmitButton>
            </Form>
          </div>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default AddService;
