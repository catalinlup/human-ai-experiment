import React, {useState} from 'react';
import ChatList from '../ChatList/ChatList';
import ChatTextInput from '../ChatTextInput/ChatTextInput';



const ChatArea = ({messages, sender, onSendMessage}) => {
  
  const [currentText, setCurrentText] = useState(null)

  return (<>
        <div
            style={{
                position: 'absolute',
                bottom: 60,
                top: 80,
                overflow: 'scroll',
                width: '90%',
                left: '5%'
            }}
        >
            <ChatList 
                messages={messages}
            />
        </div>
        <div style={{'position': 'absolute', bottom: 10, width: '100%'}}>
            <div style={{'width': '80%', margin: 'auto', backgroundColor: 'white'}}>
                <ChatTextInput 
                    onSendMessage={() => {
                        if (!currentText) {
                            return;
                        }

                        onSendMessage({sender: sender, message: currentText, messageSent: true, timestamp: new Date().getTime()})
                        setCurrentText(null)
                    }}
                    onChange={(e) => setCurrentText(e.target.value)}
                    value={currentText}
                />
            </div>
        </div>
  </>);
};

export default ChatArea;
