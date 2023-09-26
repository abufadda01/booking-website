import React, { useState } from 'react'
import "./login.css"
import { useAuthContext } from '../../context/AuthContext'
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Login = () => {

    const [credentials , setCredentials] = useState({
        username : undefined ,
        password  :undefined
    })

    
    const {user , loading , error , dispatch} = useAuthContext()
    const navigate = useNavigate()
    
    const handleChange = (e) => {
        setCredentials(prev => ({
            ...prev ,
            [e.target.id] : e.target.value
        }))
    }


    const handleClick = async (e) => {
        e.preventDefault()

        dispatch({type : "LOGIN_START"})

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login" , credentials)
            dispatch({type : "LOGIN_SUCCESS" , payload : response.data.details})
            navigate("/")

        } catch (error) {
            dispatch({type : "LOGIN_FAILURE" , payload : error.response.data})
        }
    }


    console.log(user)

  return (
    <div className='login'>
        <div className="lContainer">
            <input type="text" id='username' placeholder='username' onChange={handleChange} className="lInput" />
            <input type="password" id='password' placeholder='password' onChange={handleChange} className="lInput" />
            <button onClick={handleClick} disabled={loading} className='lButton'>Login</button>

            {error && <span>{error.message}</span>}

        </div>
    </div>
  )
}

export default Login