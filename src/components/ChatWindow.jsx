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
import MessageItem from './MessageItem';

export default function({user}) {

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if(SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition()
        recognition.lang = "pt-BR";
    }

    const [emojisOpen, setEmojiOpen] = useState(false)
    const [text, setText] = useState('')
    const [listening, setListening] = useState(false)
    const [listMsgs, setListMsgs] = useState([
        {author: 1, msg: 'bla bla bla'}, 
        {author: 2, msg: 'bla bla bla bla bla'}, 
        {author: 3, msg: 'bla bla bla bla bla bla'}
    ])
    

    const handleEmojisBox = () => {
        setEmojiOpen(!emojisOpen)
    }

    const handleEmojiClick = (e) => {
        // console.log('e:', e)
        // console.log('emojiObject:', emojiObject)
        setText(text + e.emoji)
    }

    const handleMicClick = () => {
        if(recognition !== null ) {
            recognition.onstart = () => { //quando começar a escutar
                setListening(true)
            }
            recognition.onend = () => { // qnd parar
                setListening(false)
                
            }
            recognition.onresult = (e) => { // qnd chegar o resultado
                setText(e.results[0][0].transcript) // pegando a transcrição
            }

            recognition.start(); // começar a escutar

            recognition.onspeechend = () => {
                recognition.stop();
              }
        }
    }

    const sendMsg = (author, msg) => {
         setListMsgs([
             {
                 author, 
                 msg
             },
            ...listMsgs 
         ])
         setText('')
    }

    

    return (
        <div className='chatWindow'>
            <div className="chatWindow--header">
                <div className="chatWindow--info">
                    <img className="chatWindow--avatar" src={user.image} alt="avatar" />
                    <div className="chatWindow--name">{user.name}</div>
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
                <div className="chatWindow--chatmsgsarea">
                    {
                        listMsgs.map((item, key) => {
                            return (
                                <MessageItem 
                                key={key}
                                data={item}
                                user={user}
                            />
                            )
                            
                        })
                    }
                </div>
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
                        <div className="chatWindow--btn" onClick={() => sendMsg(user.id, text)}>
                            <SendIcon style={{color: 'lightgray'}}/>
                        </div>
                        :
                        <div className="chatWindow--btn" onClick={handleMicClick}>
                            <KeyboardVoiceIcon style={{color: listening ? 'green' : 'lightgray'}}/>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}