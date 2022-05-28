import React, { useState } from 'react';
import './AddMissingStyles.css';
import Default from '../../images/default.jpg';
import AsyncSelect from 'react-select';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { addMissingPerson, autocomplete } from '../../actions/action';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import RefreshIcon from '@mui/icons-material/Refresh';
import PlacesAutocomplete from 'react-places-autocomplete';

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

const selectStyle2 = {

    menu: (provided, state) => ({
        ...provided,
        width: '100%'
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
        marginTop: "5px",
        // This line disable the blue border
        boxShadow: "none",
        width: "100%",
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
    const [image, setImage] = useState(null);
    const [autocompletedLocations, setAutocompletedLocations] =  useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (val) => {
        setGender(val.value)
    }

    const handleSubmit = async () => {
        if (firstName && age && gender) {
            const name = firstName + " " + lastName;
            const detail = {
                personal_details: {
                    "name": name,
                    "age": age,
                    "details": about ? about : "-",
                    "gender": gender,
                    "applicant_email": email ? email : "-",
                    "isCriminal": isCriminal === "on" ? "True" : "False",
                    "image": image
                },
                trackHistory: trackHistory
            }
            const data = await dispatch(addMissingPerson(detail, JSON.parse(localStorage.getItem("authTokens")).access));
            setShowSuccess(true);
        }
        else
            setShowError(true);
    }

    const getPlaces = async (val) => {
        const data = await dispatch(autocomplete(val, JSON.parse(localStorage.getItem("authTokens")).access))
        setAutocompletedLocations(data.data.predictions);
    }

    const handleDateTimeChange = (index, val, type) => {
        let newArr = JSON.parse(JSON.stringify(trackHistory));

        if (type === "datetime")
            newArr[index].time_of_tracking = val;
        if (type === "location") {
            newArr[index].location = val;
            if(val!=="")
                getPlaces(val);
        }

        setTrackHistory(newArr);
    }

    const addNewLocation = () => {
        let newArr = JSON.parse(JSON.stringify(trackHistory));
        newArr.push({ datetime: "", location: "" });
        setTrackHistory(newArr);
    }

    const handleRemoveTrack = async (index) => {
        let newArr = JSON.parse(JSON.stringify(trackHistory));
        newArr.splice(index, 1);
        setTrackHistory(newArr);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const image_preview = document.getElementById('image-preview');
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                image_preview.setAttribute("src", reader.result);
            })

            reader.readAsDataURL(file);
        }
    }


    return (
        <div>

            <div style={{ display: "flex" }}>
                <div style={{ fontSize: "17px", margin: "0 0 15px 0" }}>Add a Missing Person</div>
                <div style={{ marginLeft: "25px" }}><button style={{ background: "white", border: "0.1px solid rgb(230,230,230)", padding: "2px 3px 0 3px", borderRadius: "4px", cursor: "pointer" }} onClick={() => navigate(`/refresh`)}><RefreshIcon style={{ width: "20px", fontWeight: "400", color: "rgb(102, 102, 102)" }} /></button></div>
            </div>

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
                            <div><img id="image-preview" src={Default} style={{ width: "75px", height: "75px", borderRadius: "50%", transform: "translate(-5px,0)" }} /></div>
                            <div>
                                <label for="image-upload" id="image-label">
                                    Select Image
                                    <input type="file" id="image-upload" accept="image/png, image/jpeg" onChange={handleImageChange} required />
                                </label>
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
                                        value={history.time_of_tracking}
                                        onChange={(e) => handleDateTimeChange(index, e.target.value, "datetime")}
                                    />
                                </div>
                                <div style={{width:"33%"}}>
                                    Location
                                    <input type="text" list="data1" onChange={(e)=>handleDateTimeChange(index, e.target.value, "location")} style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "33px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} id="dropdown-input" />
                                    <datalist id="data1">
                                        {
                                            autocompletedLocations.map((result)=>{
                                                return(
                                                    <option value = {result.description} />
                                                )
                                            })
                                        }
                                    </datalist>
                                </div>
                                <div style={{ margin: "30px 0 0 30px" }}>
                                    <button onClick={() => handleRemoveTrack(index)} style={{ backgroundColor: "rgb(250,250,250)", border: "1px solid rgb(230,230,230)", borderRadius: "5px", padding: "3px 3px 3px 3px", cursor: "pointer" }}><DeleteOutlinedIcon style={{ fontSize: "20px", color: "rgb(50,50,50)" }} /></button>
                                </div>
                            </div>
                        )
                    })}

                    <button onClick={addNewLocation} style={{ margin: "0 0 30px 93px", padding: "8px 13px 8px 13px", background: "#3f7bea", border: "none", outline: "none", color: "white", borderRadius: "5px", cursor: "pointer" }}>Add new location</button>
                    <div style={{ display: "flex" }}>
                        <div style={{ marginLeft: "auto", marginBottom: "30px" }}>
                            <button onClick={() => navigate(`/refresh`)} style={{ background: "white", border: "1px solid rgb(192, 192, 192)", padding: "7px 12px 7px 12px", borderRadius: "5px", marginRight: "8px", cursor: "pointer" }}>Cancel</button>
                        </div>
                        <div>
                            <button onClick={handleSubmit} style={{ background: "#3f7bea", color: "white", border: "1px solid rgb(192, 192, 192)", padding: "7px 12px 7px 12px", borderRadius: "5px", marginRight: "45px", cursor: "pointer" }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddMissingPerson