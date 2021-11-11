import React, { useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header"
import tw from "twin.macro";
import styled from "styled-components"
import { gql, useMutation, useQuery } from "@apollo/client";
import  Loader from "../components/utils/Loader";
import { GET_ALL_SERVICE_TYPES, GET_ME } from "../gql/query";
import {MAKE_ME_SERVICE_PROVIDER} from "../gql/mutation";
import { useToasts } from "react-toast-notifications";
import * as provinces from "../data/provinces.json";
import * as towns from "../data/towns.json";
// Styling
const Container = tw.div`relative flex justify-center`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1 items-center`;
const MainContainer = tw.div`lg:w-1/2  p-6 sm:p-12`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
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

const ServiceProviderRegisterPage = ({history})=>{
  const {addToast} = useToasts()
  const [values,setValues] = useState({
    makeMeServiceProviderProvince:"Northern",
    makeMeServiceProviderCity:"Jaffna",
    makeMeServiceProviderTown:"Allaipiddi"
  });
  const {loading,error,data} = useQuery(GET_ME);
  const servicesQuery = useQuery(GET_ALL_SERVICE_TYPES)
  const [makeMeServiceProvider,{loading_mutation,error_mutation}] = useMutation(MAKE_ME_SERVICE_PROVIDER,{
    onCompleted:data =>{
      addToast("Successfully send request for service provider account",{appearance:"success"})
      history.push('/')
    },
    onError:error=>{
      addToast(error.message.substr(15),{appearance:"error"})
    }
  })
  const [image,setImage] = useState({})
  const [imagePresent,setImagePresent] = useState(false)
  if(loading || servicesQuery.loading) {
    return <Loader/>
  }
  const handleChange = event=>{
    setValues({
      ...values,
      [event.target.name]:event.target.value
    })
  };
  const handleSubmit = event=>{
    event.preventDefault();
    if (imagePresent){
      const formData = new FormData()
      formData.append("file",image)
      formData.append("upload_preset","huhs8y0f")
      formData.append("cloud_name","ded0k5ukr")
      fetch("https://api.cloudinary.com/v1_1/ded0k5ukr/upload",{
        method:"post",
        body:formData
      }).then((resp)=>{
        resp.json().then(data=>{
          addToast("Image upload successful",{appearance:"success"})
          makeMeServiceProvider({
            variables:{
              ...values,
              profileUrl:data.url
            }
          })
        })
      }).catch((err)=>{
        addToast("Image upload error",{appearance:"error"})
        console.log(err)
      })
    }else{
      makeMeServiceProvider({
        variables:{
          ...values
        }
      })
    }
  }

  return(
    <Layout>
      <Header/>
      <Container>
        <Content>
          <MainContainer>
            <Heading>Register as Service provider</Heading>
            <div>
              <Span>Logged in as : </Span>
              <Span>{data.me.username}</Span>
            </div>
            <div>
              <Span>Email : </Span>
              <Span>{data.me.email}</Span>
            </div>            <FormContainer>
              <Form onSubmit={handleSubmit}>

                <div>
                  <Label>Full Name</Label>
                  <Input type={"text"} name={"makeMeServiceProviderFullname"} placeholder={"Fullname"} onChange={handleChange}/>
                </div>
                <div>
                  <Label>NIC</Label>
                  <Input type={"text"} name={"makeMeServiceProviderNic"} placeholder={"NIC"} onChange={handleChange} pattern={"(^[0-9]{9}[vVxX]$)|(^[0-9]{7}[0][0-9]{4}$)"} />
                </div>                <div>
                 <Label>Profession</Label>
                 <Select  name={"makeMeServiceProviderProfession"} onChange={handleChange}>
                   {servicesQuery.data.viewAllServiceTypes.map((item,key)=><option key={key}>{item.user_type}</option>)}
                 </Select>
                </div>
                <div>
                  <Label>Address</Label>
                  <Input  name={"makeMeServiceProviderAddress"} placeholder={"Address"} onChange={handleChange} />
                </div>                  <div>
                  <Label>Province</Label>
                <select  name={"makeMeServiceProviderProvince"}
                         onChange={handleChange}
                         required tw={"w-full px-8 py-4 rounded-lg"}>
                  {Object.keys(provinces).map((item,key)=>{
                    return <option key={key}>{item}</option>
                  })}
                </select>
                </div>                <div>
                  <Label>City</Label>
                <select  name={"makeMeServiceProviderCity"}
                         placeholder="City"
                         onChange={handleChange} required tw={"w-full px-8 py-4 rounded-lg"}>
                  {provinces[values.makeMeServiceProviderProvince].map((item,key)=><option key={key}>{item}</option>)}
                </select>
                </div>
                <div>
                  <Label>Town/SubUrb</Label>

                  <select  name={"makeMeServiceProviderTown"}
                           placeholder="Town"
                           onChange={handleChange}
                           required
                           tw={"w-full px-8 py-4 rounded-lg"}>
                    {towns[values.makeMeServiceProviderCity].cities.map((item,key)=><option key={key}>{item}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Postal Code</Label>
                  <Input  name={"postalCode"} placeholder={"PostalCode"} onChange={handleChange} />
                </div>
                <div>
                <Label>Contact Number</Label>
                <Input  name={"makeMeServiceProviderContactNumber"} placeholder={"Contact Number"} onChange={handleChange} pattern={"^\\+(?:[0-9] ?){6,14}[0-9]$"}
                        title="Provide phone number in correct format"
                />
              </div>
                <div>
                  <Label>Short Bio</Label>
                  <TextArea name={"makeMeServiceProviderBio"} onChange={handleChange} />
                </div>
                <div>
                  <Label>
                    Profile image (optional, .png,.jpg,.bmp accepted)
                  </Label>
                  <Input type={"file"} accept={"image/*"} onChange={(event)=>{setImage(event.target.files[0]);setImagePresent(true)}} />
                </div>
              <SubmitButton>
                Send request
              </SubmitButton>
              </Form>
            </FormContainer>
          </MainContainer>
        </Content>
      </Container>
    </Layout>
  )
}

export default ServiceProviderRegisterPage