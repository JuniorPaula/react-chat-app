import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { appContext, socket } from './context/appContext';
import Navigation from './components/Navigation';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const user = useSelector((state) => state.user);
  const [rooms, setRooms] = useState([]);
  const [currentRooms, setCurrentRooms] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMembersMsg, setPrivateMembersMsg] = useState({})
  const [newMessage, setNewMessage] = useState({})
  

  return (
    <appContext.Provider 
      value={{
            socket, rooms, setRooms, currentRooms, setCurrentRooms, members, setMembers,
            messages, setMessages, privateMembersMsg, setPrivateMembersMsg, 
            newMessage, setNewMessage
      }}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {user && (
            <>
              <Route path='/chats' element={<Chat />} />
            </>

          )}
        </Routes>
      </BrowserRouter>
    </appContext.Provider>
  );
}

export default App;
