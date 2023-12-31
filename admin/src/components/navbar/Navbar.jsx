import React from 'react'
import "./navbar.scss"
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ListIcon from '@mui/icons-material/List';
import {useDarkModeContext} from "../../context/darkModeContext"



const Navbar = () => {

  const {dispatch } = useDarkModeContext()

  return (
    <div className='navbar'>

        <div className="wrapper">
          
          <div className="search">
            <input type="text" placeholder='Search...' />
            <SearchIcon/>
          </div>

          <div className="items">

            <div className="item">
              <LanguageIcon className='icon'/>
              English
            </div>
            
            <div className="item" onClick={() => dispatch({type : "TOGGLE"})}>
              <DarkModeOutlinedIcon className='icon'/>
            </div>
            
            <div className="item">
              <FullscreenExitIcon className='icon'/>
            </div>
            
            <div className="item">
                <NotificationsNoneIcon className='icon'/>
                <div className="counter">1</div>
            </div>
            
            <div className="item">
              <ChatBubbleOutlineOutlinedIcon className='icon'/>
              <div className="counter">2</div>
            </div>
            
            <div className="item">
                <ListIcon className='icon'/>
            </div>

            <div className="item">
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              />
            </div>

          </div>

        </div>

    </div>
  )
}

export default Navbar