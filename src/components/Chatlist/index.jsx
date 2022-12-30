import React from  'react'
import ChatListItem from '../ChatListItem'
import { Loader } from '../Loader'
import './index.css'

export function Chatlist({chatlist, activeChat, selectedChat}) {
    return (
        <div className="chatlist">
          { chatlist
            ? chatlist.map((item, key) => 
                (
                  <ChatListItem 
                      data={item}
                      key={key}
                      active={activeChat.chatId === chatlist[key].chatId}
                      onClick={() => {
                        selectedChat(chatlist[key])
                        console.log('chatlistKey:', chatlist[key])
                        }
                      }
                  />
                )
              )
            : <Loader />
          }
        </div>
    )
} 