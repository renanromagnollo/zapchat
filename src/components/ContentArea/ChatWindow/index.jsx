import React, {useState, useEffect, useRef, memo} from 'react'
import './index.css'

import EmojiPicker from 'emoji-picker-react';

import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SendIcon from '@mui/icons-material/Send';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import CloseIcon from '@mui/icons-material/Close';
import MessageItem from './MessageItem';
import Api from '../../../api/Api';

export default memo(function({chat, user}) {

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if(SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition()
        recognition.lang = "pt-BR";
    }

    const body = useRef()

    const [emojisOpen, setEmojiOpen] = useState(false)
    const [text, setText] = useState('')
    const [listening, setListening] = useState(false)
    const [chatMsgs, setChatMsgs] = useState([])
    const [usersInChat, setUsersInChat] = useState([])

    
    useEffect(() => {
        setChatMsgs([])
        let unchat = Api.onChatMsgs(chat.chatId, setChatMsgs, setUsersInChat)
        return unchat
    }, [chat.chatId])

    useEffect(() => {
        if(body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
        }

        
    }, [chatMsgs])
    
    useEffect(() => {
        setChatMsgs([])
        let unChat = Api.onChatMsgs(chat.chatId, setChatMsgs, setUsersInChat)
        return unChat
    }, [chat.chatId])
    
    const handleInputKeyUp = (e) => {
        if(e.keyCode == 13) handleSendClick()
    }

    const handleSendClick = () => {
        if (text !== '') {
            Api.sendMsg(chat, user.id, 'text', text, usersInChat)
            setText('')
            setEmojiOpen(false)
        }
    }

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

    return (
        <div className='chatWindow'>
            <div className="chatWindow--header">
                <div className="chatWindow--info">
                    <img className="chatWindow--avatar" src={chat.avatar} alt="avatar" />
                    <div className="chatWindow--name">{chat.chatTitle}</div>
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
            <div ref={body} className="chatWindow--body">
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
                        chatMsgs.map((item, key) => {
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
                        onKeyUp={handleInputKeyUp}
                    />
                </div>
                <div className="chatWindow--footer--pos">
                    {text 
                        ? 
                        <div className="chatWindow--btn" onClick={handleSendClick}>
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
})