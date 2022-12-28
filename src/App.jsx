import './App.css';
import React, { useState } from 'react';

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { getChatUsers } from './functions/users';
import NewChat from './components/NewChat';
import Login from './components/Login';
import Api from './api/Api'


export default function App() {

  const [chatlist, setChatlist] = useState([])
  const [activeChat, setActiveChat] = useState({})
  const [user, setUser] = useState({
    id: 'mJAjOvdhyBRCjRGVr5eRTYZccMM2',
    name: 'Renan',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTiLNEGdTOwt-Gr0YojoXAnYRtB3Hu3XAhvQ&usqp=CAU'
  })
  const [showNewChat, setShowNewChat] = useState(false)

  const handleNewChat = () => {
    setShowNewChat(!showNewChat)
  }

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    }
    await Api.addUser(newUser)
    setUser(newUser)
  }

  if(user === null) {
    return <Login onReceive={handleLoginData}/>
  }

  return (
    <div className="app-window">
      <div className="sidebar">
        
        <header>
          <img className='header--avatar' src={user.avatar} alt="avatar" />
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{color: 'lightgray'}}/>
            </div>
            <div className="header--btn" onClick={handleNewChat}>
              <ChatIcon style={{color: 'lightgray'}}/>
            </div>
            <div className="header--btn">
              <MoreVertIcon style={{color: 'lightgray'}}/>
            </div>
          </div>
          
        </header>
        
        <div className="search">
          <div className="search--input">
            <SearchIcon fontSize='small' style={{color: '#919191'}}/>
            <input type="search" placeholder='Procurar ou começar nova conversa'/>
          </div>
        </div>
        <NewChat 
          chatlist={chatlist}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <div className="chatlist">
          {
            chatlist.map((item, key) => (
              
              <ChatListItem 
                key={key}
                active={activeChat.chatId === chatlist[key].chatId}
                onClick={() => {
                  setActiveChat(chatlist[key])
                  console.log('chatlistKey:', chatlist[key])
                  }
                }
                data={item}
              />
            ))
          }
        </div>
      </div>
      <div className="contentarea">
        {activeChat.chatId &&
          <ChatWindow user={activeChat}/>
        }
        {activeChat.chatId === undefined &&
          <ChatIntro/>
        }
      </div>
    </div>
  )
}