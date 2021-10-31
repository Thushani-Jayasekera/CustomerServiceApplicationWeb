import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Loader from '../utils/Loader';
import { GET_USER_BY_ID } from "../../gql/query";

import "./conversation.css";

const Conversation = ({conversation, currentUser}) => {
    
   console.log(conversation,currentUser);
   nextid=conversation.members.find((m)=>m!==currentUser.id);
   if (nextid===null){
        nextid=currentUser.id;
   }
   console.log(nextid);
    const {data,loading,error}= useQuery(GET_USER_BY_ID,{
        variables:{
            getUserbyIdId: nextid
        }
    }
        );
    if (loading) return <Loader />;
    console.log(data);
    console.log(data.getUserbyId.username); 
    
    
    return(
        
        <div className="conversation">
                <span className="conversationName">{data.getUserbyId.username}</span>
              
            </div>
        
    )

}
export default Conversation;