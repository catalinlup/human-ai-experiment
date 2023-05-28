import React from 'react';
import './ChatBubble.css';

const ChatBubble = ({ sender, message, timestamp, messageSent=true}) => {
  const bubbleClass = messageSent ? 'chat-bubble sent' : 'chat-bubble received';

  return (
    <div className={bubbleClass}>
      <div className="sender">{sender}</div>
      <div className="message">{message}</div>
      <div className="timestamp">{new Date(timestamp).toUTCString()}</div>
    </div>
  );
};

export default ChatBubble;
