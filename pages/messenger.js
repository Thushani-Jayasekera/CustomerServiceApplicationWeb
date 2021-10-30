import React, { useEffect, useState } from "react";
import Loader from "../components/utils/Loader";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Conversation from "../components/conversations/conversation";
import Message from "../components/Message";

import {GET_USER_MSG_DETAILS,} from "../gql/query";
import { SEND_NEW_MESSAGE,ADD_NEW_CONVERSATION } from "../gql/mutation";
import { useMutation, useQuery } from "@apollo/client";
import MessageBox from "../components/utils/MessageBox";
import { useToasts } from 'react-toast-notifications';
const MeesengerPage = () => {
    const [conversation, setConversations]=useState([]);
    const [currentChat, setCurrentChat]=useState(null);
    const [message, setMessage] = useState([]);
    const [newMessage,setNewMessage]= useState('');
    const[sent,setSent]=useState('');
    const { addToast } = useToasts();

    const {loading,error,data} = useQuery(GET_USER_MSG_DETAILS);
    const [addMessage, { loading_send, error_send }] = useMutation(
        SEND_NEW_MESSAGE,
        {
          onCompleted: data => {
            setSent(newMessage);
            addToast('Successfully sent message', { appearance: 'success' });
            
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
            
          },
          onError: error => {
            addToast('Failed ', { appearance: 'error' });
          }
        }
      );
    

    if(loading) return <Loader/>
    console.log(data);
    const user=data.me;
    const conversations=data.conversationsOfUser;
    const allUsers=data.users;
    console.log(currentChat);

    const sendMessage = e => {
        //e.preventDefault();
        console.log(currentChat);
        addMessage({
          variables: {
            conversationId: currentChat.id,
            sender: user.id,
            text:newMessage
          }
        });
       
      };

    const onClickConversation = c => {
    
        setCurrentChat(c)
      };
    const addToConversation=(c)=>{
        console.log(c);
        
        newConverstion({
            variables:{
                newConverstionSenderId3:user.id,
                newConverstionRecieverId3:c
            }
        });

    };


    return(
        
            <Layout>
             <Header/>
             <div>
                 {allUsers.map((u)=>(
                     <div>
                         <p>{u.username}</p>
                         <button onClick={()=>addToConversation(u.id)}>Add to Chat</button>
                    </div>
                   
                 ))}
                 </div>
             <div>
                 
                 {conversations.map((c)=>(
                     <div onClick={()=>onClickConversation(c)} color='red'>
                     <Conversation conversation={c} currentUser={user}/>
                     </div>
                 ))}
                 
             </div>
             <div>

                 {currentChat?<>
                    <div>
                 <MessageBox conversation={currentChat} currentUser={user}/>
                 <p>{sent}</p>
             </div>
                 
                 </>:
                 
                 <>
                 Open a conversation to start char
                 </>}
             </div>
            
             <div>
                 <textarea placeholder="write something.."
                 onChange={(e)=>setNewMessage(e.target.value)}></textarea>
                 <button onClick={sendMessage}>Send</button>
             </div>


             </Layout>
        
    )

}
export default MeesengerPage;