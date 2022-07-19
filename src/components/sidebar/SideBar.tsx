import React from 'react'
import './sidebar.css'
import HomeIcon from '@mui/icons-material/Home'
import LinkIcon from '@mui/icons-material/Link'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">First Menu</h3>
                <ul className="sidebarList">
                        <li className="sidebarListItem active">
                            <Link to="/">
                                <HomeIcon className='sidebarIcon'/>
                                Home 
                            </Link>
                        </li>
                        <li className="sidebarListItem">
                            <Link to='/user'>
                                <LinkIcon className='sidebarIcon'/>
                                Users
                            </Link>
                        </li>                   
                        <li className="sidebarListItem">
                            <LinkIcon className='sidebarIcon'/>
                            Link 2
                        </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Second Menu</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem active">
                        <LinkIcon className='sidebarIcon'/>
                        Link 3
                    </li>
                    <li className="sidebarListItem">
                        <LinkIcon className='sidebarIcon'/>
                        Link4
                    </li>
                    <li className="sidebarListItem">
                        <LinkIcon className='sidebarIcon'/>
                        Link 5
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default SideBar