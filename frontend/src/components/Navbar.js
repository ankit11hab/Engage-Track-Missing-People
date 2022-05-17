import React, { useEffect, useState } from 'react';
import './style.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';



const listOptions = [
  { name: "Dashboard", link: "/", image: <HomeOutlinedIcon style={{ color: "rgb(222, 222, 222)" }} />, index: 1, type: "all" },
  { name: "Missing People", link: "/missing-people", image: <PeopleOutlinedIcon />, index: 2, type: "all" },
  { name: "Add Missing Person", link: "/add/missing-person", image: <PersonAddAltOutlinedIcon />, index: 3, type: "logged" },
  { name: "Monitoring", link: "/adminmonitoring", image: <PeopleOutlinedIcon />, index: 4, type: "logged" },
];

const Navbar = () => {
  const location = useLocation()
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const isAuthenticated = useSelector(state => state.isAuthenticated)

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        console.log("Ok")
        setSelectedIndex(1)
        break;
      case '/missing-people':
        setSelectedIndex(2)
        break;
      case '/add/missing-person':
        setSelectedIndex(3)
    }
    console.log(selectedIndex)
  })



  console.log('Path:', location.pathname)
  return (
    <div className='left-nav-outer' style={{ position: "relative" }}>
      <div className='left-nav'>
        <div className='top-intro'>
          <div style={{ display: "flex" }}>
            <div><TravelExploreIcon style={{ color: "#6495ED" }} /></div>
            <div style={{ marginLeft: "6px" }}>faceRecog</div>
          </div>
        </div>
        <div className='bottom-links'>
          <ReactTooltip />
          {listOptions.map((item) => {
            return (
              <div>
                {!isAuthenticated && item.type == "all" || isAuthenticated ?
                  <Link to={item.link} className='bottom-link' style={{ backgroundColor: selectedIndex === item.index ? "#060f1f" : "#172338" }}>
                    <div style={{ transform: "translate(0,1px)" }}>{item.image}</div>
                    <div style={{ transform: "translate(0,3px)", marginLeft: "5px" }}>{item.name}</div>
                  </Link>
                  :
                  null
                }
                {!isAuthenticated && item.type == "logged" ?
                  <div data-tip="Please login to access this page" className='bottom-link-2'>
                    <div style={{ transform: "translate(0,1px)" }}>{item.image}</div>
                    <div style={{ transform: "translate(0,3px)", marginLeft: "5px" }}>{item.name}</div>
                  </div>
                  :
                  null
                }
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Navbar