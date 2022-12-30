import React, {memo} from 'react'
import './index.css'

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Header({user, handleNewChat}) {
    return (
        <header>
          <img className='header--avatar' src={user.avatar} alt="avatar" />
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{color: 'lightgray'}}/>
            </div>
            <div className="header--btn" onClick={handleNewChat}>
              <ChatIcon style={{color: 'lightgray'}}/>
            </div>
            <div className="header--btn">
              <MoreVertIcon style={{color: 'lightgray'}}/>
            </div>
          </div>
          
        </header>
    )
}

export default memo(Header)