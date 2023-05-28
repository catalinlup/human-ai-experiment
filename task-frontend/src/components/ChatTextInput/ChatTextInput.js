import React from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const ChatTextInput = ({ onSendMessage, onChange, value }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Input
        value={value}
        onChange={onChange}
        placeholder="Type your message..."
        onPressEnter={handleKeyPress}
        style={{ flex: 1, marginRight: 8 }}
      />
      <Button
        type="primary"
        shape="circle"
        icon={<SendOutlined />}
        onClick={onSendMessage}
        style={{ marginLeft: 8 }}
      />
    </div>
  );
};

export default ChatTextInput;
