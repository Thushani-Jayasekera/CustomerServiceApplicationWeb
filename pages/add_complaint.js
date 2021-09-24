import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Header from "../components/Header"
import { MAKE_COMPLAINT } from "../gql/mutation";
import { GET_ME } from "../gql/query";
import  Loader from "../components/utils/Loader";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
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





const addComplaintPage = ({ history }) => {

  const [values,setValues] = useState({});
  const {loading,error,data} = useQuery(GET_ME);
  const [makeComplaint,{loading_mutation,error_mutation}] = useMutation(MAKE_COMPLAINT,{
    onCompleted:data =>{
      history.push('/');
      
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
<Container>
<Header/>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Submit a complaint</h2>
            <form onSubmit={
                event=>{
                  event.preventDefault();
                  console.log(values);
                  makeComplaint({
                    variables:{
                      ...values,
                      makeComplaintComplainer:data.me.id
                    }
                  })
                } }>
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input">What it is about?</Label>
                    <Input id="name-input" type="text" name="makeComplaintTitle" placeholder="E.g. Payment Fraud" onChange={handleChange} required/>
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="email-input">username related to the complaint (Optional)</Label>
                    <Input id="victim-input" type="text" name="makeComplaintVictim" onChange={handleChange} placeholder="E.g. JayUser124" />
                  </InputContainer>
                 
                </Column>
                <Column>
                  <InputContainer tw="flex-1">
                    <Label htmlFor="name-input">Your Message</Label>
                    <TextArea id="message-input" name="makeComplaintComplaint" placeholder="E.g. Details about your complaint"onChange={handleChange} required/>
                  </InputContainer>
                </Column>
              </TwoColumn>

              <SubmitButton type="submit" value="Submit">Submit</SubmitButton>
            </form>
          </div>
          
        </FormContainer>
      </Content>
    </Container>
);

}
export default addComplaintPage;