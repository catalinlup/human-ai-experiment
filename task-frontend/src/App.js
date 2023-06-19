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
import { useGetSessionQuery } from './store/task_backend/sessionApi';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import RoomStateController from './controllers/RoomStateController/RoomStateController';

function App() {

  // const getPathName = () => window.location.pathname.slice(1)


  // const getUserId = () => {
  //   if (['1', '2', '3', '4'].includes(getPathName())) {
  //     return getPathName()
  //   }
  //   return '5'
  // }

  const urlParams = new URLSearchParams(window.location.search);
  const prolific_id = urlParams.get('PROLIFIC_ID');
  const session_id = urlParams.get('SESSION_ID')

  // if (session_id == null || prolific_id == null) {

  // }

  const {data: roomData, isLoading: isRoomDataLoading} = useGetSessionQuery(session_id)

  if (isRoomDataLoading) {
    return <LoadingSpinner />
  }

  console.log(roomData)
 

  return (
    <RoomStateController 
      roomData={roomData}
      session_id={session_id}
      prolific_id={prolific_id}
    />)
  // return (
  //   <SessionController userId={getUserId()}/>
  // );
}

export default App;
