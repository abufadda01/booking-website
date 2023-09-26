import React, { useState } from 'react'
import "./new.scss"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";


const New = ({inputs , title , btn}) => {

  const [file , setFile] = useState("")

  return (
    <div className='new'>
      
      <Sidebar/>

      <div className="newContainer">
        
        <Navbar/>
        
        <div className='top'>
          <h1>{title}</h1>
        </div>

        <div className="bottom">
        
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          
          <div className="right">
          
            <form>

              <div className="formInput">
                <label htmlFor="file">Image : <DriveFolderUploadOutlinedIcon className='icon'/></label>
                <input type="file" onChange={e => setFile(e.target.files[0])} id='file' style={{display: "none"}}/>
                {console.log(file)}
              </div>

              {inputs && inputs.map((value) => {
                return (
              <div className="formInput" key={value.id}>
                <label htmlFor="">{value.label}</label>
                <input type={value.type} placeholder={value.placeholder} />
              </div>
                )
              })}
              


              <button>{btn}</button>

            </form>
          
          </div>

        </div>
      
      </div>

    </div>
  )
}

export default New