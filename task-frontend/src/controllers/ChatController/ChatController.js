import ChatPopup from "../../components/ChatPopup/ChatPopup";
import {useEffect} from 'react'
import { io } from "socket.io-client";
import { useGetMessagesQuery, useSendMessageMutation } from "../../store/task_backend/chatApi";


const ChatController = ({roomId, senderName, prolific_id}) => {

    const {data: msgs, isLoading: isMsgLoading} = useGetMessagesQuery(roomId, {pollingInterval: 1000})
    const [sendMessage] = useSendMessageMutation()

    const messages = (isMsgLoading || !msgs)? [] : msgs['messages']

    console.log(messages)
    const sortedMsgs = [...messages].sort((a, b) => a.timestamp - b.timestamp)
    

    return <>
        <ChatPopup 
            sender={senderName}
            messages={sortedMsgs} onSendMessage={(msg) => {sendMessage({roomId: roomId, message: {...msg, prolific_id}})}}
            unreadMsgCount={1}
      />
    </>
}

export default ChatController;