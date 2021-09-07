import React, { useState } from 'react';
import { useParams } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
//import Header from '../components/Layout';
import { motion } from 'framer-motion';
const _ = require('underscore');
//import Header from "../components/Header"
import {
  PrimaryButton,
  PrimaryButton2,
  PrimaryButton as PrimaryButtonBase
} from '../components/misc/Buttons.js';
import tw from 'twin.macro';
import styled from 'styled-components';
import { gql, useMutation, useQuery } from '@apollo/client';
import Loader from '../components/utils/Loader';
import {
  GET_ALL_SERVICE_PROVIDERS,
  GET_ME_AS_SERVICE_REQUESTER
} from '../gql/query';

import { css } from 'styled-components/macro'; //eslint-disable-line
import { Container, ContentWithPaddingXl } from '../components/misc/Layouts.js';
import { SectionHeading } from '../components/misc/Headings.js';
const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;
const Actions = styled.div`
  ${tw`relative max-w-lg text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-72 sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const TabContent = tw(
  motion.div
)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-full sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props =>
    css`
      background-image: url(${props.imageSrc});
    `}
  ${tw`h-40  xl:h-40 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(
  PrimaryButtonBase
)`text-sm rounded-full m-5 bg-primary-200`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const Cards = tw.div`flex flex-wrap flex-row justify-center sm:max-w-2xl lg:max-w-5xl mx-auto`;
const Card2 = tw.div`mt-24 w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center`;
const CardImage2 = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`w-64 h-64 bg-contain bg-center rounded`}
`;
const CardContent2 = styled.div`
  ${tw`flex flex-col items-center mt-6`}
  .position {
    ${tw`uppercase font-bold tracking-widest text-xs text-primary-500`}
  }
  .name {
    ${tw`mt-1 text-xl font-medium text-gray-900`}
  9
`;

const CardLinks = styled.div`
  ${tw`mt-6 flex`}
  .link {
    ${tw`mr-8 last:mr-0 text-gray-400 hocus:text-primary-500 transition duration-300`}
    .icon {
      ${tw`fill-current w-6 h-6`}
    }
  }
`;

const ServiceRequesterWelcomePage = ({ history }) => {
  const { type } = useParams();
  const [values, setValues] = useState({ profession: '' });
  const { loading, error, data, fetchMore } = useQuery(
    GET_ME_AS_SERVICE_REQUESTER
  );
  const service_providers = useQuery(GET_ALL_SERVICE_PROVIDERS);
  if (loading || service_providers.loading) return <Loader />;

  heading = 'Explore Service Providers';
  const items = service_providers.data.viewAllServiceProviders;
  const tabs = _.countBy(items, function(items) {
    return items.profession;
  });
  const tabKeys = Object.keys(tabs);
  console.log(tabKeys);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Container>
        
      <ContentWithPaddingXl>
        <HeaderRow>
        <Actions>
          <input type="text" placeholder="Enter Service Provider Name" />
          <button>Search</button>
        </Actions>
          <Container>
            <PrimaryButton>Create a Job for Service Providers</PrimaryButton>
          </Container>
        </HeaderRow>

        <HeaderRow>
          <Header>Select What You Want to get Done!</Header>

        </HeaderRow>
        {tabKeys.forEach((keyname, index) => {
          console.log(`${keyname}`);
         
   
            //TODO// //render cards to select service type
        
        })}
        
        {items.map((card, index) => (
            //TODO View search results
          <CardContainer key={index}>
            <Card
              className="group"
              href={card.url}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <TwoColumn>
                <Column>
                  <CardImageContainer
                    imageSrc={
                      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80'
                    }
                  >
                    <CardRatingContainer>
                      <CardRating>{card.rating}</CardRating>
                      <CardReview>({card.reviews})</CardReview>
                    </CardRatingContainer>
                  </CardImageContainer>
                </Column>
                <Column>
                  <CardText>
                    <CardTitle>{card.username}</CardTitle>
                    <CardContent>{card.profession}</CardContent>
                    <CardContent>{card.bio}</CardContent>
                  </CardText>
                </Column>
                <Column>
                  <CardText>
                    <CardContent>{card.city}</CardContent>
                  </CardText>
                </Column>
                <Column>
                  <CardButton>View Profile</CardButton>
                  <CardButton>
                    <Link
                      to={{
                        pathname: `/service_requester/createRequest/${card.id}`
                      }}
                    >
                      Hire Now
                    </Link>
                  </CardButton>
                </Column>
              </TwoColumn>
            </Card>
          </CardContainer>
        ))}
        ;
      </ContentWithPaddingXl>
    </Container>
  );
};

export default ServiceRequesterWelcomePage;
