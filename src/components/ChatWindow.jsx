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
    const [text, setText] = useState('')
    

    const handleEmojisBox = () => {
        setEmojiOpen(!emojisOpen)
    }

    const handleEmojiClick = (e) => {
        // console.log('e:', e)
        // console.log('emojiObject:', emojiObject)
        setText(text + e.emoji)
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
                        <SearchIcon style={{color: 'lightgray'}}/>
                    </div>
                    <div className="chatWindow--btn">
                        <AttachFileIcon style={{color: 'lightgray'}}/>
                    </div>
                    <div className="chatWindow--btn">
                        <MoreVertIcon style={{color: 'lightgray'}}/>
                    </div>
                        
                </div>
            </div>
            <div className="chatWindow--body">
                {emojisOpen &&
                    <div className="chatWindow--emojiarea" style={{height: emojisOpen ? '100%' : 0}}>
                    <EmojiPicker 
                        onEmojiClick={handleEmojiClick}
                        // disableSearchBar
                        // disableSkinTonePicker
                    />
                </div>}
                <div className="chatWindow--chatmsgsarea"></div>
            </div>
            <div className="chatWindow--footer">
                <div className="chatWindow--footer--pre">
                    {/* <div className="chatWindow--btn" onClick={closeEmojiBox} style={{width: emojisOpen ? '50px' : '0px', display: emojisOpen ? 'block' : 'none'}}>
                        <CloseIcon style={{color: 'lightgray'}}/>
                    </div> */}
                    <div className="chatWindow--btn" onClick={handleEmojisBox}>
                        <TagFacesIcon style={{color: emojisOpen? 'yellow' : 'lightgray'}}/>
                    </div>
                </div>
                <div className="chatWindow--footer--inputarea">
                    <input 
                        className='chatWindow--input' 
                        placeholder='Digite sua mensagem...' 
                        type="text" 
                        value={text}
                        onChange={e => {
                            // console.log('target:', e.target.value)
                            setText(e.target.value)}}
                    />
                </div>
                <div className="chatWindow--footer--pos">
                    {text 
                        ? 
                        <div className="chatWindow--btn">
                            <SendIcon style={{color: 'lightgray'}}/>
                        </div>
                        :
                        <div className="chatWindow--btn">
                            <KeyboardVoiceIcon style={{color: 'lightgray'}}/>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}