import React, { useEffect, useState } from 'react';
import './style.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { useLocation, Link } from 'react-router-dom';



const listOptions = [
  { name: "Dashboard", link: "/", image: <HomeOutlinedIcon style={{color: "rgb(222, 222, 222)"}} />, index: 1 },
  { name: "Missing People", link: "/missing-people", image: <PeopleOutlinedIcon/>, index: 2 },
  { name: "Settings", link: "/adminsettings", image: <PeopleOutlinedIcon />, index: 3 },
  { name: "Monitoring", link: "/adminmonitoring", image: <PeopleOutlinedIcon />, index: 4 },
];

const Navbar = () => {
  const location = useLocation()
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    switch(location.pathname) {
      case '/':
        console.log("Ok")
        setSelectedIndex(1)
        break;
      case '/missing-people':
        setSelectedIndex(2)
    }
    console.log(selectedIndex)
  })
  


  console.log('Path:',location.pathname)
  return (
    <div className='left-nav-outer' style={{position:"relative"}}>
    <div className='left-nav'>
      <div className='top-intro'>
        <div style={{display:"flex"}}>
          <div><TravelExploreIcon style={{color:"#6495ED"}} /></div>
          <div style={{marginLeft:"6px"}}>faceRecog</div>
        </div>
      </div>
      <div className='bottom-links'>
        {listOptions.map((item)=>{
          return(
            <Link to={item.link} className='bottom-link' style={{backgroundColor:selectedIndex === item.index ?"#060f1f":"#172338"}}>
              <div style={{transform:"translate(0,1px)"}}>{item.image}</div>
              <div style={{transform:"translate(0,3px)", marginLeft:"5px"}}>{item.name}</div>
            </Link>
          )
        })}
      </div>
    </div>
    </div>
  )
}

export default Navbar