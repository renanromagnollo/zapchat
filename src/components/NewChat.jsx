import React, {useState, useEffect, useRef} from 'react'
import './NewChat.css'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Api from '../api/Api';

export default function({user, chatlist, show, setShow, newChatList, selectedChat}) {

    const [signedList, setSignedList] = useState([])

    const leftBody = useRef()

    useEffect(() => {
        const getList = async () => {
            if(user !== null) {
                let results = await Api.getSignedList(user.id)
                console.log('results:', results)
                setSignedList(results)
            }
        }
        getList()
    }, [user])

    // const setNewChatlist = (newList) => {
    //     console.log('newList: ', newList)
    //     newChatList(newList)
    // }

    const addNewChat = (user2) => {
        let list = chatlist
        console.log('chatlist: ', list)
        Api.addNewChat(user, user2)
        list.push({
            chatId: user2.id,
            avatar: user2.avatar,
            name: user2.name
        })
        // setNewChatlist(list)
        newChatList(list)
        selectedChat({
            avatar: user2.avatar,
            chatId: user2.id,
            name: user2.name
        })
        handleClose()
    }

    const handleClose = () => {
        setShow(false)
    }

    return (
        <div ref={leftBody} className="newChat" style={{left: show ? 0 : -450}}>
            <div className="newChat--head">
                <div className="newChatt--backbutton" onClick={handleClose}>
                    <ArrowBackIcon style={{color: 'darkgray'}} />
                </div>
                <div className="newChat--headtitle">Nova Conversa</div>
            </div>
            <div className="newChat--list">
                {signedList?.map((item, key) => {
                    return (
                        <div onClick={()=>{
                            addNewChat(item)
                        }} className="newChat--item" key={key}>
                        <img className='newChat--itemavatar' src={item.avatar} alt="" />
                        <div className="newChat--itemname">{item.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}