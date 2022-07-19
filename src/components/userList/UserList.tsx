import React, { useState } from 'react'
import './userList.css'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import avatarDefault from '../../assets/images/avatar_default.png';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';


const UserList = () => {
  const userRows = [
    { id: 1, username: 'Snow', email: 'jhon@snow.com', status: 'Active' }
  ];

  const [data, setData] = useState(userRows);

  const handleDelete = (id:any) => {
    setData(data.filter((item) => item.id !== id))
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Username', width: 150, editable: true, 
      renderCell: (params: GridRenderCellParams<any>) => (
        <div className='userListUser'>
          <img className='userListImg' src={params.row.avatar || avatarDefault} alt=''/>
          { params.row.username }          
        </div>
      ),
      
    },
    { field: 'email', headerName: 'Email', width: 150, editable: true },
    { field: 'status', headerName: 'Status', width: 110 },
    { field: 'actions', headerName: 'Actions', width: 300, editable: false, renderCell: (params: GridRenderCellParams<any>) => (
      <div className='actionButtons'>
        <Link to={'/user/' + params.row.id}>
          <Button
            className='userListEdit'
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            tabIndex={params.hasFocus ? 0 : -1}
            startIcon={<EditIcon />} 
          >
            Edit
          </Button>
        </Link>
        
          <Button 
            className='userListDelete'
            variant="contained" 
            size="small"          
            style={{ marginLeft: 16 }} 
            tabIndex={params.hasFocus ? 0 : -1}
            startIcon={<DeleteIcon />} 
            onClick={() => handleDelete(params.row.id)}
          > 
            Delete 
          </Button>
        
        
      </div>
        
     
    ),}    
  ];
  

  return (
    <div className='userList'>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </div>
  )
}

export default UserList