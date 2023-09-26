import React, { useState } from 'react'
import './header.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi} from "@fortawesome/free-solid-svg-icons"
import {DateRange} from "react-date-range"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns"
import { useNavigate } from 'react-router-dom'
import { useSearchContext } from '../../context/SearchContext'
import { useAuthContext } from '../../context/AuthContext'



const Header = ({type}) => {

  const {dispatch} = useSearchContext()

  const navigate = useNavigate()
  const [destination , setDestination] = useState("")

  const [openDate , setOpenDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);


  const [openOptions , setOpenOptions] = useState(false)
  const [options , setOptions] = useState({
    adult : 1 ,
    children : 0 ,
    room : 1
  })

  const {user} = useAuthContext()



  const handleChange = (name , operation) => {
    // prev parameter to hold the state prev values , [name] bring the key name that we want to update from options object
    // if operation = i ,  [name] will be the options[name] the last key value + 1 else -1 
    // adult = adult + 1
    setOptions((prev) => {
      return{
        ...prev ,
        [name] : operation === "i" ? options[name] + 1 : options[name] - 1 ,
      }
    })
  }



  const handleSearch = () => {
    dispatch({type : "NEW_SEARCH" , payload : {destination , dates , options}})
    navigate('/hotels' , {state : {destination , dates , options}})
  }

  const navigateLogin = (e) => {
    e.preventDefault()
    navigate("/login")
  }


  
  return (
    <div className='header'>

      {/* change the style class depends on the props value */}
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"} >

        <div className="headerList">

            <div className="headerListItem active">
                <FontAwesomeIcon icon={faBed} />   
                <span>Stays</span>  
            </div>

            <div className="headerListItem">
                <FontAwesomeIcon icon={faPlane} />   
                <span>Flights</span>  
            </div>

            <div className="headerListItem">
                <FontAwesomeIcon icon={faCar} />   
                <span>Car Rentals</span>  
            </div>

            <div className="headerListItem">
                <FontAwesomeIcon icon={faBed} />   
                <span>Attractions</span>  
            </div>

            <div className="headerListItem">
                <FontAwesomeIcon icon={faTaxi} />   
                <span>Airport Taxi</span>  
            </div>

        </div>


        {/* to render these part only if the props value not equal to list */}
        {type !== "list" && <>
        <h1 className='headerTitle'>The Greatest Place For Your Next Journey</h1>
        <p className="headerDesc">Get Reward for your travels - Unlock instant savings of 10% or more when create your free BookNook account</p>
        {!user && <button onClick={navigateLogin} className='headerBtn'>Login / Register</button>}


        <div className="headerSearch">


          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className='headerIcon'/>
            <input 
            type="text" 
            placeholder='Where are you going ?' 
            className='headerSearchInput'
            onChange={(e) => setDestination(e.target.value)} 
            />
          </div>


          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
            {/* // date[0].startDate the first object inside the date array */}
            <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate , "MM/dd/yyyy")} to ${format(dates[0].endDate , "MM/dd/yyyy")}`}</span>
            
            {openDate && <DateRange 
            editableDateInputs={true} 
            onChange={item => setDates([item.selection])} 
            moveRangeOnFirstSelection={false} 
            ranges={dates}
            minDate={new Date()}
            className='date' 
            />}

          </div>


          <div className="headerSearchItem">

            <FontAwesomeIcon icon={faPerson} className='headerIcon'/>
            <span onClick={() => setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult . ${options.children} children . ${options.room} room `}</span>            

            {openOptions && <div className="options">

              <div className="optionItem">
                <span className="optionText">adult</span>

                <div className="optionCounter">
                  <button className="optionCounterButton" disabled={options.adult <= 1} onClick={() => handleChange("adult" , "d")}>-</button>
                  <span className="optionCounterNumber">{options.adult}</span>
                  <button className="optionCounterButton" onClick={() => handleChange("adult" , "i")}>+</button>
                </div>

              </div>

              <div className="optionItem">
                <span className="optionText">children</span>

                <div className="optionCounter">
                  <button className="optionCounterButton" disabled={options.children <= 0} onClick={() => handleChange("children" , "d")}>-</button>
                  <span className="optionCounterNumber">{options.children}</span>
                  <button className="optionCounterButton" onClick={() => handleChange("children" , "i")}>+</button>
                </div>

              </div>

              <div className="optionItem">
                <span className="optionText">room</span>

                <div className="optionCounter">
                  <button className="optionCounterButton" disabled={options.room <= 1} onClick={() => handleChange("room" , "d")}>-</button>
                  <span span className="optionCounterNumber">{options.room}</span>
                  <button className="optionCounterButton" onClick={() => handleChange("room" , "i")}>+</button>
                </div>

              </div>

            </div>}

          </div>


          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>Search</button>
          </div>

        </div> 
            </> }

      </div>
      
    </div>
  )
}



export default Header