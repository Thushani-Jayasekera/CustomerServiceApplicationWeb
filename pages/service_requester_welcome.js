import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Columns } from 'react-bulma-components';
import { scroller } from 'react-scroll';
//import {Header} from '../components/Layout';
import { motion } from 'framer-motion';
const _ = require('underscore');
import Header from '../components/Header';
import {
  PrimaryButton,
  DisabledPrimaryButton as DisabledButtonBase,
  PrimaryButton as PrimaryButtonBase
} from '../components/misc/Buttons.js';
import FeatherIcon from 'feather-icons-react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { gql, useMutation, useQuery } from '@apollo/client';
import Loader from '../components/utils/Loader';
import {
  GET_ALL_SERVICE_PROVIDERS,
  GET_ALL_SERVICE_TYPES,
  GET_ME_AS_SERVICE_REQUESTER
} from '../gql/query';

import { css } from 'styled-components/macro'; //eslint-disable-line
import { Container, ContentWithPaddingXl } from '../components/misc/Layouts.js';
import { SectionHeading } from '../components/misc/Headings.js';
import welcomeImage from '../images/welcomeImage.jpg';
import HowitWorks from '../images/HowitWorksImage.jpg';
import profileImg from '../images/profile.png';
const HeaderRow = tw.div`flex justify-between items-center flex-col `;
const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const Heading = tw(SectionHeading)`subpixel-antialiased text-lg `;
const Heading2 = tw(SectionHeading)`text-gray-700  `;
const Actions = styled.div`
  ${tw`relative max-w-lg text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-144 font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-72 sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-full sm:pr-10 md:pr-6 lg:pr-12`;
const CardContainer2 = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const Card2 = tw(
  motion.a
)`bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
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
const CardButton = tw(PrimaryButtonBase)`text-sm rounded-full m-5 bg-green-500`;
const CardButton2 = tw(PrimaryButtonBase)`text-sm rounded-full m-5 bg-blue-600`;
const CardButtonUnAvailable = tw(
  DisabledButtonBase
)`text-sm rounded-full m-5 bg-red-500`;
const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;

const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const ServiceRequesterWelcomePage = ({ history }) => {
  const { name } = useParams();
  const [values, setValues] = useState({ profession: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data, fetchMore } = useQuery(
    GET_ME_AS_SERVICE_REQUESTER
  );
  const service_providers = useQuery(GET_ALL_SERVICE_PROVIDERS);
  const service_types = useQuery(GET_ALL_SERVICE_TYPES);
  if (loading || service_providers.loading || service_types.loading)
    return <Loader />;

  heading = 'Explore Service Providers';
  const items = service_providers.data.viewAllServiceProviders;
  //const tabs = _.countBy(items, function(items) {
  //return items.profession;
  //});
  //const tabKeys = Object.keys(tabs);
  //console.log(tabKeys);
  const types = service_types.data.viewAllServiceTypes;
  console.log(types);



  const scrollToSection = () => {
    scroller.scrollTo('howitworks', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  const scrollToSection2 = () => {
    scroller.scrollTo('selectType', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${welcomeImage})`,

          height: '500px',
          width: '100%',
          alignContent: 'center'
        }}
      >
        <br />
        <HeaderRow>
          <Heading>Get it Done by Quality Pros!</Heading>
        </HeaderRow>
        <br />
        <HeaderRow>
          <Column>
            <button tw="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={scrollToSection2}>
              {' '}
              Get Started!
            </button>
            <br />
            <button
              tw="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={scrollToSection}
            >
              {' '}
              How it works
            </button>
          </Column>
        </HeaderRow>
      </div>

      <Container>
        <ContentWithPaddingXl>
          
          <HeaderRow>
            <p tw="text-3xl font-sans">Select What You Want To Get Done!</p>
          </HeaderRow>
          <div className="selectType">
          <Columns>
          
            {types.map((type, index) => (
              <CardContainer2 key={index}>
                <Card2
                  className="group"
                  href={`/service_requester/selectOption/${type.user_type}`}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <CardImageContainer imageSrc={type.image}>
                    <CardHoverOverlay
                      variants={{
                        hover: {
                          opacity: 1,
                          height: 'auto'
                        },
                        rest: {
                          opacity: 0,
                          height: 0
                        }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardText>
                        <CardContent>{type.description}</CardContent>
                      </CardText>
                    </CardHoverOverlay>
                  </CardImageContainer>
                  <CardText>
                    <CardTitle>{type.service_name}</CardTitle>
                  </CardText>
                </Card2>
              </CardContainer2>
            ))}
          </Columns>

          {types.length === 0 && (
            <Message color={'danger'}>
              <Message.Body>Sorry, No Services Found. Visit us Later!</Message.Body>
            </Message>
          )}
          </div>

          <div className="howitworks">
            <HeaderRow>
              <Heading2>How it works!</Heading2>
            </HeaderRow>
            <div
              style={{
                backgroundImage: `url(${HowitWorks})`,

                height: '517px',
                width: '100%',
                alignContent: 'center'
                
              }}
            ></div>
          </div>
        </ContentWithPaddingXl>
      </Container>
    </>
  );
};

export default ServiceRequesterWelcomePage;
