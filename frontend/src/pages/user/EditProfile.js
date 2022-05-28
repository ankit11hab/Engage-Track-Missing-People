import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPoliceStationDetails } from '../../actions/action';
import CircularProgress from '@mui/material/CircularProgress';

const EditProfile = () => {

    const dispatch = useDispatch();
    const psd = useSelector(state => state.police_station_details)
    const [details, setDetails] = useState(psd);
    const [isLoading, setIsLoading] = useState(false)
    
    const handleRefresh = () => {
        document.getElementById('location-input').value = psd.location;
        document.getElementById('phone-input').value = psd.phone;
        document.getElementById('email-input').value = psd.email;
    }

    const handleChange = (type, e) => {
        if(type==="location") {
            const newObj = {...details, location:e.target.value}
            setDetails(newObj);
        }
        if(type==="phone") {
            const newObj = {...details, phone:e.target.value}
            setDetails(newObj);
        }
        if(type==="email") {
            const newObj = {...details, email:e.target.value}
            setDetails(newObj);
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        let newDetail = {};
        if(details.location&&details.location !== psd.location)
            newDetail = {...newDetail, location:details.location};
        if(details.phone&&details.phone !== psd.phone)
            newDetail = {...newDetail, phone:details.phone};
        if(details.email&&details.email !== psd.email)
            newDetail = {...newDetail, email:details.email};
        const data = await dispatch(editPoliceStationDetails(JSON.parse(localStorage.getItem("authTokens")).access, newDetail));
        setIsLoading(false);
    }


    return (
        <div>
            <div style={{ fontSize: "17px", margin: "0 0 15px 0" }}>Edit Police Station Details</div>
            <div className='add-missing-main'>
                <div className='add-missing-form'>
                    <div style={{ display: "flex", width: "100%" }}>
                        <div style={{ width: "33%", margin: "20px 50px 25px 50px" }}>
                            <div>Police Station UID</div>
                            <div><input type="text" disabled value={psd.police_station_uid} style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "30px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
                        </div>
                    </div>
                    <div style={{ margin: "0 50px 0 50px" }}>
                        <div>Address</div>
                        <div><textarea id='location-input' onChange={(e)=>handleChange("location", e)} defaultValue={psd.location} style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "50px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
                    </div>
                    <div style={{ display: "flex", width: "100%" }}>
                        <div style={{ width: "33%", margin: "25px 50px 25px 50px" }}>
                            <div>Contact no.</div>
                            <div><input id='phone-input' type="text" maxLength={10} onChange={(e)=>handleChange("phone", e)} defaultValue={psd.phone} style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "33px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
                        </div>
                        <div style={{ width: "33%", margin: "25px 50px 25px 50px" }}>
                            <div>Email</div>
                            <div><input id='email-input' type="text" onChange={(e)=>handleChange("email", e)} defaultValue={psd.email} style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "33px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div style={{ marginLeft: "auto", marginBottom: "30px" }}>
                            {isLoading?
                                <CircularProgress size={20} style={{margin:"8px 14px 9px 0"}} />
                            :
                                null
                            }
                            
                        </div>
                        <div style={{ marginBottom: "30px" }}>
                            <button onClick={handleRefresh} style={{ background: "white", border: "1px solid rgb(192, 192, 192)", padding: "7px 12px 7px 12px", borderRadius: "5px", marginRight: "8px", cursor:"pointer" }}>Cancel</button>
                        </div>
                        <div>
                            <button onClick={handleSubmit} style={{ background: "#3f7bea", color: "white", border: "1px solid rgb(192, 192, 192)", padding: "7px 12px 7px 12px", borderRadius: "5px", marginRight: "45px", cursor:"pointer" }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile