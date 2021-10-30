import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Loader from '../utils/Loader';
import { GET_USER_BY_ID } from "../../gql/query";

const Conversation = ({conversation, currentUser}) => {
    const [user,setUser]=useState(null);

   nextid=conversation.members.find((m)=>m!==currentUser.id);
    const {data,loading,error}= useQuery(GET_USER_BY_ID,{
        variables:{
            getUserbyIdId: nextid
        }
    }
        );
    if (loading) return <Loader />;
    console.log(data.getUserbyId.username); 
    
    
    return(
        
            <div>
                <span>{data.getUserbyId.username}</span>
              
            </div>
        
    )

}
export default Conversation;