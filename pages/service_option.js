import React, { useState } from 'react';
import { useParams } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
const _ = require('underscore');
import Header from "../components/Header"
import {
  PrimaryButton,
  PrimaryButton2,
  PrimaryButton as PrimaryButtonBase,
  DisabledPrimaryButton as DisabledButtonBase
} from '../components/misc/Buttons.js';
import tw from 'twin.macro';
import styled from 'styled-components';
import { gql, NetworkStatus, useMutation, useQuery } from '@apollo/client';
import Loader from '../components/utils/Loader';
import { GET_PROVIDERS_BY_PROFESSION_IN_PROVINCE ,GET_ME} from '../gql/query';

import { css } from 'styled-components/macro'; //eslint-disable-line
import { Container, ContentWithPaddingXl } from '../components/misc/Layouts.js';
import { SectionHeading } from '../components/misc/Headings.js';
import profileImg from "../images/profile.png"
import Providers from '../components/Providers';
import Pagination from '../components/Pagination';
import { Columns, Form, Message, Box, Block } from "react-bulma-components";

import FeatherIcon from 'feather-icons-react';

const levenshtein = require('fast-levenshtein');
const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const Heading = tw(SectionHeading)``;
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
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-144 font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
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
)`text-sm rounded-full m-5 bg-green-500`;
const CardButton2 = tw(
  PrimaryButtonBase
)`text-sm rounded-full m-5 bg-blue-600`;
const CardButtonUnAvailable = tw(
  DisabledButtonBase
)`text-sm rounded-full m-5 bg-red-500`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;

const SelectOptionPage = ({ history }) => {
  const { type } = useParams();
  const [checked, setChecked] = useState(false);
  const [citychecked, setCityChecked] = useState(false);
  const [values, setValues] = useState({ profession: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [tilesPerPage, setTilesPerPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');
  const [city,setCity]=useState('');
  const [province,setProvince]=useState('');
  const [rating,setRating]=useState('');
  const { loading, error, data, refetch , networkStatus} = useQuery(
    GET_PROVIDERS_BY_PROFESSION_IN_PROVINCE,
    {
      variables: {
        searchServiceProviderbyProfessioninProvinceProfession: `${type}`,
        searchServiceProviderbyProfessioninProvinceProvince:province,
        searchServiceProviderbyProfessioninProvinceCity:city,
        searchServiceProviderbyProfessioninProvinceRating:rating
      },
      notifyOnNetworkStatusChange:true,
    }
  );

  const meQuery=useQuery(GET_ME);
  if(networkStatus===NetworkStatus.refetch) return <Loader />;
  if (loading||meQuery.loading) return <Loader />;

  const me_id=meQuery.data.me.id

  const  heading = 'Explore Service Providers';
  const items = data.searchServiceProviderbyProfessioninProvince;

  const MIN_DISTANCE=3;
  
  console.log(items);

  const handleChange = event => {
    setRating( event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleCheck = event => {
    setChecked(!checked);
    console.log(checked,"province");
    if(!checked){
      setProvince(meQuery.data.me.province);
      setValues({
        ...values,
        [event.target.name]: meQuery.data.me.province
      });

    }else{
      setProvince('');
      setValues({
        ...values,
        [event.target.name]:''
      });
    }
  
   
    refetch();
  };

  const handleCityCheck = event => {
    setCityChecked(!citychecked);
    console.log(citychecked,"city");
    if(!citychecked){
      setCity(meQuery.data.me.city);
      console.log(city);
      setValues({
        ...values,
        [event.target.name]: meQuery.data.me.city
      })

    }else{
      console.log(citychecked,"ciy");
      setCity('');
      setValues({
        ...values,
        [event.target.name]:''
      });
    }
    refetch();
  
  };

  const paginate=(pageNumber)=>setCurrentPage(pageNumber);

  const indexOfLastPost=currentPage*tilesPerPage;
  const indexOfFirstPost=indexOfLastPost-tilesPerPage;
  const currentPosts=items.slice(indexOfFirstPost,indexOfLastPost)

  return (
    <Layout>
      <Container>
        <Header/>
        <ContentWithPaddingXl>
          <HeaderRow>
            <Heading>{heading}</Heading>
          </HeaderRow>
          <br/>
          {/*{city},{province},{rating}*/}
          <Container>
            <Columns>

              <Form.Input
                type="text"
                placeholder="Enter Service Provider Name"
                onChange={event => {
                  setSearchTerm(event.target.value);
                }}/>
              <br/>
              <FeatherIcon icon="filter"/>
              <Container>
                <Block>
                  <label>
                    Sort By
                    <select class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                            name={'searchServiceProviderbyProfessioninProvinceRating'}
                            onChange={handleChange}
                            value={rating}>
                      <option value=''>Rating {rating}</option>
                      <option value='0'>Highest to Lowest</option>
                      <option value='1'>Lowest to Highest</option>
                    </select>
                  </label>
                </Block>
              </Container>
              <Block>
                <label>
                  <input
                    type="checkbox"
                    className="mx-5"
                    checked={checked}
                    onChange={handleCheck}
                    name={'searchServiceProviderbyProfessioninProvinceProvince'}
                  />
                  View Providers only in my province
                </label>

                <label>
                  <input
                    type="checkbox"
                    className="mx-5"
                    checked={citychecked}
                    onChange={handleCityCheck}
                    name={'searchServiceProviderbyProfessioninProvinceCity'}
                  />
                  View Providers only in my city
                </label>
              </Block>

            </Columns>
          </Container>
          <Providers items={items} loading={loading} searchTerm={searchTerm} me_id={me_id}/>



          {items.length === 0 && (
            <Message color={'danger'} mt={4}>
              <Message.Body>Sorry, No Providers Found as {type}s. Visit us Later!</Message.Body>
            </Message>
          )}
        </ContentWithPaddingXl>
      </Container>
    </Layout>

  );
};

export default SelectOptionPage;
