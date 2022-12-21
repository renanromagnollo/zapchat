import React from 'react';
import './ChatListItem.css';

export default ({onClick, avatar, name, active}) => {
    return (
        <div className={`chatListItem ${active?'active':''}`} onClick={onClick}>
            <img src={avatar} alt="" className="chatListItem--avatar" />
            <div className="chatListItem--lines">
                <div className="chatListItem--line">
                    <div className="chatListItem--name">{name}</div>
                    <div className="chatListItem--date">19:00h</div>
                </div>
                <div className="chatListItem--line">
                    <div className="chatListItem--lastMsg">
                        <p>fdjiaoçf iaoçfje afjaioç fjaio çfjeoiaçf jeoiaçfjeioaçfjeoaiç</p>
                    </div>
                </div>
            </div>
        </div>
    )
}