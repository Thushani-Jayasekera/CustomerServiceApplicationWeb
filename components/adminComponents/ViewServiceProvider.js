import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Block,
  Columns,
  Container,
  Content,
  Level,
  Section
} from 'react-bulma-components';
import { MapPin } from 'react-feather';
import profileImg from '../../images/user.jpg';
import Layout from '../Layout';
import Header from '../Header';

function ViewServiceProvider() {
  const { state } = useLocation();
  return (
    <Layout>
      <Header />
      <Container>
        <Content>
          <Section>
            <Level>
              <Level.Item>
                <h1>Profile page </h1>
              </Level.Item>
            </Level>
          </Section>
          <Section>
            <Columns>
              <Columns.Column>
                <Level>
                  <Level.Item>
                    <img src={profileImg} width={'256px'} />
                  </Level.Item>
                </Level>
              </Columns.Column>
              <Columns.Column>
                <Level>
                  <Level.Side>
                    <Level.Item>
                      <h3>{state.users.fullname}</h3>
                    </Level.Item>
                  </Level.Side>
                  <Level.Item>
                    <h6>
                      {' '}
                      <MapPin /> {state.users.city}
                    </h6>
                  </Level.Item>
                </Level>
                <Level>
                  <Level.Side>
                    <Level.Item>
                      <Block textColor={'info'}>{state.users.username}</Block>
                    </Level.Item>
                  </Level.Side>
                </Level>
                <Level>
                  <Level.Side align={'left'}>
                    <Level.Item>
                      <h6>NIC :{state.users.nic}</h6>
                    </Level.Item>
                  </Level.Side>
                </Level>
                <Level>
                  <Level.Side align={'left'}>
                    <Level.Item>
                      <h6>{state.users.profession}</h6>
                    </Level.Item>
                  </Level.Side>
                </Level>
                <Level>
                  <Level.Side>
                    <Level.Item>
                      <p className={'has-text-link'}>{state.users.bio}</p>
                    </Level.Item>
                  </Level.Side>
                </Level>
                <Level>Rating Area</Level>
                <Level>Send message</Level>
                <Section>
                  <h6>Contact Information</h6>
                  <ul>
                    <li>
                      <Level>
                        <Level.Side>
                          <Block textWeight={'bold'}>Contact Num</Block>
                        </Level.Side>
                        <Level.Side align={'right'}>
                          {state.users.contactNum}
                        </Level.Side>
                      </Level>
                    </li>
                    <li>
                      <Level>
                        <Level.Side>
                          <Block textWeight={'bold'}>Address</Block>
                        </Level.Side>
                        <Level.Side align={'right'}>
                          {state.users.address}
                        </Level.Side>
                      </Level>
                    </li>
                    <li>
                      <Level>
                        <Level.Side>
                          <Block textWeight={'bold'}>Email</Block>
                        </Level.Side>
                        <Level.Side align={'right'}>
                          {state.users.email}{' '}
                        </Level.Side>
                      </Level>
                    </li>
                  </ul>
                </Section>
              </Columns.Column>
            </Columns>
          </Section>
        </Content>
      </Container>
    </Layout>
  );
}

export default ViewServiceProvider;
