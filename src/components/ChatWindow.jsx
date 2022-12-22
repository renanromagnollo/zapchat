import './ChatWindow.css'
import React, {useState} from 'react'

import EmojiPicker from 'emoji-picker-react';

import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SendIcon from '@mui/icons-material/Send';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import CloseIcon from '@mui/icons-material/Close';

export default function({avatar, name}) {

    const [emojisOpen, setEmojiOpen] = useState(false)
    

    const openEmojiBox = () => {
        setEmojiOpen(true)
    }
    const closeEmojiBox = () => {
        setEmojiOpen(false)
    }

    const handleEmojiClick = () => {

    }

    

    return (
        <div className='chatWindow'>
            <div className="chatWindow--header">
                <div className="chatWindow--info">
                    <img className="chatWindow--avatar" src={avatar} alt="avatar" />
                    <div className="chatWindow--name">{name}</div>
                </div>
                    <div className="chatWindow--headerbuttons">
                    <div className="chatWindow--btn">
                        <SearchIcon style={{color: 'lightgray'}} fontSize='medium'/>
                    </div>
                    <div className="chatWindow--btn">
                        <AttachFileIcon style={{color: 'lightgray'}} fontSize='medium'/>
                    </div>
                    <div className="chatWindow--btn">
                        <MoreVertIcon style={{color: 'lightgray'}} fontSize='medium'/>
                    </div>
                        
                </div>
            </div>
            <div className="chatWindow--body">
                <div className="chatWindow--emojiarea" style={{opacity: emojisOpen ? 1 : 0}}>
                    <EmojiPicker 
                        onEmojiClick={handleEmojiClick}
                        // disableSearchBar
                        // disableSkinTonePicker
                    />
                </div>
                <div className="chatWindow--chatmsgsarea"></div>
            </div>
            <div className="chatWindow--footer">
                <div className="chatWindow--footer--pre">
                    <div className="chatWindow--btn" onClick={closeEmojiBox}>
                        <CloseIcon style={{color: 'lightgray'}} fontSize='medium'/>
                    </div>
                    <div className="chatWindow--btn" onClick={openEmojiBox}>
                        <TagFacesIcon style={{color: 'lightgray'}} fontSize='medium'/>
                    </div>
                </div>
                <div className="chatWindow--footer--inputarea">
                    <input className='chatWindow--input' placeholder='Digite sua mensagem...' type="text" name="" id="" />
                </div>
                <div className="chatWindow--footer--pos">
                    <div className="chatWindow--btn">
                        <SendIcon style={{color: 'lightgray'}} fontSize='medium'/>
                    </div>

                </div>
            </div>
        </div>
    )
}