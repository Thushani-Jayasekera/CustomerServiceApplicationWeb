import React from "react";
import {GET_ACCEPTED_SERVICE_REQUESTS_FOR_ME, GET_ME_AS_SERVICE_PROVIDER, GET_PENDING_SERVICE_REQUESTS_FOR_ME} from "../gql/query";
import { useQuery } from "@apollo/client";
import Loader from "../components/utils/Loader";
import {Redirect} from "react-router-dom";
import {SectionHeading} from "../components/misc/Headings"
import styled from "styled-components";
import tw from 'twin.macro'
import Header from "../components/Header";
import { motion } from 'framer-motion';

import {
  PrimaryButton,
  PrimaryButton2,
  PrimaryButton as PrimaryButtonBase,
  DisabledPrimaryButton as DisabledButtonBase
} from '../components/misc/Buttons.js';
import { Container, ContentWithPaddingXl } from '../components/misc/Layouts.js';

const ServiceProviderProfilePage = ()=>{
   const {loading,error,data} = useQuery(GET_ME_AS_SERVICE_PROVIDER);
   const accepted = useQuery(GET_ACCEPTED_SERVICE_REQUESTS_FOR_ME);
   const pending= useQuery(GET_PENDING_SERVICE_REQUESTS_FOR_ME);
   if (loading|| pending.loading) return <Loader />;

   console.log(data);
   const acceptedRequests=accepted.data.acceptedServiceRequestsForMe;
   const pendingRequests=pending.data.pendingServiceRequestsForMe;
   console.log(pendingRequests);
   if(loading) return <Loader/>
   if(error) return <Redirect to={"/login"}/>

   //const Container =  tw.div`relative`;
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


  const Row = tw.div`flex flex-col lg:flex-row -mb-10`;
  const CardButton2 = tw(
    PrimaryButtonBase
  )`text-sm rounded-full m-5 bg-yellow-600`;
  const PopularPostsContainer = tw.div`lg:w-2/3`;
  const PostsContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
  const Post = tw(motion.a)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;

  const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
  const AuthorName = tw.h6`font-semibold text-lg`;

  const RecentPostsContainer = styled.div`
  ${tw`mt-24 lg:mt-0 `}
  ${PostsContainer} {
    ${tw`flex flex-wrap lg:flex-col  `}
  }
  ${Post} {
    ${tw`flex justify-between mb-10 max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
  }
  ${Title} {
    ${tw`text-base xl:text-lg mt-0 mr-4 lg:max-w-md`}
  }
  ${AuthorName} {
    ${tw`mt-3 text-sm text-secondary-100 font-normal leading-none`}
  }
  ${Image} {
    ${tw`h-20 w-20 flex-shrink-0`}
  }
`;
const PostTextContainer = tw.div``

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

       <Container>
        <ContentWithPaddingXl>
          <Row>
            <RecentPostsContainer>
              <Heading>Accepted Requests</Heading>
              <PostsContainer>
                {acceptedRequests.map((request, index) => (
                    
                <Post key={index} className="group">
                  <PostTextContainer>
                    <Title>{request.task}</Title>
                    <AuthorName>Provider ID: {request.provider_id}</AuthorName>
                    <AuthorName>Scheduled for {request.date} at {request.time}h </AuthorName>
                    <CardButton2>Edit</CardButton2>
                    <CardButton2>Reschedule</CardButton2>
                    <CardButton2>Cancel</CardButton2>
                  </PostTextContainer>
                  <Image />
                </Post>
                ))}
              </PostsContainer>
            </RecentPostsContainer>
            </Row>
        </ContentWithPaddingXl>
        <ContentWithPaddingXl>
          <Row>
            <RecentPostsContainer>
              <Heading>Pending Requests</Heading>
              <PostsContainer>
                {pendingRequests.map((request, index) => (
                    
                <Post key={index} className="group">
                  <PostTextContainer>
                    <Title>{request.task}</Title>
                    <AuthorName>Provider ID: {request.provider_id}</AuthorName>
                    <AuthorName>Scheduled for {request.date} at {request.time}h </AuthorName>
                    <CardButton2>Edit</CardButton2>
                    <CardButton2>Reschedule</CardButton2>
                    <CardButton2>Cancel</CardButton2>
                  </PostTextContainer>
                  <Image />
                </Post>
                ))}
              </PostsContainer>
            </RecentPostsContainer>
            </Row>
        </ContentWithPaddingXl>
       
      </Container>
       </>
   )
}

export default ServiceProviderProfilePage