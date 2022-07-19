import React from 'react'
import './newuser.css'

export const NewUser = () => {
  return (
    <div className='newUser'>
        <h1 className="newUserTitle">New user</h1>
        <form className="newUserForm">
            <div className="newUserItem">
                <label>Username</label>
                <input type='text' placeholder='johnwick' />
            </div>
            <div className="newUserItem">
                <label>Full Name</label>
                <input type='text' placeholder='John Wick' />
            </div>
            <div className="newUserItem">
                <label>Email</label>
                <input type='email' placeholder='johnwick@gmail.com' />
            </div>
            <div className="newUserItem">
                <label>Password</label>
                <input type='password' placeholder='Password'/>
            </div>
            <div className="newUserItem">
                <label>Phone</label>
                <input type='text' placeholder='+53 56561428'/>
            </div>
            <div className="newUserItem">
                <label>Address</label>
                <input type='text' placeholder='Las Tunas | Cuba'/>
            </div>
            <div className="newUserItem">                
                <div className="newUserGender">
                    <label>Gender</label> 
                    <input type='radio' name='gender' id='male' value='male'/>
                    <label htmlFor="male">Male</label>
                    <input type='radio' name='gender' id='female' value='female'/>
                    <label htmlFor="female">Female</label>
                    <input type='radio' name='gender' id='other' value='other'/>
                    <label htmlFor="other">Other</label>
                </div>                
            </div>
            <div className="newUserItem">
                <label>Active</label>
                <select className='newUserSelect' name='active' id='active'>
                    <option value='yes'>Yes</option>
                    <option value='no'>No</option>
                </select>
            </div>
            <button className="newUserButton">Create</button>
        </form>
    </div>
  )
}
