import React from 'react'
import './topbar.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import avatarDefault from '../../assets/images/avatar_default.png';

const TopBar = () => {
  return (
    <div className='topbar'>
			<div className='topbarWrapper'>
				<div className='topLeft'>
					<span className='logo'>Logo here</span>
				</div>
				<div className='topRight'>
					<div className='topbarIconContainer'>
						<NotificationsNoneIcon />
						<span className='topIconBagde'>2</span>
					</div>
					<div className='topbarIconContainer'>
						<LanguageIcon />
						<span className='topIconBagde'>2</span>
					</div>
					<div className='topbarIconContainer'>
						<SettingsIcon />
					</div>
					<img src={avatarDefault} alt="avatar" className="topAvatar" />
				</div>
			</div>        
    </div>
  )
}
export default TopBar
