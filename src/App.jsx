import './App.css';
import React, { useState, useEffect } from 'react';

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

  const [chatlist, setChatlist] = useState([
    {
      chatId: 1,
      name: 'Fulano1',
      avatar: 'http://ambiel.adv.br/wp-content/uploads/2021/07/avatar-user-1.jpg'
    },
    {
      chatId: 2,
      name: 'Fulano2',
      avatar: 'https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg'
    }
  ])
  const [newChat, setNewChat] = useState(null)
  const [activeChat, setActiveChat] = useState({})
  const [user, setUser] = useState({
    id: 'mJAjOvdhyBRCjRGVr5eRTYZccMM2',
    name: 'Renan',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTiLNEGdTOwt-Gr0YojoXAnYRtB3Hu3XAhvQ&usqp=CAU'
  })
  const [showNewChat, setShowNewChat] = useState(false)

  // useEffect(()=> {
  //   if(user !== null) {
  //     let unsub = Api.onChatList(user.id, setChatlist)
  //     return unsub
  //   }
  // },[user])

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
          newChatList={newChatList => setChatlist(newChatList)}
          selectedChat={newChat => setActiveChat(newChat)}
          />
        <div className="chatlist">
          {
            chatlist.map((item, key) => 
            (
              <ChatListItem 
                  data={item}
                  key={key}
                  active={activeChat.chatId === chatlist[key].chatId}
                  onClick={() => {
                    setActiveChat(chatlist[key])
                    console.log('chatlistKey:', chatlist[key])
                    }
                  }
                />
              )
            )
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