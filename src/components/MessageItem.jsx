import React from 'react'
import './MessageItem.css'

export default function({data, user}) {
    return (
        <div className='messageLine' style={{justifyContent: user.id === data.author ? 'flex-end' : 'flex-start'}}>
            <div className="messageItem">
                <div className="messageText">{data.msg}</div>
                <div className="messageDate">19:00h</div>
            </div>

        </div>
    )
}