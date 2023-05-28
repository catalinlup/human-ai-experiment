import React from 'react';
import './ChatList.css';
import ChatBubble from '../ChatBubble/ChatBubble';

const ChatList = ({ messages }) => {
  return (
    <div className="chat-list">
      {messages.map((message, index) => (
        <ChatBubble
          key={index}
          sender={message.sender}
          message={message.message}
          timestamp={message.timestamp}
          messageSent={message.messageSent}
        />
      ))}
    </div>
  );
};

export default ChatList;
