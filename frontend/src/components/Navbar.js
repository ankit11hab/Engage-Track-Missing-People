import React, { useEffect, useState } from 'react';
import './style.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import VideoCameraFrontOutlinedIcon from '@mui/icons-material/VideoCameraFrontOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';



const listOptions = [
  { name: "Dashboard", link: "/", image: <HomeOutlinedIcon style={{ color: "rgb(222, 222, 222)" }} />, index: 1, type: "all" },
  { name: "Missing People", link: "/missing-people", image: <PeopleOutlinedIcon style={{ color: "rgb(222, 222, 222)" }} />, index: 2, type: "all" },
  { name: "Add Missing Person", link: "/add/missing-person", image: <PersonAddAltOutlinedIcon style={{ color: "rgb(222, 222, 222)" }} />, index: 3, type: "logged" },
  { name: "Monitoring", link: "/monitoring", image: <VideoCameraFrontOutlinedIcon style={{ color: "rgb(222, 222, 222)" }} />, index: 4, type: "logged" },
  { name: "Police Stations", link: "/police-stations", image: <FileUploadOutlinedIcon style={{ color: "rgb(222, 222, 222)", transform:"translate(-2.5px, 0)" }} />, index: 5, type: "admin" },
];

const Navbar = () => {
  const location = useLocation()
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const isAuthenticated = useSelector(state => state.isAuthenticated)
  const user = useSelector(state => state.police_station_details)
  const monitoring = useSelector(state => state.monitoring)

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setSelectedIndex(1)
        break;
      case '/missing-people':
        setSelectedIndex(2)
        break;
      case '/add/missing-person':
        setSelectedIndex(3)
        break;
      case '/monitoring':
        setSelectedIndex(4)
        break;
      case '/police-stations':
        setSelectedIndex(5)
    }
  })


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
                {
                  monitoring ?
                    <div data-tip="Please login to access this page" className='bottom-link-2'>
                      <div style={{ transform: "translate(0,1px)" }}>{item.image}</div>
                      <div style={{ transform: "translate(0,3px)", marginLeft: "5px" }}>{item.name}</div>
                    </div>
                    :
                  null

                }
                {!monitoring && !isAuthenticated && item.type === "all" || !monitoring && isAuthenticated && item.type !== "admin" ?
                  <Link to={item.link} className='bottom-link' style={{ backgroundColor: selectedIndex === item.index ? "#060f1f" : "#172338" }}>
                    <div style={{ transform: "translate(0,1px)" }}>{item.image}</div>
                    <div style={{ transform: "translate(0,3px)", marginLeft: "5px" }}>{item.name}</div>
                  </Link>
                  :
                  null
                }
                {!monitoring && !isAuthenticated && item.type == "logged" ?
                  <div data-tip="Please login to access this page" className='bottom-link-2'>
                    <div style={{ transform: "translate(0,1px)" }}>{item.image}</div>
                    <div style={{ transform: "translate(0,3px)", marginLeft: "5px" }}>{item.name}</div>
                  </div>
                  :
                  null
                }
                {!monitoring && isAuthenticated && user.is_admin && item.type === "admin" ?
                  <Link to={item.link} className='bottom-link' style={{ backgroundColor: selectedIndex === item.index ? "#060f1f" : "#172338" }}>
                    <div style={{ transform: "translate(0,1px)" }}>{item.image}</div>
                    <div style={{ transform: "translate(0,3px)", marginLeft: "5px" }}>{item.name}</div>
                  </Link>
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