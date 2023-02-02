import React, { useEffect, useState } from 'react';
import { format, render, cancel, register } from 'timeago.js';

import './message.css';

const Message = ({ message, own, conversation }) => {
  console.log('message js');

  return (
    <div>
      

      <div className={own === 'sender' ? 'message own' : 'message'}>
      {own === 'sender' ? <p>You:</p> : <p>User:</p>}
        <div className="messageTop">
          <p>{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
      </div>
    </div>
  );
};
export default Message;
