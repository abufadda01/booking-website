import React from 'react'
import './mailList.css'


const MailList = () => {
  return (
    <div className='mail'>
        
        <h1 className='mailTitle'>save time , save money !</h1>
        <span className='mailDesc'>sign up today to get our best deals</span>

        <div className="mailInputContainer">
            <input type="text" placeholder='name@example.com' />
            <button>Subscribe</button>
        </div>

    </div>
  )
}

export default MailList