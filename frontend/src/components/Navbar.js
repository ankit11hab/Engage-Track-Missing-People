import React from 'react';
import './style.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';

const listOptions = [
  { name: "Dashboard", Link: "/", image: <HomeOutlinedIcon style={{color: "rgb(222, 222, 222)"}} />, index: 1 },
  { name: "Missing People", Link: "/adminusers", image: <PeopleOutlinedIcon/>, index: 2 },
  { name: "Settings", Link: "/adminsettings", image: <PeopleOutlinedIcon />, index: 3 },
  { name: "Monitoring", Link: "/adminmonitoring", image: <PeopleOutlinedIcon />, index: 4 },
];

const Navbar = () => {

  return (
    <div className='left-nav'>
      <div className='top-intro'>
        <div style={{justifyContent:"center", alignItems:"center"}}>
          <div style={{display:"flex"}}>
            <div><TravelExploreIcon style={{color:"#6495ED"}} /></div>
            <div style={{marginLeft:"6px"}}>faceRecog</div>
          </div>
        </div>
      </div>
      <div className='bottom-links'>
        {listOptions.map((item)=>{
          return(
            <div className='bottom-link'>
              <div style={{transform:"translate(0,1px)"}}>{item.image}</div>
              <div style={{transform:"translate(0,3px)", marginLeft:"5px"}}>{item.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Navbar