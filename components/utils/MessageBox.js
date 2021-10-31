import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Loader from '../utils/Loader';
import { GET_MESGS_OF_CONV } from "../../gql/query";
import Message from "../Message";



const MessageBox = ({conversation, currentUser}) => {
    

   
    const {data,loading,error,refetch}= useQuery(GET_MESGS_OF_CONV,{
        variables:{
            getNewMessagesConversationId2: conversation.id
        }
    }
        );
    if (loading) return <Loader />;
    console.log(data); 
    const user=data.me
    
    
    
    return(
        
            <div >
                
                {data.getNewMessages.map(m=>(
                    <>
                    
                    <Message message={m} own={(user.id===m.sender?"sender":"reciever")} conversation={conversation.id}/>
                    </>
                ))}
                
            </div>
        
    )

}
export default MessageBox;