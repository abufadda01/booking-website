import React from 'react'
import "./sidebar.scss"
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import FilterFramesOutlinedIcon from '@mui/icons-material/FilterFramesOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from "react-router-dom"
import {useDarkModeContext} from "../../context/darkModeContext"



const Sidebar = () => {

    const {dispatch } = useDarkModeContext()

  return (
    <div className='sidebar'>

        <div className="top">
            <Link to="/" style={{textDecoration : "none"}}>
              <span className='logo'>Tasker</span>
            </Link>
        </div>

        <hr />
        
        <div className="center">

            <ul>

                <p className="title">MAIN</p>

                <li>
                    <DashboardCustomizeIcon className='icon'/>
                    <span>Dashboard</span>
                </li>

                <p className="title">LISTS</p>
                
                <Link to="/users" style={{textDecoration : "none"}}>
                <li>
                    <PersonOutlineOutlinedIcon className='icon'/>
                    <span>Users</span>
                </li>                
                </Link>

                <Link to="/products" style={{textDecoration : "none"}}>
                <li>
                    <ProductionQuantityLimitsOutlinedIcon className='icon'/>
                    <span>Products</span>
                </li>
                
                </Link>

                <li>
                    <FilterFramesOutlinedIcon className='icon'/>
                    <span>Orders</span>
                </li>

                <li>
                    <LocalShippingOutlinedIcon className='icon'/>
                    <span>Delivery</span>
                </li>

                <p className="title">USEFUL</p>
                <li>

                    <BarChartIcon className='icon'/>
                    <span>Stats</span>
                </li>

                <li>
                    <NotificationsIcon className='icon'/>
                    <span>Notifications</span>
                </li>

                <p className="title">SERVICE</p>
                <li>
                    <SettingsSystemDaydreamIcon className='icon'/>
                    <span>System Health</span>
                </li>

                <li>
                    <PsychologyIcon className='icon'/>
                    <span>Logs</span>
                </li>

                <p className="title">USER</p>
                <li>
                    <AccountCircleIcon className='icon'/>
                    <span>Profile</span>
                </li>

                <li>
                    <LogoutIcon className='icon'/>
                    <span>Logout</span>
                </li>

            </ul>

        </div>
        
        <div className="bottom">
            <div className="colorOptions" onClick={() => dispatch({type : "LIGHT"})}></div>
            <div className="colorOptions" onClick={() => dispatch({type : "DARK"})}></div>
            <div className="colorOptions"></div>
        </div>
    
    </div>
  )
}


export default Sidebar