import React, {useState} from 'react'
import './NewChat.css'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function({user, chatlist, show, setShow}) {

    const [contacstList, setContacstList] = useState([
        {id: 123, avatar: '', name: 'José Bom Dozo'},
        {id: 123, avatar: '', name: 'José Bom Dozo'},
        {id: 123, avatar: '', name: 'José Bom Dozo'},
        {id: 123, avatar: '', name: 'José Bom Dozo'}
    ])

    const handleClose = () => {
        setShow(false)
    }

    return (
        <div className="newChat" style={{left: show ? 0 : -415}}>
            <div className="newChat--head">
                <div className="newChatt--backbutton" onClick={handleClose}>
                    <ArrowBackIcon style={{color: 'darkgray'}} />
                </div>
                <div className="newChat--headtitle">Nova Conversa</div>
            </div>
            <div className="newChat--list">
                {contacstList.map((item, key) => {
                    return (
                        <div className="newChat--item" key={key}>
                            <img className='newChat--itemavatar' src={item.avatar} alt="" />
                            <div className="newChat--itemname">{item.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}