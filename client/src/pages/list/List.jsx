import React, { useState } from 'react'
import Navabr from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import './list.css'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'



const List = () => {

  const location = useLocation()

  const [destination , setDestination] = useState(location.state.destination)
  const [dates , setDates] = useState(location.state.dates)
  const [options , setOptions] = useState(location.state.options)
  
  const [openDate , setOpenDate] = useState(false)

  const [min , setMin] = useState(undefined)
  const [max , setMax] = useState(undefined)

  const {data , loading , error , reFetch} = useFetch(`http://localhost:5000/api/hotels?city=${destination}&min=${min || 1}&max=${max || 999}`)


  const handleReFetch = () => {
    reFetch()
  }

  
  return (
    <div>
      <Navabr/>
      <Header type="list"/>

      <div className="listContainer">

        <div className="listWrapper">

          <div className="listSearch">

            <h1 className='lsTitle'>Search</h1>

            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder={destination || "place to visit"} />
            </div>

            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}> {`${format(dates[0].startDate , "MM/dd/yyyy")} to ${format(dates[0].endDate , "MM/dd/yyyy")}`}</span>
              {openDate && <DateRange 
                onChange={item => setDates([item.selection])}
                minDate={new Date()}
                ranges={dates}
              />}
            </div>

            <div className="lsItem">
              
              <label>Options</label>

              <div className="lsOptions">

              <div className="lsOptionsItem">
                <span className='lsOptionText'>Min Price<small>per night</small></span>
                <input type="number" onChange={(e) => setMin(e.target.value)} className='lsOptionInput' />
              </div>

              <div className="lsOptionsItem">
                <span className='lsOptionText'>Max Price  <small> per night</small></span>
                <input type="number" onChange={(e) => setMax(e.target.value)} className='lsOptionInput' />
              </div>

              <div className="lsOptionsItem">
                <span className='lsOptionText'>Adult</span>
                <input min={1} type="number" className='lsOptionInput' placeholder={options.adult} />
              </div>

              <div className="lsOptionsItem">
                <span className='lsOptionText'>Children</span>
                <input min={0} type="number" className='lsOptionInput' placeholder={options.children} />
              </div>

              <div className="lsOptionsItem">
                <span className='lsOptionText'>Room</span>
                <input min={1} type="number" className='lsOptionInput' placeholder={options.room}/>
              </div>

              </div>  

            </div>

                <button onClick={handleReFetch}>Search</button>

          </div>


          <div className="listResult">

            {loading ? "loading please wait" : <>
              {data && data.map((item) => {
                return <SearchItem item={item} key={item._id}/>
              })} 
            </>}   

          </div>

        </div>

      </div>

    </div>
  )
}

export default List