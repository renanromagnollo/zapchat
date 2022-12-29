import React, {useState, useEffect, useRef} from 'react'
import './NewChat.css'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Api from '../api/Api';

export default function({user, chatlist, show, setShow}) {

    const [contacstList, setContacstList] = useState([])

    const leftBody = useRef()

    useEffect(() => {
        const getList = async () => {
            if(user !== null) {
                let results = await Api.getContactList(user.id)
                console.log('results:', results)
                setContacstList(results)
            }
        }
        getList()
    }, [user])

    const addNewChat = (user2) => {
        Api.addNewChat(user, user2)
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
                {contacstList?.map((item, key) => {
                    return (
                        <div onClick={()=>addNewChat(item)} className="newChat--item" key={key}>
                            <img className='newChat--itemavatar' src={item.avatar} alt="" />
                            <div className="newChat--itemname">{item.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}