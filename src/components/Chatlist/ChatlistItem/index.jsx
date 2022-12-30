import React, {useEffect, useState} from 'react';
import './index.css';

export default ({onClick, data, active}) => {

    const [time, setTime] = useState('')

    // useEffect(() => {
    //     let d = new Date(data.lastMsgDate.seconds * 1000)
    //     let hours = d.getHours()
    //     let minutes = d.getMinutes()
    //     hours = hours < 10 ? '0'+hours : hours
    //     minutes = minutes < 10 ? '0'+minutes : minutes
    //     setTime(`${hours}:${minutes}`)
    // }, [])

    return (
        <div className={`chatListItem ${active?'active':''}`} onClick={onClick}>
            <img src={data.avatar} alt="" className="chatListItem--avatar" />
            <div className="chatListItem--lines">
                <div className="chatListItem--line">
                    <div className="chatListItem--name">{data.name}</div>
                    <div className="chatListItem--date">{time}</div>
                </div>
                <div className="chatListItem--line">
                    <div className="chatListItem--lastMsg">
                        <p>{data.lastMsg}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}