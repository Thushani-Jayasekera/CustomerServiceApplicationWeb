import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
//import {Header} from '../components/Layout';
import { motion } from 'framer-motion';
const _ = require('underscore');
import  Header from "../components/Header"
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

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const Heading = tw(SectionHeading)``;

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
const CardContainer2 = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:pr-10 md:pr-6 lg:pr-12`;//
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
)`text-sm rounded-full m-5 bg-green-500`;
const CardButton2 = tw(
  PrimaryButtonBase
)`text-sm rounded-full m-5 bg-yellow-600`;
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
  const service_types=useQuery(GET_ALL_SERVICE_TYPES);
  if (loading || service_providers.loading||service_types.loading) return <Loader />;

  heading = 'Explore Service Providers';
  const items = service_providers.data.viewAllServiceProviders;
  //const tabs = _.countBy(items, function(items) {
    //return items.profession;
  //});
  //const tabKeys = Object.keys(tabs);
  //console.log(tabKeys);
  const types=service_types.data.viewAllServiceTypes;
  console.log(types);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };



  return (
<>
<Header/>
    <Container>
      
      <ContentWithPaddingXl>
        <HeaderRow>
          <Actions>
            <input
              type="text"
              placeholder="Enter Service Provider Name"
              onChange={event => {
                setSearchTerm(event.target.value);
              }}
            />
            
          </Actions>

        </HeaderRow>

        <HeaderRow>
          <Heading>Select What You Want to get Done!</Heading>
        </HeaderRow>
      
        {types.map((type, index) => (
              <CardContainer2 key={index}>
               
                <Card className="group" href={`/service_requester/selectOption/${type.user_type}`}initial="rest" whileHover="hover" animate="rest">
                  <CardImageContainer imageSrc={type.image}>
 
                    <CardHoverOverlay
                      variants={{
                        hover: {
                          opacity: 1,
                          height: "auto"
                        },
                        rest: {
                          opacity: 0,
                          height: 0
                        }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardText><CardContent>{type.description}</CardContent></CardText>
                    </CardHoverOverlay>
                  </CardImageContainer>
                  <CardText>
                    <CardTitle>{type.service_name}</CardTitle>
                    
                  </CardText>
                </Card>
               
              </CardContainer2>
            ))}

       
        
       

{items
          .filter(val => {
            console.log(val);
            if (searchTerm == '') {
              if(val.roles.includes("service_provider")){
                return val;
              }
              
            } else if (
              val.username.toLowerCase().includes(searchTerm.toLowerCase()) && val.roles.includes("service_provider")
            ) {
              return val;
            }
          })
          .map((card, index) => (
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
                        'data:image/jpeg;base64,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'
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
                    <IconWithText>
                    <IconContainer>
                    <FeatherIcon icon="map-pin" />
                    </IconContainer>
                    <Text>{card.city}</Text>
                  </IconWithText>
                  
                      
                    </CardText>
                  </Column>
                  <Column>
                    <CardButton2>View Profile</CardButton2>
                    {card.service_providing_status === true ? (
                      <CardButton>
                        <Link
                          to={{
                            pathname: `/service_requester/createRequest/${card.id}`
                          }}
                        >
                          Hire Now
                        </Link>
                      </CardButton>
                    ) : (
                      <CardButtonUnAvailable>
                        Not Available
                      </CardButtonUnAvailable>
                    )}
                  </Column>
                </TwoColumn>
              </Card>
            </CardContainer>
          ))}
      </ContentWithPaddingXl>
    </Container>
    </>
  );
};

export default ServiceRequesterWelcomePage;
