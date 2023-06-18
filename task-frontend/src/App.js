import logo from './logo.svg';
import './App.css';
import ChatBubble from './components/ChatBubble/ChatBubble';
import ChatList from './components/ChatList/ChatList';
import PopupWindow from './components/PopupWindow/PopupWindow';
import ChatArea from './components/ChatArea/ChatArea';
import ChatPopup from './components/ChatPopup/ChatPopup';
import { useState, useEffect } from 'react';
import DynamicMap from './controllers/DynamicMap/DynamicMap';
import RouteSelector from './controllers/RouteSelector/RouteSelector';
import { FloatButton, Space } from 'antd';
import TaskDescriptionArea from './components/TaskDescriptionArea/TaskDescriptionArea';
import TaskDescriptionController from './controllers/TaskDescriptionController/TaskDescriptionController';
import RouteVotingArea from './components/RouteVotingArea/RouteVotingArea';
import RouteVotingController from './controllers/RouteVotingController/RouteVotingController';
import ChatController from './controllers/ChatController/ChatController';
import SessionController from './controllers/SessionController/SessionController';

function App() {


  // const messages = [
  //   {
  //     sender: 'John Doe',
  //     message: 'Hello, how are you?',
  //     timestamp: 'May 28, 2023 10:30 AM',
  //     messageSent: true,
  //   },
  //   {
  //     sender: 'Jane Smith',
  //     message: "I'm doing well, thanks!",
  //     timestamp: 'May 28, 2023 10:35 AM',
  //     messageSent: false,
  //   },
  //   {
  //     sender: 'Jane Smith',
  //     message: "I'm doing well, thanks!",
  //     timestamp: 'May 28, 2023 10:35 AM',
  //     messageSent: false,
  //   },
  //   {
  //     sender: 'Jane Smith',
  //     message: "I'm doing well, thanks!",
  //     timestamp: 'May 28, 2023 10:35 AM',
  //     messageSent: false,
  //   },
  //   {
  //     sender: 'Jane Smith',
  //     message: "I'm doing well, thanks!",
  //     timestamp: 'May 28, 2023 10:35 AM',
  //     messageSent: false,
  //   },
  //   {
  //     sender: 'Jane Smith',
  //     message: "I'm doing well, thanks!",
  //     timestamp: 'May 28, 2023 10:35 AM',
  //     messageSent: false,
  //   },
  //   {
  //     sender: 'Jane Smith',
  //     message: "I'm doing well, thanks!",
  //     timestamp: 'May 28, 2023 10:35 AM',
  //     messageSent: false,
  //   },
  //   {
  //     sender: 'Jane Smith',
  //     message: "I'm doing well, thanks!",
  //     timestamp: 'May 28, 2023 10:35 AM',
  //     messageSent: false,
  //   },
  //   {
  //     sender: 'John Doe',
  //     message: 'Hello, how are you?',
  //     timestamp: 'May 28, 2023 10:30 AM',
  //     messageSent: true,
  //   },
  //   {
  //     sender: 'John Doe',
  //     message: 'Hello, how are you?',
  //     timestamp: 'May 28, 2023 10:30 AM',
  //     messageSent: true,
  //   },
  //   {
  //     sender: 'John Doe',
  //     message: 'Hello, how are you?',
  //     timestamp: 'May 28, 2023 10:30 AM',
  //     messageSent: true,
  //   },
  //   // Add more messages as needed
  // ];

  // const [currentMessages, setCurrentMessages] = useState(messages)


  const getPathName = () => window.location.pathname.slice(1)


  const getUserId = () => {
    if (['1', '2', '3', '4'].includes(getPathName())) {
      return getPathName()
    }
    return '5'
  }


  return (
    <SessionController userId={getUserId()}/>
  );
}

export default App;
