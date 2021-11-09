import React, { useState } from 'react';
import {
  Columns,
  Container,
  Section,
  Content,
  Table,
  Row,
  Button,
  Box,
  
  Message
} from 'react-bulma-components';
import Layout from '../components/Layout';
import Header from '../components/Header';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import Loader from '../components/utils/Loader';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import { Redirect, useParams } from 'react-router';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import { GET_USER_BY_ID } from '../gql/query';
import { SEND_MSG } from '../gql/mutation';
const SetEmergencyPage = () => {
    const { id } = useParams(0);
    console.log(id);
    const history = useHistory();

    const {data,loading,error}= useQuery(GET_USER_BY_ID,{
        variables:{
            getUserbyIdId: id
        }
    });

    const [sendMessage, { loading_send, error_send }] = useMutation(
        SEND_MSG,
        {
          onCompleted: data => {
            addToast('Successfully sent the alert', { appearance: 'success' });
            setView({
              renderView: 0
            });
            //history.push('/');
            location.replace('/');
            
           
          },
          onError: error => {
            addToast('Failed ', { appearance: 'error' });
          }
        }
      );
    if (loading||loading_send) {
        return <Loader />;
      }

      const toNum=data.getUserbyId.contactNum;
      const sendAlert = event => {
     
        sendMessage({
          variables: {
            sendMessageTo2: '+94771293019',
            sendMessageBody2:"There is a new urgent pending request!. Please check now!"
          }
        });
        location.replace('/');
        
      };
    
      return (
        <Layout>
          <Header />
          <Container>
              <Box>
                 Is this request an urgent one?
           
                 <Button
                 onClick={sendAlert}
                 rounded
                className="button is-success is-medium mx-4 my-2 px-6"

                 >Yes</Button>
                 <Link
                        to={{
                          pathname: `/`
                        }}
                      >
                 <Button
                 rounded
                 className="button is-danger is-medium mx-4 my-2 px-6"
                 >No</Button>
                 </Link>
             
               
              </Box>
            </Container>
            </Layout>
      )
}
export default SetEmergencyPage;