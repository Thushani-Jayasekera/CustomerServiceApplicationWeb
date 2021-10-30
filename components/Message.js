import React, { useEffect, useState } from "react";
import { format, render, cancel, register } from 'timeago.js';

const Message = ({message,own,conversation}) => {
    console.log("message");
    
    return(
        
            <div>

               <div>
                  
               </div>
               {own==='sender'?
               <p>You:</p>:<p>User</p>}
               <p>{message.text}</p>
               <div>{format(message.createdAt)}</div>
            </div>
        
    )

}
export default Message;