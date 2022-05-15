import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

const Header = () => {
  return (
    <div className='header-main'>
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{marginLeft:"auto"}}>
          <NotificationsActiveOutlinedIcon style={{fontSize:"27px", color:"rgb(150, 150, 150)", margin:"10px 8px 10px 0"}} />
          {/* <AccountCircleOutlinedIcon style={{fontSize:"27px", color:"rgb(150, 150, 150)", margin:"10px 30px 10px 10px"}} /> */}
        </div>
        <div style={{margin:"12px 30px 10px 10px", fontWeight:"500", color:"#6495ED"}}>Log In</div>
      </div>
    </div>
  )
}

export default Header