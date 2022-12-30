import React from 'react'
import './index.css'

import ChatIntro from './ChatIntro';
import ChatWindow from './ChatWindow';

export default function({activeChat, user}) {
    return(
        <div className="contentarea">
        {activeChat.chatId &&
          <ChatWindow chat={activeChat} user={user}/>
        }
        {activeChat.chatId === undefined &&
          <ChatIntro/>
        }
      </div>
    )
}