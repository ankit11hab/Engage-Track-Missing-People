import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, registerUserBulk } from '../../actions/action';
import CircularProgress from '@mui/material/CircularProgress';
import '../missing_people/AddMissingStyles.css';

const AddPoliceStation = () => {
  const dispatch = useDispatch();
  const psd = useSelector(state => state.police_station_details);
  const [showError, setShowError] = useState(false);
  const fileReader = new FileReader();
  const [file, setFile] = useState({ filename: "" });
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const handleRefresh = () => {
    console.log(document.getElementById('location-input'))
    document.getElementById('id-input').value = "";
    document.getElementById('location-input').value = "";
    document.getElementById('phone-input').value = "";
    document.getElementById('email-input').value = "";
  }

  const handleChange = (type, e) => {
    if (type === "id") {
      const newObj = { ...details, id: e.target.value }
      setDetails(newObj);
    }
    if (type === "phone") {
      const newObj = { ...details, phone: e.target.value }
      setDetails(newObj);
    }
  }

  const registerUserFunc = async (newDetail) => {
    console.log(newDetail);
    const data = await dispatch(registerUser(JSON.parse(localStorage.getItem("authTokens")).access, newDetail));
    if (data.status === 200)
      setShowError(false);
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    setShowError(false);
    let newDetail = {};
    if (details.id)
      newDetail = { ...newDetail, police_station_uid: details.id };
    if (details.phone)
      newDetail = { ...newDetail, phone: details.phone };

    newDetail = { ...newDetail, password: "password", password2: "password" }

    if (newDetail.id !== "" && newDetail.phone !== "")
      registerUserFunc(newDetail);
    else
      setShowError(true);
    setIsLoading(false);
  }

  const registerUserBulkFunc = () => {
    const data = dispatch(registerUserBulk(JSON.parse(localStorage.getItem("authTokens")).access, file));
  }

  const handleSubmit2 = async () => {
    setIsLoading2(true);
    if(file) {
      registerUserBulkFunc();
    }
    setIsLoading2(false);
  }

  const handleFileChange = (e) => {
    let name = e.target.files[0].name
    console.log(e.target.files[0].name);
    setFile(e.target.files[0]);
  }


  return (
    <div>
      <div style={{ fontSize: "17px", margin: "0 0 15px 0" }}>Add a new police station</div>
      <div className='add-missing-main'>
        <div className='add-missing-form'>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "33%", margin: "25px 50px 25px 50px" }}>
              <div>Police station uid</div>
              <div><input id='phone-input' type="text" maxLength={10} onChange={(e) => handleChange("id", e)} style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "33px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
            </div>
            <div style={{ width: "33%", margin: "25px 50px 25px 50px" }}>
              <div>Phone</div>
              <div><input id='email-input' type="text" onChange={(e) => handleChange("phone", e)} style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "33px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: "auto", marginBottom: "30px" }}>
              {isLoading ?
                <CircularProgress size={20} style={{ margin: "8px 14px 9px 0" }} />
                :
                null
              }

            </div>
            <div style={{ marginBottom: "30px" }}>
              <button onClick={handleRefresh} style={{ background: "white", border: "1px solid rgb(192, 192, 192)", padding: "7px 12px 7px 12px", borderRadius: "5px", marginRight: "8px", cursor: "pointer" }}>Cancel</button>
            </div>
            <div>
              <button onClick={handleSubmit} style={{ background: "#3f7bea", color: "white", border: "1px solid rgb(192, 192, 192)", padding: "7px 12px 7px 12px", borderRadius: "5px", marginRight: "45px", cursor: "pointer" }}>Save</button>
            </div>
          </div>
        </div>
      </div>


      <div style={{ fontSize: "17px", margin: "0 0 15px 0" }}>Add in bulk</div>
      <div className='add-missing-main'>
        <div className='add-missing-form' style={{paddingTop:"30px", paddingBottom:"30px"}}>
          <label for="image-upload" id="image-label" style={{margin:"25px 50px 25px 50px"}}>
            Select File
            <input type="file" id="image-upload" accept=".csv" onChange={handleFileChange} required />
          </label>
          <span style={{ marginLeft: "20px", fontSize: "14px" }}>{file.name}</span>
          <div style={{ display: "flex",width:"100%", marginTop:"10px" }}>
            <div style={{ marginLeft: "auto", marginBottom: "30px" }}>
              {isLoading2 ?
                <CircularProgress size={20} style={{ margin: "8px 14px 9px 0" }} />
                :
                null
              }

            </div>
            <div>
              <button onClick={handleSubmit2} style={{ background: "#3f7bea", color: "white", border: "1px solid rgb(192, 192, 192)", padding: "7px 12px 7px 12px", borderRadius: "5px", cursor: "pointer", marginRight:"50px" }}>Upload</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AddPoliceStation