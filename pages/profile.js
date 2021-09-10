import React from "react";
//import AcceptedRequests from "../components/Cards/AcceptedRequests";
import { Container, ContentWithPaddingXl } from '../components/misc/Layouts.js';
import {GET_ACCEPTED_SERVICE_REQUESTS_OF_ME, GET_PENDING_SERVICE_REQUESTS_OF_ME} from "../gql/query";
import Header from "../components/Header"
import tw from 'twin.macro';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import {Redirect} from "react-router-dom";
import { useQuery } from '@apollo/client';
import Loader from '../components/utils/Loader';
import { SectionHeading } from '../components/misc/Headings.js';
import {
  PrimaryButton,
  PrimaryButton2,
  PrimaryButton as PrimaryButtonBase,
  DisabledPrimaryButton as DisabledButtonBase
} from '../components/misc/Buttons.js';

const Row = tw.div`flex flex-col lg:flex-row -mb-10`;
const Heading = tw(SectionHeading)`text-left lg:text-4xl xl:text-5xl`;

const CardButton2 = tw(
  PrimaryButtonBase
)`text-sm rounded-full m-5 bg-yellow-600`;
const PopularPostsContainer = tw.div`lg:w-2/3`;
const PostsContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
const Post = tw(motion.a)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Image = styled(motion.div)(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-64 bg-cover bg-center rounded`
]);
const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
const Description = tw.p`mt-2 font-medium text-secondary-100 leading-loose text-sm`;
const AuthorInfo = tw.div`mt-6 flex items-center`;
const AuthorImage = tw.img`w-12 h-12 rounded-full`;
const AuthorNameAndProfession = tw.div`ml-4`;
const AuthorName = tw.h6`font-semibold text-lg`;
const AuthorProfile = tw.p`text-secondary-100 text-sm`;
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
const ProfilePage=()=>{
  
    const { loading, error, data } = useQuery(GET_ACCEPTED_SERVICE_REQUESTS_OF_ME);
    const pending= useQuery(GET_PENDING_SERVICE_REQUESTS_OF_ME);
    if (loading|| pending.loading) return <Loader />;

    console.log(data);
    const acceptedRequests=data.acceptedServiceRequestsbyMe;
    const pendingRequests=pending.data.pendingServiceRequestsbyMe;
    console.log(pendingRequests);
    
    return(
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
    );
}

export default ProfilePage
