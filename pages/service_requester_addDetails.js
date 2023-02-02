import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import Header from '../components/Header';
import tw from 'twin.macro';
import styled from 'styled-components';
import { gql, useMutation, useQuery } from '@apollo/client';
import Loader from '../components/utils/Loader';
import { GET_ME } from '../gql/query';
import { ADD_DETAILS } from '../gql/mutation';
import { useToasts } from "react-toast-notifications";
// Styling
const Container = tw.div`relative flex justify-center`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-gradient-to-r from-blue-100 via-purple-500 to-blue-500 text-gray-900 shadow sm:rounded-lg flex justify-center flex-1 items-center`;
const MainContainer = tw.div`lg:w-2/3  p-6 sm:p-12 `;
const Heading = tw.h1`text-2xl xl:text-3xl  font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8 `;
const Form = tw.form`mx-auto lg:max-w-lg max-w-sm `;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Select = tw.select`w-full px-8 py-4 rounded-lg appearance-none font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:border-gray-400 focus:outline-none focus:bg-white mt-5 first:mt-0`;
const Label = tw.label`block mb-1 pt-3`;
const InputContainer = tw.div`md:w-2/3 md:flex-grow`;
const Span = tw.span`text-sm pt-4 mt-4`;
const TextArea = styled(Input).attrs({ as: 'textarea' })``;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
// End of styling

// GQL

//

const AddDetailsPage = ({ history }) => {
  const {addToast} = useToasts()
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({fullname:'',contactNum:''});
  const { loading, error, data } = useQuery(GET_ME, {
    onCompleted: data1 => {
      setValues({
        registerServiceRequesterContactNum: data1.me.contactNum,
        registerServiceRequesterFullname: data1.me.fullname,
        registerServiceRequesterAddress: data1.me.address,
        registerServiceRequesterCity: data1.me.city,
        registerServiceRequesterPostalCode: data1.me.postalCode
      });
    }
  });
  const [
    registerServiceRequester,
    { loading_mutation, error_mutation }
  ] = useMutation(ADD_DETAILS, {
    onCompleted: data => {
      addToast("Successfully added",{appearance:"success"})
      history.push('/');
    },
    onError:error=>{
      addToast(error.message.substr(15),{appearance:"error"})
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
    switch (event.target.name) {
      case 'registerServiceRequesterFullname': 
   
         event.target.value.length < 5
            ? errors.fullname='Full Name must be 5 characters long!'
            :errors.fullname= ''
        break;
      case 'registerServiceRequesterContactNum': 
       
          event.target.value.length !== 12
          ? errors.contactNum='Contact number should be in +947xxxxxxxx'
          :errors.contactNum=''
      
        break;


  };
  console.log(errors);

}




  return (
    <Layout>
      <Header />
      <Container>
        <Content>
          <MainContainer>
            <Heading>Hello {data.me.username} !</Heading>
            <div>
              <Span>
                <p tw="font-sans text-base">
                  Give us more details about you for a better service
                </p>
              </Span>
            </div>
            <FormContainer>
              <Form
                onSubmit={event => {
                  event.preventDefault();
                  console.log(values);
                  registerServiceRequester({
                    variables: {
                      ...values
                    }
                  });
                }}
              >
                <div>
                  <Label>Full Name</Label>
                  <p  tw="font-sans text-base text-pink-600 ">{errors.fullname}</p>
                  <Input
                    type={'text'}
                    name={'registerServiceRequesterFullname'}
                    placeholder={'Full Name'}
                    onChange={handleChange}
                    value={values.registerServiceRequesterFullname || ''}
                    required
                  />
                </div>
                <div>
                  <Label>Contact Number</Label>
                  <p  tw="font-sans text-base text-pink-600 ">{errors.contactNum}</p>
                  <Input
                    type={'text'}
                    name={'registerServiceRequesterContactNum'}
                    placeholder={'Contact Number'}
                    onChange={handleChange}
                    value={values.registerServiceRequesterContactNum || ''}
                    required
                  />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input
                    name={'registerServiceRequesterAddress'}
                    placeholder={'Address'}
                    onChange={handleChange}
                    value={values.registerServiceRequesterAddress || ''}
                    required
                  />
                </div>{' '}
                <div>
                  <Label>City</Label>
                  <Input
                    name={'registerServiceRequesterCity'}
                    placeholder={'City'}
                    value={values.registerServiceRequesterCity || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Postal Code</Label>
                  <Input
                    name={'registerServiceRequesterPostalCode'}
                    placeholder={'Postal Code'}
                    onChange={handleChange}
                    value={values.registerServiceRequesterPostalCode || ''}
                    required
                  />
                </div>
                <div>
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                    Read Get it Done's{' '}
                    <a href={''} tw="border-b border-gray-500 border-dotted">
                      Privacy Policy
                    </a>
                  </p>
                </div>
                <SubmitButton disabled={errors.fullname!==''|errors.contactNum!==''}>Confirm</SubmitButton>
              </Form>
            </FormContainer>
          </MainContainer>
        </Content>
      </Container>
    </Layout>
  );
};

export default AddDetailsPage;
