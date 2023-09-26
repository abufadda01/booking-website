import React from 'react'
import "./navbar.css"
import {Link , useNavigate} from "react-router-dom"
import { useAuthContext } from '../../context/AuthContext'

const Navbar = () => {

  const {user , dispatch} = useAuthContext()
  const navigate = useNavigate()

  const logout = (e) => {
    e.preventDefault()
    dispatch({type : "LOGOUT"})
    navigate("/")
  }


  return (

    <div className='navbar'>
        
        <div className='navbarContainer'>

            <Link to='/' style={{color : "inherit" , textDecoration : "none"}}>
              <span className='logo'>BookNook</span>
            </Link>
            
            {user ? user.username : <div className='navItems'>
                <button className='navButton'>Register</button>
                <button className='navButton'>Login</button>
            </div>}

            {user && <div className='navItems'>
              <button className='navButton' onClick={logout}>Logout</button>
            </div>}

        </div>

    </div>
  )
}

export default Navbar