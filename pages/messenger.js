import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Columns,
  Container,
  Content,
  Section,
  Textarea
} from 'react-bulma-components';
import Loader from '../components/utils/Loader';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Conversation from '../components/conversations/conversation';
import Message from '../components/Message';
import './messenger.css';

import { GET_USER_MSG_DETAILS } from '../gql/query';
import { SEND_NEW_MESSAGE, ADD_NEW_CONVERSATION } from '../gql/mutation';
import { useMutation, useQuery } from '@apollo/client';
import MessageBox from '../components/utils/MessageBox';
import { useToasts } from 'react-toast-notifications';

const levenshtein = require('fast-levenshtein');

const MeesengerPage = () => {
  const [conversation, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sent, setSent] = useState('');
  const { addToast } = useToasts();
  const [searchTerm, setSearchTerm] = useState('');

  const { loading, error, data } = useQuery(GET_USER_MSG_DETAILS);
  const [addMessage, { loading_send, error_send }] = useMutation(
    SEND_NEW_MESSAGE,
    {
      onCompleted: data => {
        setSent(newMessage);
        addToast('Successfully sent message', { appearance: 'success' });
        location.reload();
      },
      onError: error => {
        addToast('Failed ', { appearance: 'error' });
      }
    }
  );

  const [newConverstion, { loading_conv, error_conv }] = useMutation(
    ADD_NEW_CONVERSATION,
    {
      onCompleted: data => {
        addToast('Successfully added', { appearance: 'success' });
        location.reload();
      },
      onError: error => {
        addToast('Failed ', { appearance: 'error' });
      }
    }
  );

  if (loading || loading_conv || loading_send) return <Loader />;
  console.log(data);
  const user = data.me;
  const conversations = data.conversationsOfUser;
  const allUsers = data.users;
  console.log(currentChat);
  const MIN_DISTANCE = 3;

  const sendMessage = e => {
    //e.preventDefault();
    console.log(currentChat);
    addMessage({
      variables: {
        conversationId: currentChat.id,
        sender: user.id,
        text: newMessage
      }
    });
  };

  const onClickConversation = c => {
    setCurrentChat(c);
  };
  const addToConversation = c => {
    console.log(c);

    newConverstion({
      variables: {
        newConverstionSenderId3: user.id,
        newConverstionRecieverId3: c
      }
    });
  };

  return (
    <Layout>
      <Header />
      <Container>
        <Section>
          <Columns>
            <Columns.Column>
              <input
                placeholder="Search for users to chat"
                className="chatMenuInput"
                onChange={event => {
                  setSearchTerm(event.target.value);
                }}
              />
              {allUsers
                .filter(val => {
                  console.log(val);
                  if (searchTerm == '') {
                    if (val.id !== user.id) {
                      return val;
                    }
                  } else {
                    //use levenshtein-fast algorithm use to find names which are simillar according to a distance
                    if (
                      levenshtein.get(
                        val.username
                          .substr(
                            0,
                            Math.min(searchTerm.length, val.username.length)
                          )
                          .toLowerCase(),
                        searchTerm.toLowerCase()
                      ) <= MIN_DISTANCE
                    ) {
                      if (val.id !== user.id) {
                        return val;
                      }
                    }
                  }
                })
                .map(u => (
                  <Box>
                    <p>{u.username}</p>
                    <Button
                      onClick={() => addToConversation(u.id)}
                      className="addToChatButton"
                    >
                      Add to Chat
                    </Button>
                  </Box>
                ))}
            </Columns.Column>
            <Columns.Column>
              {conversations.map(c => (
                <Box onClick={() => onClickConversation(c)} color="red">
                  <Conversation conversation={c} currentUser={user} />
                </Box>
              ))}
            </Columns.Column>

            <Columns.Column>
              {currentChat ? (
                <>
                  <MessageBox conversation={currentChat} currentUser={user} />
                  <p>{sent}</p>

                  <div className="chatBoxBottom">
                    <textarea
                      placeholder="write something.."
                      className="chatMessageInput"
                      onChange={e => setNewMessage(e.target.value)}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={sendMessage}>
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat.
                </span>
              )}
            </Columns.Column>
          </Columns>
        </Section>
      </Container>
    </Layout>
  );
};
export default MeesengerPage;
