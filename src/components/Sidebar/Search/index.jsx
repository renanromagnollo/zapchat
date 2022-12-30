import React, {memo} from 'react'
import './index.css'

import SearchIcon from '@mui/icons-material/Search';


function Search() {
    return (
        <div className="search">
          <div className="search--input">
            <SearchIcon fontSize='small' style={{color: '#919191'}}/>
            <input type="search" placeholder='Procurar ou começar nova conversa'/>
          </div>
        </div>
    )
}

export default memo(Search)