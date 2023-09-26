import React from 'react'
import "./single.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Chart from "../../components/chart/Chart"
import Tab from "../../components/tab/Tab"


const Single = () => {
  return (
    <div className='single'>

        <Sidebar/>

      <div className="singleContainer">
        
        <Navbar/>
        
        <div className="top">

          <div className="left">

            <div className="editButton">Edit</div>
            
            <h1 className="title">Information</h1>
            
            <div className="item">

              <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="imageItem" />
              
              <div className="details">
                
                <h1 className="itemTitle">John Deo</h1>
                
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>

              </div>
            
            </div>
          
          </div>
          
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)"/>
          </div>
        
        </div>

        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <Tab/>
        </div>
      
      </div>

    </div>
  )
}

export default Single