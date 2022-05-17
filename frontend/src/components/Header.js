import React, { useState } from 'react';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getPoliceStationDetails, loginUser, logoutUser } from '../actions/action';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  height: 250,
  bgcolor: 'background.paper',
  borderRadius: '6px',
  boxShadow: 24,
  p: 4,
};

const selectStyle = {

  menu: (provided, state) => ({
    ...provided,
    width: '105px',
    transform: 'translate(-20px,0)',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#EBEEF4' : 'white',
    color: '#636363',
    padding: 10,
    margin: '3%',
    width: "94%",
    borderRadius: "5px",
    fontFamily: 'system-ui',
    fontSize: "14px"
  }),
  control: base => ({
    ...base,
    color: "red",
    // This line disable the blue border
    boxShadow: "none",
    width: "93px",
    height: "40px",
    cursor: "pointer",
    fontFamily: 'Roboto',
    fontSize: "14px",
    background: 'transparent',
    border: "none",
    display: "hidden",
    fontSize: "0px"
  })
}

const options = [
  { value: 'edit', label: 'Edit profile' },
  { value: 'logout', label: 'Sign out' },
]

const Header = () => {

  const [psUid, setPsUid] = useState("");
  const [password, setPassword] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const handleloginModalOpen = () => setLoginModalOpen(true);
  const handleloginModalClose = () => setLoginModalOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.isAuthenticated)
  const psd = useSelector(state => state.police_station_details)

  const handleLogin = async () => {
    const data = await dispatch(loginUser(psUid, password));
    const data2 = await dispatch(getPoliceStationDetails(data.data.access));
    console.log(data);
    if (data.status === 200)
      handleloginModalClose();
  }

  const handleLogout = async () => {
    console.log("clicked")
    await dispatch(logoutUser())
  }

  const handleChange = (e) => {
    if (e.value === 'logout')
      handleLogout();
    if (e.value === 'edit')
      navigate(`/edit-profile`);
  }

  return (



    <div className='header-main'>

        {isAuthenticated ?
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: "auto" }}>
              <NotificationsActiveOutlinedIcon style={{ fontSize: "27px", color: "rgb(150, 150, 150)", margin: "12px 8px 10px 0", transform: "translate(62px,0)" }} />
            </div>
            <div style={{ fontSize: "15px", fontWeight: "500", color: "rgb(52, 52, 52)", margin: "15px 0px 10px 10px", transform: "translate(62px,0)" }}>
              {psd.police_station_uid}
            </div>
            <button style={{ margin: "0 25px 0 0", fontWeight: "500", color: "#3f7bea", border: "none", outline: "none", cursor: "pointer", background: "white", fontSize: "16px" }}>
              <Select options={options} components={{
                IndicatorSeparator: () => null
              }}
                onChange={handleChange}
                styles={selectStyle}
              />
            </button>
          </div>
          :
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: "auto" }}>
              <NotificationsActiveOutlinedIcon style={{ fontSize: "27px", color: "rgb(150, 150, 150)", margin: "12px 8px 10px 0" }} />
            </div>
            <button onClick={handleloginModalOpen} style={{ margin: "6px 30px 10px 10px", fontWeight: "500", color: "#3f7bea", border: "none", outline: "none", cursor: "pointer", background: "white", fontSize: "15px" }}>Sign In</button>
          </div>
          }

        <Modal
          open={loginModalOpen}
          onClose={handleloginModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div style={{ fontWeight: "500", fontSize: "14px", color: "rgb(70,70,70)" }}>
                Police Station ID:
              </div>
              <div>
                <input onChange={(e) => setPsUid(e.target.value)} type="text" style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "30px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} />
              </div>
              <div style={{ fontWeight: "500", fontSize: "14px", marginTop: "14px", color: "rgb(70,70,70)" }}>
                Password:
              </div>
              <div>
                <input onChange={(e) => setPassword(e.target.value)} type="password" style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "30px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} />
              </div>
              <div style={{ fontWeight: "500", fontSize: "14px", marginTop: "12px", color: "#3f7bea" }}>
                Forgot Password?
              </div>
              <button onClick={handleLogin} className='sign-in-btn'>
                Sign in
              </button>
            </form>
          </Box>
        </Modal>
      </div>
  )
}

export default Header