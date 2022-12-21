import React from 'react'
import './ChatWindow.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function({avatar, name}) {
    return (
        <div className='chatWindow'>
            <div className="chatWindowHeader">
                <div className="chatWindowUserInfo">
                    <img src={avatar} alt="avatar" />
                    <div className="userName">{name}</div>
                </div>
                <div className="chatWindowUserInfo">
                    <MoreVertIcon style={{color: 'lightgray'}}/>
                </div>
            </div>
            <div className="chatWindowBody">
                ...
            </div>
        </div>
    )
}