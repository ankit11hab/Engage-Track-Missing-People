import React, { useState } from 'react';
import './AddMissingStyles.css';
import Default from '../images/default.jpg';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { addMissingPerson } from '../actions/action';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

const options = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
    { value: 'O', label: 'Other' }
]

const selectStyle = {

    menu: (provided, state) => ({
        ...provided,
        width: '96%'
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
        width: "96%",
        fontFamily: 'Roboto',
        fontSize: "14px",
        background: 'transparent',
    })
}

const AddMissingPerson = () => {

    const [gender, setGender] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [about, setAbout] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    const [isCriminal, setIsCriminal] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [trackHistory, setTrackHistory] = useState([{ time_of_tracking: "", location: "" }]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (val) => {
        setGender(val.value)
        console.log(val);
    }

    const handleSubmit = async () => {
        console.log(firstName, age, gender, email);
        if (firstName && age && gender) {
            const name = firstName + " " + lastName;
            const detail = {
                personal_details: {
                    "name": name,
                    "age": age,
                    "details": about ? about : "-",
                    "gender": gender,
                    "applicant_email": email ? email : "-",
                    "isCriminal": isCriminal
                },
                trackHistory: trackHistory
            }
            console.log(detail)
            const data = await dispatch(addMissingPerson(detail, JSON.parse(localStorage.getItem("authTokens")).access));
            console.log(data);
            setShowSuccess(true);
        }
        else
            setShowError(true);
    }

    const handleDateTimeChange = (index, val, type) => {
        let newArr = JSON.parse(JSON.stringify(trackHistory));

        if(type==="datetime") 
            newArr[index].time_of_tracking = val;
        if(type==="location") 
            newArr[index].location = val;

        setTrackHistory(newArr);
        console.log(newArr);
    }

    const addNewLocation = () => {
        let newArr = JSON.parse(JSON.stringify(trackHistory));
        newArr.push({ datetime: "", location: "" });
        setTrackHistory(newArr);
    }


    return (
        <div>
            <button onClick={()=>navigate(`/add/missing-person`)}>Click</button>
            <div style={{ fontSize: "17px", margin: "0 0 15px 0" }}>Add a Missing Person</div>
            <div className='add-missing-main'>
                <div className='add-missing-form'>
                    <div style={{ display: "flex", width: "100%" }}>
                        {showError ?

                            <div style={{ display: "flex", width: "100%", margin: "20px 50px 25px 50px", background: "#ffccd5", padding: "10px 20px 10px 20px", borderRadius: "4px" }}>
                                <div>Please fill all the values properly!</div>
                                <div onClick={() => setShowError(false)} style={{ marginLeft: "auto", cursor: "pointer" }}>&#x2715;</div>
                            </div>

                            :

                            null
                        }
                        {showSuccess ?

                            <div style={{ display: "flex", width: "100%", margin: "20px 50px 25px 50px", background: "#b3e6b3", padding: "10px 20px 10px 20px", borderRadius: "4px" }}>
                                <div>Person has been added to database!</div>
                                <div onClick={() => setShowSuccess(false)} style={{ marginLeft: "auto", cursor: "pointer" }}>&#x2715;</div>
                            </div>

                            :

                            null
                        }
                    </div>
                    <div style={{ display: "flex", width: "100%" }}>
                        <div style={{ width: "33%", margin: "20px 50px 25px 50px" }}>
                            <div>First Name</div>
                            <div><input onChange={(e) => setFirstName(e.target.value)} type="text" style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "30px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
                        </div>
                        <div style={{ width: "33%", margin: "20px 50px 25px 0" }}>
                            <div>Last Name</div>
                            <div><input onChange={(e) => setLastName(e.target.value)} type="text" style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "30px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
                        </div>
                    </div>
                    <div style={{ margin: "0 50px 0 50px" }}>
                        <div>About</div>
                        <div><textarea onChange={(e) => setAbout(e.target.value)} style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "70px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
                    </div>
                    <div style={{ margin: "25px 50px 0 50px" }}>
                        <div>Photo</div>
                        <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
                            <div><img src={Default} style={{ width: "75px", height: "75px", borderRadius: "50%", transform: "translate(-5px,0)" }} /></div>
                            <div>
                                <button style={{ marginLeft: "30px", background: "white", border: "1px solid rgb(192, 192, 192)", outline: "none", cursor: "pointer", padding: "8px 12px 8px 12px", borderRadius: "5px", fontSize: "15px" }}>Change</button>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", width: "100%", fontSize: "15px" }}>
                        <div style={{ width: "33%", margin: "20px 50px 25px 50px" }}>
                            <div>Age</div>
                            <div><input onChange={(e) => setAge(e.target.value)} type="number" style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "33px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
                        </div>
                        <div style={{ width: "33%", margin: "20px 50px 25px 0" }}>
                            <div>Gender</div>
                            <div style={{ marginTop: "7px" }}> <Select options={options} components={{
                                IndicatorSeparator: () => null
                            }}
                                onChange={handleChange}
                                styles={selectStyle}
                            /></div>
                        </div>
                    </div>
                    <div style={{ display: "flex", width: "100%" }}>
                        <div style={{ width: "33%", margin: "25px 50px 25px 50px" }}>
                            <div>Applicant Email Address</div>
                            <div><input onChange={(e) => setEmail(e.target.value)} type="text" style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "33px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
                        </div>
                    </div>
                    <div style={{ margin: "25px 50px 25px 50px" }}>
                        <input onChange={(e) => setIsCriminal(e.target.value)} type="checkbox" style={{ margin: "0 8px 0 0", transform: "translate(0,1px)" }} /> The person is a criminal
                    </div>
                </div>
                <div className='add-missing-form' style={{ marginTop: "20px" }}>
                    {trackHistory.map((history, index) => {
                        return (
                            <div style={{ display: "flex", margin: "5px 0px 5px 0.2px", padding: "20px 50px 20px 50px" }}>
                                <div style={{ margin: "25px 20px 0 0" }}>
                                    <MyLocationIcon />
                                </div>
                                <div style={{ marginRight: "40px" }}>
                                    <TextField
                                        id="datetime-local"
                                        label="Date and Time"
                                        type="datetime-local"
                                        sx={{ width: 250 }}
                                        style={{ marginTop: "11px" }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e)=>handleDateTimeChange(index, e.target.value, "datetime")}
                                    />
                                </div>
                                <div>
                                    Location
                                    <input  onChange={(e)=>handleDateTimeChange(index, e.target.value, "location")} type="text" style={{ width: "100%", height: "33px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none", marginTop: "5px" }} />
                                </div>
                            </div>
                        )
                    })}

                    <button onClick={addNewLocation} style={{ margin: "0 0 30px 93px", padding: "8px 13px 8px 13px", background: "#3f7bea", border: "none", outline: "none", color: "white", borderRadius: "5px", cursor: "pointer" }}>Add new location</button>
                    <div style={{ display: "flex" }}>
                        <div style={{ marginLeft: "auto", marginBottom: "30px" }}>
                            <button style={{ background: "white", border: "1px solid rgb(192, 192, 192)", padding: "7px 12px 7px 12px", borderRadius: "5px", marginRight: "8px" }}>Cancel</button>
                        </div>
                        <div>
                            <button onClick={handleSubmit} style={{ background: "#3f7bea", color: "white", border: "1px solid rgb(192, 192, 192)", padding: "7px 12px 7px 12px", borderRadius: "5px", marginRight: "45px" }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddMissingPerson