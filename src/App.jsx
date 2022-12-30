import './App.css';
import React, { useState, useEffect } from 'react';

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';


import SearchIcon from '@mui/icons-material/Search';
import { getChatUsers } from './functions/users';
import NewChat from './components/NewChat';
import Login from './components/Login';
import Api from './api/Api'
import { Loader } from './components/Loader';
import { Chatlist } from './components/Chatlist';
import { Header } from './components/Sidebar/Header';


export default function App() {

  // const [chatlist, setChatlist] = useState([
  //   {
  //     chatId: 1,
  //     name: 'Fulano1',
  //     avatar: 'http://ambiel.adv.br/wp-content/uploads/2021/07/avatar-user-1.jpg'
  //   },
  //   {
  //     chatId: 2,
  //     name: 'Fulano2',
  //     avatar: 'https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg'
  //   }
  // ])
  const [chatlist, setChatlist] = useState([])
  // const [newChat, setNewChat] = useState(null)
  const [activeChat, setActiveChat] = useState({})
  const [user, setUser] = useState({
    id: 'mJAjOvdhyBRCjRGVr5eRTYZccMM2',
    name: 'Renan',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTiLNEGdTOwt-Gr0YojoXAnYRtB3Hu3XAhvQ&usqp=CAU'
  })
  const [showNewChat, setShowNewChat] = useState(false)

  useEffect(()=> {
    if(user !== null) {
      let unsub = Api.onChatList(user.id, setChatlist)
      return unsub
    }
  },[user])

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
        
        <Header user={user} handleNewChat={handleNewChat}/>
        
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
          newChatList={newChatList => setChatlist(newChatList)}
          selectedChat={newChat => setActiveChat(newChat)}
        />
        <Chatlist 
          chatlist={chatlist} 
          activeChat={activeChat} 
          selectedChat={activeChat => setActiveChat(activeChat)} 
        />
      </div>
      <div className="contentarea">
        {activeChat.chatId &&
          <ChatWindow chat={activeChat} user={user}/>
        }
        {activeChat.chatId === undefined &&
          <ChatIntro/>
        }
      </div>
    </div>
  )
}

