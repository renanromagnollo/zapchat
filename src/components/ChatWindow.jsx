import React from 'react'
import './ChatWindow.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function({avatar, name}) {
    return (
        <div className='chatWindow'>
            <div className="chatWindow--header">
                <div className="chatWindow--info">
                    <img className="chatWindow--avatar" src={avatar} alt="avatar" />
                    <div className="chatWindow--name">{name}</div>
                </div>
                <div className="chatWindow--info">
                    <div className="chatwindow--header--icons">
                        <MoreVertIcon style={{color: 'lightgray'}}/>
                    </div>
                </div>
            </div>
            <div className="chatWindow--body">
                ...
            </div>
            <div className="chatWindowFooter">
                ...
            </div>
        </div>
    )
}