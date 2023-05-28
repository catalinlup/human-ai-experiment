import logo from './logo.svg';
import './App.css';
import ChatBubble from './components/ChatBubble/ChatBubble';
import ChatList from './components/ChatList/ChatList';
import PopupWindow from './components/PopupWindow/PopupWindow';
import ChatArea from './components/ChatArea/ChatArea';
import ChatPopup from './components/ChatPopup/ChatPopup';

function App() {
  const messages = [
    {
      sender: 'John Doe',
      message: 'Hello, how are you?',
      timestamp: 'May 28, 2023 10:30 AM',
      messageSent: true,
    },
    {
      sender: 'Jane Smith',
      message: "I'm doing well, thanks!",
      timestamp: 'May 28, 2023 10:35 AM',
      messageSent: false,
    },
    {
      sender: 'Jane Smith',
      message: "I'm doing well, thanks!",
      timestamp: 'May 28, 2023 10:35 AM',
      messageSent: false,
    },
    {
      sender: 'Jane Smith',
      message: "I'm doing well, thanks!",
      timestamp: 'May 28, 2023 10:35 AM',
      messageSent: false,
    },
    {
      sender: 'Jane Smith',
      message: "I'm doing well, thanks!",
      timestamp: 'May 28, 2023 10:35 AM',
      messageSent: false,
    },
    {
      sender: 'Jane Smith',
      message: "I'm doing well, thanks!",
      timestamp: 'May 28, 2023 10:35 AM',
      messageSent: false,
    },
    {
      sender: 'Jane Smith',
      message: "I'm doing well, thanks!",
      timestamp: 'May 28, 2023 10:35 AM',
      messageSent: false,
    },
    {
      sender: 'Jane Smith',
      message: "I'm doing well, thanks!",
      timestamp: 'May 28, 2023 10:35 AM',
      messageSent: false,
    },
    {
      sender: 'John Doe',
      message: 'Hello, how are you?',
      timestamp: 'May 28, 2023 10:30 AM',
      messageSent: true,
    },
    {
      sender: 'John Doe',
      message: 'Hello, how are you?',
      timestamp: 'May 28, 2023 10:30 AM',
      messageSent: true,
    },
    {
      sender: 'John Doe',
      message: 'Hello, how are you?',
      timestamp: 'May 28, 2023 10:30 AM',
      messageSent: true,
    },
    // Add more messages as needed
  ];
  return (
    <div style={{overflow: 'hidden', height: '100vh', width: '100vw'}}>
    {/* <h1>Chat Example</h1> */}
     
      {/* <ChatPopup messages={messages}/> */}
      {/* <PopupWindow
        open={true}
        onClose={() => {console.log('Closed pressed')}}
        title={'Chat Window'}
      >
         <ChatArea messages={messages} onSendMessage={(m) => console.log(m)}/>
      </PopupWindow> */}
      <ChatPopup 
        messages={messages} onSendMessage={(m) => console.log(m)}
        unreadMsgCount={3}
      />
  </div>
  );
}

export default App;
