import React from 'react';
import {
  Block,
  Box,
  Button,
  Columns,
  Container,
  Content,
  Level,
  Section,
  Message
} from 'react-bulma-components';
import { useQuery } from '@apollo/client';
import {
  GET_ME,
  GET_REVIEWED_REQ_OF_PROVIDER,
  GET_USER_BY_ID,
  GET_USER_WITH_REVIEWS
} from '../gql/query';
import Loader from '../components/utils/Loader';
import { MapPin } from 'react-feather';
import profileImg from '../images/profile.png';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import ReactStars from 'react-rating-stars-component/dist/react-stars';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import SlideshowWithPagination from 'react-slideshow-with-pagination';
import tw from 'twin.macro';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/misc/Headings.js';
const _ = require('underscore');

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const Heading = tw(SectionHeading)``;
const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const ratingChanged = newRating => {
  setRating(newRating);
  console.log(newRating);
};

const ViewProfilePage = ({ history }) => {
  const { id } = useParams();
  console.log(id);
  const { loading, error, data } = useQuery(GET_USER_WITH_REVIEWS, {
    variables: {
      getUserbyIdId4: id,
      getReviewedRequestsofUserId2: id
    }
  });

  if (loading) {
    return <Loader />;
  }
  console.log(data);
  if (error) {
    console.log(error);
  }

  const requests = data.getReviewedRequestsofUser;
  return (
    <Layout>
      <Header />
      <Container>
        <Content>
          <Section>
            <Level>
              <Level.Item>
                <h1> @{data.getUserbyId.username} </h1>
              </Level.Item>
              <Level.Item>
                <h3>{data.getUserbyId.fullname}</h3>
              </Level.Item>
              <Level.Item>
                <h6>
                  {' '}
                  <MapPin /> {data.getUserbyId.town} {data.getUserbyId.city}
                </h6>
              </Level.Item>
            </Level>
          </Section>
          <Section>
            <Columns>
              <Columns.Column>
                <Level>
                  <Box>
                    <Level.Item>
                      <img
                        crossOrigin={'anonymous'}
                        src={data.getUserbyId.profile_url || profileImg}
                        width={'256px'}
                      />
                    </Level.Item>
                    <Level.Item className="mx-4">
                      <p className={'has-text-link'}>
                        "{data.getUserbyId.bio}"
                      </p>
                    </Level.Item>
                  </Box>
                </Level>
               <Section>
                    <>
                      {requests.length !== 0 ? (
                        <SlideshowWithPagination
                          showNumbers={true}
                          showDots={true}
                          showArrows={true}
                          autoplay={false}
                          enableMouseEvents={false}
                        >
                          {requests.map((request, index) => (
                            <Box key={index}>
                              <Box
                                class="has-background-link-light my-2 mx-2"
                                className="group"
                                href={request.url}
                                initial="rest"
                                whileHover="hover"
                                animate="rest"
                                box-radius={5}
                              >
                                <TwoColumn>
                                  <Column>
                                    <Container>
                                      <br />
                                      <CardText>
                                        <Columns>
                                          <FeatherIcon icon="tool" />
                                          <CardTitle>
                                            {' '}
                                            {request.task}...
                                          </CardTitle>
                                        </Columns>
                                        <br />
                                        <Columns>
                                          <FeatherIcon icon="calendar" />
                                          <CardTitle>
                                            {' '}
                                            Date - {request.date}
                                          </CardTitle>
                                        </Columns>
                                        <br />

                                        <FeatherIcon icon="user-check" />
                                        <CardTitle tw="font-style: italic">
                                          Customer Review-{' '}
                                          {request.requestReview}
                                        </CardTitle>

                                        <ReactStars
                                          count={5}
                                          onChange={ratingChanged}
                                          size={24}
                                          activeColor="#ffd700"
                                          id="star"
                                          value={request.requestRating}
                                          edit={false}
                                        />

                                        <br />
                                      </CardText>
                                    </Container>
                                  </Column>

                                  <Column>
                                    <div></div>
                                  </Column>
                                </TwoColumn>
                              </Box>
                            </Box>
                          ))}
                        </SlideshowWithPagination>
                      ) : (
                        <Message color={'danger'}>
                          <Message.Body>
                            No Reviewed Requests! Check Later
                          </Message.Body>
                        </Message>
                      )}
                    </>
                    </Section>
                <Box>
                  <Block textSize={3}>Ratings</Block>
                  {data.getUserbyId.provider_rating ? (
                    <Level>
                      <Level.Side align={'left'} textWeight={'bold'}>
                        Rating as a provider:
                      </Level.Side>
                      <Level.Side align={'right'}>
                        <Level.Item>
                          {data.getUserbyId.provider_rating &&
                            data.getUserbyId.provider_rating > 0 && (
                              <ReactStars
                                edit={false}
                                value={data.getUserbyId.provider_rating}
                                count={5}
                                size={36}
                              />
                            )}
                        </Level.Item>
                      </Level.Side>
                    </Level>
                  ) : (
                    <>
                      <Level.Side align={'left'} textWeight={'bold'}>
                        Not a provider of GetitDone
                      </Level.Side>
                    </>
                  )}
                  {data.getUserbyId.requester_rating ? (
                    <Level>
                      <Level.Side align={'left'} textWeight={'bold'}>
                        Rating as a requester:
                      </Level.Side>
                      <Level.Side align={'right'}>
                        <Level.Item>
                          {data.getUserbyId.requester_rating &&
                            data.getUserbyId.requester_rating > 0 && (
                              <ReactStars
                                edit={false}
                                value={data.getUserbyId.requester_rating}
                                count={5}
                                size={36}
                              />
                            )}
                        </Level.Item>
                      </Level.Side>
                    </Level>
                  ) : (
                    <>
                      <Level.Side align={'left'} textWeight={'bold'}>
                        Not a requester of GetitDone
                      </Level.Side>
                    </>
                  )}
                </Box>

                <Section>
                  <Box class="has-background-info-light" >
                    <h6>Contact Information</h6>
                    <ul>
                      <li>
                        <Level>
                          <Level.Side>
                            <Block textWeight={'bold'}>Contact Num</Block>
                          </Level.Side>
                          <Level.Side align={'right'}>
                            {data.getUserbyId.contactNum}
                          </Level.Side>
                        </Level>
                      </li>
                      <li>
                        <Level>
                          <Level.Side>
                            <Block textWeight={'bold'}>Address</Block>
                          </Level.Side>
                          <Level.Side align={'right'}>
                            {data.getUserbyId.address}
                          </Level.Side>
                        </Level>
                      </li>
                      <li>
                        <Level>
                          <Level.Side>
                            <Block textWeight={'bold'}>Email</Block>
                          </Level.Side>
                          <Level.Side align={'right'}>
                            {data.getUserbyId.email}
                          </Level.Side>
                        </Level>
                      </li>
                    </ul>
                  </Box>
                </Section>
              </Columns.Column>
            </Columns>
          </Section>
        </Content>
      </Container>
    </Layout>
  );
};

export default ViewProfilePage;
