import React from "react";
import {GET_ME_AS_SERVICE_PROVIDER} from "../gql/query";
import { useQuery } from "@apollo/client";
import Loader from "../components/utils/Loader";
import {Redirect} from "react-router-dom";
import {SectionHeading} from "../components/misc/Headings"
import styled from "styled-components";
import tw from 'twin.macro'
import Header from "../components/Header";


const ServiceProviderProfilePage = ()=>{
   const {loading,error,data} = useQuery(GET_ME_AS_SERVICE_PROVIDER);
   if(loading) return <Loader/>
   if(error) return <Redirect to={"/login"}/>

   const Container =  tw.div`relative`;
  const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
  const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`
  const ImageColumn = tw(Column)`md:w-6/12 lg:w-5/12 flex-shrink-0 h-80 md:h-auto`;
  const TextColumn = styled(Column)(props => [
    tw`md:w-6/12 mt-8 md:mt-0`,
    tw`md:ml-8 lg:ml-16 md:order-last`
  ]);
  const TextContent = tw.div`lg:py-8`;
  const Heading = tw(SectionHeading)`text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
  const Description = tw.p`text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-4`
  const Image = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`rounded bg-cover bg-center h-1/2`,
  ]);
  const Details = tw.div`mt-6 lg:mt-8 xl:mt-16 flex flex-wrap`
  const Detail = tw.div`text-lg sm:text-2xl lg:text-3xl w-1/2 mt-4 lg:mt-10 text-center md:text-left`
  const Value = tw.div`font-bold text-primary-500`
  const Key = tw.div`font-medium text-gray-700`
   return(
     // <div>
     //    <h1>{data.me.username}</h1>
     //    <h2>{data.me.email}</h2>
     //    <span>{data.me.nic}</span><br/>
     //   <span>{data.me.profession}</span><br/>
     //   <span>{data.me.province}</span><br/>
     //   <span>{data.me.city}</span><br/>
     //   <span>{data.me.town}</span><br/>
     //   <span>{data.me.bio}</span><br/>
     //   <span>{data.me.service_providing_status}</span><br/>
     //
     // </div>
     <>
       <Header/>
       <Container>
           <TwoColumn>
              <ImageColumn>
                <Image imageSrc={"https://images.unsplash.com/photo-1582564286939-400a311013a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80"}/>
              </ImageColumn>
             <TextColumn>
              <TextContent>
                <Heading>{data.me.username}</Heading>
                <Description>{data.me.bio}</Description>
                <Details>
                  <Detail>
                    <Key>Email</Key>
                    <Value>{data.me.email}</Value>
                    <Key>Profession</Key>
                    <Value>{data.me.profession}</Value>
                    <Key>Province</Key>
                    <Value>{data.me.province}</Value>
                    <Key>City</Key>
                    <Value>{data.me.city}</Value>
                    <Key>Town</Key>
                    <Value>{data.me.town}</Value>
                    <Key>Active status</Key>
                    <Value>{(data.me.sevice_providing_status)?"Active":"On Vacation"}</Value>
                  </Detail>
                </Details>
              </TextContent>
             </TextColumn>
           </TwoColumn>
       </Container>
       </>
   )
}

export default ServiceProviderProfilePage