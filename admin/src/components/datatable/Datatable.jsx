import React, { useState } from 'react'
import "./datatable.scss"
import {DataGrid} from "@mui/x-data-grid"
import {userRows , userColumns} from "../../datatablesource"
import { Link } from 'react-router-dom'



const Datatable = () => {

    const [data , setData] = useState(userRows)
    
    // filter the data by keep only the ones which not equal to the coming id parameter
    const handleDelete = (id) => {
        console.log("fun")
        setData(data.filter((item) => item.id !== id ))
    }


    const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="cellAction">
                <Link to="/users/test" style={{ textDecoration: "none" }}>
                  <div className="viewButton">View</div>
                </Link>
                <div
                  className="deleteButton"
                  onClick={() => handleDelete(params.row.id)}
                >
                  Delete
                </div>
              </div>
            );
          },
        },
      ];



  return (
    <div className='datatable'>
      
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
        
        <DataGrid
        className='datagrid'
        rows={userRows}
        columns={userColumns.concat(actionColumn)}
        initialState={{
            pagination: {
                paginationModel : {
                    pageSize : 9
                }
            }
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        />
    </div>
  )
}



export default Datatable