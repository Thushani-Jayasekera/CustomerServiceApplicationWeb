import React, { useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header"
import tw from "twin.macro";
import styled from "styled-components"
import { gql, useMutation, useQuery } from "@apollo/client";
import  Loader from "../components/utils/Loader";
import {GET_ME} from "../gql/query";
import {ADD_DETAILS} from "../gql/mutation";
// Styling
const Container = tw.div`relative flex justify-center`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1 items-center`;
const MainContainer = tw.div`lg:w-2/3  p-6 sm:p-12`;
const Heading = tw.h1`text-2xl xl:text-3xl  font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto lg:max-w-lg max-w-sm`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Select = tw.select`w-full px-8 py-4 rounded-lg appearance-none font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:border-gray-400 focus:outline-none focus:bg-white mt-5 first:mt-0`
const Label = tw.label`block mb-1 pt-3`
const InputContainer = tw.div`md:w-2/3 md:flex-grow`
const Span = tw.span`text-sm pt-4 mt-4`
const TextArea = styled(Input).attrs({as:"textarea"})`
`;
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

const AddDetailsPage = ({history})=>{
  const [values,setValues] = useState({});
  const {loading,error,data} = useQuery(GET_ME);
  const [registerServiceRequester,{loading_mutation,error_mutation}] = useMutation(ADD_DETAILS,{
    onCompleted:data =>{
      history.push('/')
    }
  })
  if(loading){
    return <Loader/>
  }
  const handleChange = event=>{
    setValues({
      ...values,
      [event.target.name]:event.target.value
    })
  };

  return(
    <Layout>
      <Header/>
      <Container>
        <Content>
          <MainContainer>
            <Heading>Hello {data.me.username} !</Heading>
            <div>
              <Span>Give us more details about you for a better service</Span>
            </div>            
            <FormContainer>
              <Form onSubmit={
                event=>{
                  event.preventDefault();
                  console.log(values);
                  registerServiceRequester({
                    variables:{
                      ...values
                    }
                  })
                }
              }>
                <div>
                  <Label>Contact Number</Label>
                  <Input type={"text"} name={"registerServiceRequesterContactNum"} placeholder={"Contact Number"} onChange={handleChange} required/>
                </div>
                <div>
                  <Label>Address</Label>
                  <Input  name={"registerServiceRequesterAddress"} placeholder={"Address"} onChange={handleChange} required/>
                </div>                <div>
                  <Label>City</Label>
                  <Input  name={"registerServiceRequesterCity"} placeholder={"City"} onChange={handleChange} required/>
                </div>
                <div>
                  <Label>Postal Code</Label>
                  <Input  name={"registerServiceRequesterPostalCode"} placeholder={"Postal Code"} onChange={handleChange} required/>
                </div>
                
              <SubmitButton>
                Confirm
              </SubmitButton>
              </Form>
            </FormContainer>
          </MainContainer>
        </Content>
      </Container>
    </Layout>
  )
}

export default AddDetailsPage