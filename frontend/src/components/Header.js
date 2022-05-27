import React, { useEffect, useState } from 'react';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, editNotificationStatus, getNotifications, getPoliceStationDetails, loginUser, logoutUser } from '../actions/action';
import Select from 'react-select';
import { useNavigate, Link } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LockResetIcon from '@mui/icons-material/LockReset';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const style = {
  position: 'absolute',
  top: '50%',
  outline: 'none',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  height: 100,
  bgcolor: 'background.paper',
  borderRadius: '6px',
  boxShadow: 24,
  p: 4,
};

const selectStyle = {

  menu: (provided, state) => ({
    ...provided,
    width: '170px',
    transform: 'translate(-50px,0)'
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

const notificationStyle = {

  menu: (provided, state) => ({
    ...provided,
    width: '230px',
    transform: 'translate(-50px,0)'
  }),
  singleValue: (provided, state) => {
    const display = "none";
    return { ...provided, display };
  },
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
    width: "40px",
    height: "40px",
    cursor: "pointer",
    fontFamily: 'Roboto',
    fontSize: "14px",
    background: 'transparent',
    border: "none",
    fontSize: "0px",
    margin: "0",
    transform: "translate(42px, 0)"
  })
}

const options = [
  { value: 'mypeople', label: 'My additions', icon: <ManageAccountsOutlinedIcon style={{ fontSize: "20px" }} /> },
  { value: 'account', label: 'Account settings', icon: <SettingsOutlinedIcon style={{ fontSize: "20px" }} /> },
  { value: 'logout', label: 'Sign out', icon: <LogoutIcon style={{ fontSize: "20px" }} /> },
]


const Header = () => {

  const [psUid, setPsUid] = useState("");
  const [password, setPassword] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [accountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showLinearProgress, setShowLinearProgress] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [notificationOptions, setNotificationOptions] = useState({});
  const handleloginModalOpen = () => setLoginModalOpen(true);
  const handleloginModalClose = () => {
    setShowError(false);
    setLoginModalOpen(false);
  }
  const handleAccountSettingsOpen = () => setAccountSettingsOpen(true);
  const handleAccountSettingsClose = () => setAccountSettingsOpen(false);
  const handleChangePasswordOpen = () => {
    setAccountSettingsOpen(false);
    setChangePasswordOpen(true);
  }
  const handleChangePasswordClose = () => {
    setShowError(false);
    setChangePasswordOpen(false);
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.isAuthenticated)
  const psd = useSelector(state => state.police_station_details)

  const handleLogin = async () => {
    setShowError(false);
    setShowLinearProgress(true);
    const data = await dispatch(loginUser(psUid, password));
    if (data.status === 200) {
      handleloginModalClose();
      const data2 = await dispatch(getPoliceStationDetails(data.data.access));
      setShowError(false);
      getAllNotifications();
    }
    else {
      setShowError(true);
    }
    setShowLinearProgress(false);

  }

  const getAllNotifications = async () => {
    const data = await dispatch(getNotifications(JSON.parse(localStorage.getItem('authTokens')).access));
    if (data.status === 200) {
      let arr = [];
      data.data.map((notification) => {
        if (notification.seen === false) {
          setNotifications(true);
        }
        const option = {
          value: notification.id,
          label: <div>{notification.link ? <Link to={notification.link} style={{ textDecoration: "none", color: '#636363' }}>{notification.message}</Link> : notification.message}</div>,
          status: notification.seen
        }
        arr.push(option);
      });
      setNotificationOptions(arr);
    }
  }


  useEffect(() => {
    if(isAuthenticated)
      getAllNotifications();
    setInterval(() => {
      if(isAuthenticated)
        getAllNotifications();
    }, 5000);

  }, [])


  const changePasswordFunc = async (currentPassword, newPassword) => {
    const details = {
      current_password: currentPassword,
      new_password: newPassword,
    }
    const data = await dispatch(changePassword(details, JSON.parse(localStorage.getItem('authTokens')).access));
    console.log(data);
    if (data.status === 200) {
      setShowLinearProgress(false);
      setShowError(false);
      handleChangePasswordClose();
    }
    else {
      setShowLinearProgress(false);
      setShowError(true);
    }
  }

  const handleChangePassword = async () => {
    setShowError(false);
    setShowLinearProgress(true);
    if (newPassword === confirmNewPassword)
      changePasswordFunc(currentPassword, newPassword);
    else {
      setShowLinearProgress(false);
      setShowError(true);
    }
  }

  const handleNotificationsSeen = () => {
    setNotifications(false);
    let arr = [];
    notificationOptions.map((notification) => {
      if (!notification.status)
        arr.push(notification.value);
    })
    const data = dispatch(editNotificationStatus(JSON.parse(localStorage.getItem('authTokens')).access, arr));
  }

  const handleLogout = async () => {
    console.log("clicked")
    await dispatch(logoutUser())
  }

  const handleChange = (e) => {
    if (e.value === 'mypeople')
      navigate('/my-people')
    if (e.value === 'logout')
      handleLogout();
    if (e.value === 'account')
      handleAccountSettingsOpen();
  }

  return (



    <div className='header-main'>

      {isAuthenticated ?
        <div style={{ display: "flex" }}>
          <button style={{ background: "rgb(250, 250, 250)", border: "1px solid rgb(230, 230, 230)", cursor: "pointer", borderRadius: "5px", marginLeft: "25px", padding: "6px" }} onClick={() => navigate(-1)}><ArrowBackIcon style={{ color: "rgb(80, 80, 80)", fontSize: "20px" }} /></button>
          <div style={{ marginLeft: "auto" }}>
            {notifications ?
              <><NotificationsActiveOutlinedIcon style={{ fontSize: "26px", color: "rgb(120, 120, 120)", margin: "12px 0px 10px 0", transform: "translate(81px,0)" }} /><span><FiberManualRecordIcon style={{ fontSize: "13px", transform: "translate(67px, -23px)", color: "red" }} /></span></>
              :
              <><NotificationsActiveOutlinedIcon style={{ fontSize: "26px", color: "rgb(120, 120, 120)", margin: "12px 0px 10px 0", transform: "translate(68px,0)" }} /></>
            }

          </div>
          <div style={{ marginTop: "6px" }} onClick={handleNotificationsSeen}>
            <Select options={notificationOptions} components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: () => null
            }}
              onChange={handleChange}
              styles={notificationStyle}
              getOptionLabel={e => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginLeft: 5 }}>{e.label}</span>
                </div>
              )}
            />
          </div>
          <div style={{ fontSize: "14px", fontWeight: "500", color: "rgb(52, 52, 52)", margin: "15px 0px 10px 0", transform: "translate(62px,0)" }}>
            {psd.police_station_uid}
          </div>
          <button style={{ margin: "0 25px 0 0", fontWeight: "400", color: "#3f7bea", border: "none", outline: "none", cursor: "pointer", background: "white", fontSize: "16px", textAlign: "left" }}>
            <Select options={options} components={{
              IndicatorSeparator: () => null
            }}
              onChange={handleChange}
              styles={selectStyle}
              getOptionLabel={e => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {e.icon}
                  <span style={{ marginLeft: 5 }}>{e.label}</span>
                </div>
              )}
            />
          </button>


        </div>
        :
        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: "auto" }}>

          </div>
          <button onClick={handleloginModalOpen} style={{ margin: "14px 38px 10px 6px", fontWeight: "500", color: "#3f7bea", border: "none", outline: "none", cursor: "pointer", background: "white", fontSize: "14px" }}>Sign In</button>
        </div>
      }

      <Modal
        open={loginModalOpen}
        onClose={handleloginModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style, width: "320px", height:"210px"}}>
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
            {showError ? <div style={{ fontSize: "12px", color: "red", opacity: "0.85" }}>
              * Police Station UID or Password is incorrect
            </div>
              :
              <div style={{ marginTop: "12px" }}></div>}

            {
              showLinearProgress ?
                <LinearProgress style={{ marginTop: "25px" }} />
                :
                <button onClick={handleLogin} className='sign-in-btn'>
                  Sign in
                </button>
            }

          </form>
        </Box>
      </Modal>

      <Modal
        open={accountSettingsOpen}
        onClose={handleAccountSettingsClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <button onClick={() => { handleAccountSettingsClose(); navigate('/edit-profile'); }} className='account-btn' style={{ marginBottom: "7px" }}>
              <div style={{ display: "flex", fontSize: "14px", marginBottom: "4px" }}>
                <div>
                  <ManageAccountsIcon style={{ fontSize: "20px", marginRight: "12px" }} />
                </div>
                <div>Edit Profile</div>
              </div>
            </button>
            <button onClick={handleChangePasswordOpen} className='account-btn'>
              <div style={{ display: "flex", fontSize: "14px", marginBottom: "4px" }}>
                <div>
                  <LockResetIcon style={{ fontSize: "20px", marginRight: "12px" }} />
                </div>
                <div>Change Password</div>
              </div>
            </button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={changePasswordOpen}
        onClose={handleChangePasswordClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: "340px", height: "270px" }}>
          <div>
            <div style={{ display: "flex", width: "100%", fontSize: "14px" }}>
              <div style={{ width: "100%" }}>
                <div>Current password</div>
                <div><input onChange={(e) => setCurrentPassword(e.target.value)} type="password" style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "30px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
              </div>
            </div>
            <div style={{ display: "password", width: "100%", fontSize: "14px", marginTop: "8px" }}>
              <div style={{ width: "100%" }}>
                <div>New password</div>
                <div><input onChange={(e) => setNewPassword(e.target.value)} type="password" style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "30px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
              </div>
            </div>
            <div style={{ display: "password", width: "100%", fontSize: "14px", marginTop: "8px" }}>
              <div style={{ width: "100%" }}>
                <div>Confirm new password</div>
                <div><input onChange={(e) => setConfirmNewPassword(e.target.value)} type="password" style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "30px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
              </div>
            </div>
            {showError ? <div style={{ fontSize: "12px", color: "red", opacity: "0.85" }}>
              * Please fill the inputs properly!
            </div>
              :
              <div style={{ marginTop: "12px" }}></div>}
            {showLinearProgress ?
              <LinearProgress style={{ marginTop: "25px" }} />
              :
              <button onClick={handleChangePassword} className='sign-in-btn'>
                Submit
              </button>
            }

          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default Header