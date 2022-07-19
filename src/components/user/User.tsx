import React from 'react'
import './user.css'
import avatarDefault from '../../assets/images/avatar_default.png';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { CalendarToday, MailOutline, PhoneAndroid, Publish } from '@mui/icons-material';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { Link } from 'react-router-dom';

export const User = () => {
  return (
    <div className='user'>
        <div className="userTitleContainer">
           <h1 className='userTitle'>Edit User</h1> 
           <Link to='/user/newUser'>
                <button className='userAddButton'>Create</button>
           </Link>            
        </div>
        <div className="userContainer">
            <div className="userShow">
                <div className="userShowTop">
                    <img className='userShowImg' src={avatarDefault} alt="" />
                    <div className="userShowTopTitle">
                        <span className="userShowUsername">Leonardo Nieves</span>
                        <span className="userShowUserTitle">SDE</span>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                        <PermIdentityIcon className='userShowicon' />
                        <span className="userShowInfoTitle">djleito.nieves</span>
                    </div>
                    <div className="userShowInfo">
                        <CalendarToday className='userShowicon' />
                        <span className="userShowInfoTitle">12.9.1991</span>
                    </div> 
                    <span className="userShowTitle">Contact Details</span>
                    <div className="userShowInfo">
                        <PhoneAndroid className='userShowicon' />
                        <span className="userShowInfoTitle">+53 56561428</span>
                    </div> 
                    <div className="userShowInfo">
                        <MailOutline className='userShowicon' />
                        <span className="userShowInfoTitle">djleito.nieves@gmail.com</span>
                    </div>     
                    <div className="userShowInfo">
                        <LocationSearchingIcon className='userShowicon' />
                        <span className="userShowInfoTitle">Las Tunas | Cuba</span>
                    </div>                 
                </div>
            </div>
            <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form action="" className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label>Username</label>
                            <input 
                                type='text' 
                                placeholder='djleito.nieves'
                                className='userUpdateInput'
                                readOnly
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Fullname</label>
                            <input 
                                type='text' 
                                placeholder='Leonardo Nieves'
                                className='userUpdateInput'
                                
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input 
                                type='text' 
                                placeholder='djleito.nieves'
                                className='userUpdateInput'
                                readOnly
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Phone</label>
                            <input 
                                type='text' 
                                placeholder='+53 56561428'
                                className='userUpdateInput'
                                
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Address</label>
                            <input 
                                type='text' 
                                placeholder='Las Tunas | Cuba'
                                className='userUpdateInput'
                                
                            />
                        </div>
                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img src={avatarDefault} alt="" className="userUpdateImg" />
                            <label htmlFor='file'><Publish className='userUpdateIcon'/></label>
                            <input type='file' id='file' style={{display:"none"}}/>
                        </div>
                        <button className="userUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
