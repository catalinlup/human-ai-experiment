import React, {useRef, useEffect} from 'react';
import './ChatList.css';
import ChatBubble from '../ChatBubble/ChatBubble';



const ChatList = ({ messages }) => {

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

  return (
    <div className="chat-list">
      {messages.map((message, index) => (
        <ChatBubble
          key={index}
          sender={message.sender}
          message={message.content}
          timestamp={message.timestamp}
          messageSent={message.messageSent}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatList;
