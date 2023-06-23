import { FloatButton } from 'antd';
import { useState } from 'react';
import './ChatPopup.css'
import PopupWindow from '../PopupWindow/PopupWindow';
import ChatArea from '../ChatArea/ChatArea';
import {MessageOutlined} from '@ant-design/icons'





const ChatPopup = ({messages, onSendMessage, sender, unreadMsgCount=0}) => {
    
    const [chatOpen, setChatOpen] = useState(true)

   
    return(
        <>
            {!chatOpen&&
                <FloatButton badge={{count: unreadMsgCount}} type={'primary'} icon={<MessageOutlined />} onClick={() => setChatOpen(true)}/>
            }
            <PopupWindow
                open={chatOpen}
                onClose={() => {setChatOpen(false)}}
                title={`Chat - ${sender}`}
            >
                <ChatArea messages={messages} sender={sender} onSendMessage={onSendMessage}/>
            </PopupWindow>
        </>
    )
};


export default ChatPopup;
