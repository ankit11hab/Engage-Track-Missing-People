import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTrackHistory, deletePerson, editPersonDetails, getPersonDetails, autocomplete } from '../../actions/action';
import Box from '@mui/material/Box';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import PhotoIcon from '@mui/icons-material/Photo';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import Select from 'react-select';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import TextField from '@mui/material/TextField';

const options = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
    { value: 'O', label: 'Other' }
]

const deleteModalStyle = {
    overlay: {
        position: 'fixed',
        zIndex: 1020,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(150, 150, 150, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: "8px",
        padding: "15px 25px 15px 25px"
    },
};

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

const editModalStyle = {
    overlay: {
        position: 'fixed',
        zIndex: 1020,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(150, 150, 150, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: "12px",
        padding: "15px 25px 15px 25px",
        height: "400px",
        overflowX: "hidden",
        overflowY: "scroll",
        border: "none"
    },
};

const PersonDetails = () => {

    let subtitle;
    const [person, setPerson] = useState({});
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [isCriminal, setIsCriminal] = useState("-1");
    const [isTracked, setIsTracked] = useState("-1");
    const [isFound, setIsFound] = useState("-1");
    const [timeOfTracking, setTimeOfTracking] = useState("");
    const [location, setLocation] = useState("");
    const [showError, setShowError] = useState(false);
    const [autocompletedLocations, setAutocompletedLocations] =  useState([]);
    const param = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.isAuthenticated)
    const person_uuid = param.person_uuid

    const handleDelete = async () => {
        setIsLoading(true);
        const data = await dispatch(deletePerson(person_uuid, JSON.parse(localStorage.getItem("authTokens")).access))
        console.log(data);
        setIsLoading(false);
        navigate(`/missing-people`);
    }

    const handleSave = async () => {
        setIsLoading(true);
        console.log(person.isCriminal, isCriminal);
        let details = { person_uuid };
        if (name != "" && person.name !== name)
            details.name = name;
        if (about != "" && person.details !== about)
            details.details = about;
        if (age != 0 && person.age !== age)
            details.age = age;
        if (email != 0 && person.applicant_email !== email)
            details.applicant_email = email;
        if (gender != "" && person.gender !== gender)
            details.gender = gender;
        if (isCriminal != "-1" && person.isCriminal !== isCriminal)
            details.isCriminal = isCriminal;
        if (isTracked != "-1" && person.isTracked !== isTracked)
            details.isTracked = isTracked;
        if (isFound != "-1" && person.isFound !== isFound)
            details.isFound = isFound;

        const data = await dispatch(editPersonDetails(JSON.parse(localStorage.getItem("authTokens")).access, details));
        const data2 = await dispatch(getPersonDetails(person_uuid));
        setPerson(data2.data);
        setIsLoading(false);
        handleCloseEditModal();

    }

    const handleAdd = async () => {
        setShowError(false);
        setIsLoading(true);
        if(location==""||timeOfTracking=="") {
            setIsLoading(false);
            setShowError(true);
            return;
        }
        const data = await dispatch(addTrackHistory({ time_of_tracking: timeOfTracking, location, person_uuid }, JSON.parse(localStorage.getItem("authTokens")).access));
        const data2 = await dispatch(getPersonDetails(person_uuid));
        setPerson(data2.data);
        setIsLoading(false);
        handleCloseAddModal();
    }

    const handleChange = (val) => {
        setGender(val.value)
        console.log(val);
    }

    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    };
    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };
    const handleOpenEditModal = async () => {
        await setOpenEditModal(true);
        document.getElementById("edit-about").innerText = person.details;
    };
    const handleCloseEditModal = () => {
        setShowError(false);
        setOpenEditModal(false);
    };
    const handleOpenAddModal = async () => {
        await setOpenAddModal(true);
    };
    const handleCloseAddModal = () => {
        setShowError(false);
        setOpenAddModal(false);
        setLocation("");
        setTimeOfTracking("");
    };
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    const getPlaces = async (val) => {
        const data = await dispatch(autocomplete(val, JSON.parse(localStorage.getItem("authTokens")).access))
        console.log(data.data.predictions);
        setAutocompletedLocations(data.data.predictions);
    }

    const handleDateTimeChange = (val, type) => {
        if (type === "datetime")
            setTimeOfTracking(val);
        if (type === "location") {
            setLocation(val);
            if(val!=="")
                getPlaces(val);
        }
    }


    useEffect(async () => {
        const data = await dispatch(getPersonDetails(person_uuid));
        console.log(data.data);
        setPerson(data.data);
    }, []);

    return (
        <div>
            <div style={{ padding: "30px 50px 30px 50px", background: "white", marginRight: "25px", borderRadius: "8px" }}>
                <div style={{ display: "flex", width: "100%", marginBottom: "20px" }}>
                    <div style={{ width: "40%", marginRight: "30px" }}><img src={person.image} style={{ width: "100%", height: "250px", objectFit: "fill", borderRadius: "10px 10px 0 0" }} /></div>
                    <div style={{ width: "100%" }}>
                        <div style={{ color: "rgb(52,52,52)", fontWeight: "500", fontSize: "16px" }}>{person.name}
                            {isAuthenticated ? <span><button onClick={handleOpenEditModal} style={{ marginLeft: "15px", borderRadius: "5px", border: "none", outline: "none", transform: "translate(0,5px)", cursor: "pointer" }}><EditOutlinedIcon style={{ fontSize: "16px", margin: "3px 0 3px 0", color: "green" }} /></button><button onClick={handleOpenDeleteModal} style={{ marginLeft: "5px", borderRadius: "5px", border: "none", outline: "none", transform: "translate(0,5px)" }}><DeleteOutlineOutlinedIcon style={{ fontSize: "16px", color: "red", cursor: "pointer", margin: "4px 1px 2px 1px" }} /></button></span> : null}
                        </div>

                        <Modal
                            isOpen={openEditModal}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={handleCloseEditModal}
                            style={editModalStyle}
                            contentLabel="Edit Modal"
                        >
                            <div style={{ display: "flex", flexDirection: "column", width: "700px" }}>
                                <div style={{ display: "flex", width: "100%" }}>
                                    <div style={{ width: "100%" }}>
                                        <div>Name</div>
                                        <div><input defaultValue={person.name} onChange={(e) => setName(e.target.value)} type="text" style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "30px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
                                    </div>
                                </div>
                                <div style={{ marginTop: "15px" }}>
                                    <div>About</div>
                                    <div><span id="edit-about" role="textbox" onInput={(e) => setAbout(e.target.innerText)} style={{ display: "block", minHeight: "70px", width: "96%", margin: "8px 0 5px 0.2px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", padding: "10px", outline: "none", resize: "both", fontSize: "13px" }} contentEditable ></span></div>
                                </div>

                                <div style={{ display: "flex", width: "100%", fontSize: "15px", marginTop: "15px" }}>
                                    <div style={{ width: "50%" }}>
                                        <div>Age</div>
                                        <div><input defaultValue={person.age} onChange={(e) => setAge(e.target.value)} type="number" style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "33px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
                                    </div>
                                    <div style={{ width: "50%", margin: "0 0 0 20px" }}>
                                        <div>Gender</div>
                                        <div style={{ marginTop: "7px" }}> <Select options={options} components={{
                                            IndicatorSeparator: () => null
                                        }}
                                            onChange={handleChange}
                                            styles={selectStyle}
                                            placeholder={person.gender === 'M' ? "Male" : person.gender === 'F' ? "Female" : "Other"}
                                        /></div>
                                    </div>
                                </div>


                                <div style={{ display: "flex", width: "100%", marginTop: "15px" }}>
                                    <div style={{ width: "100%" }}>
                                        <div>Applicant Email Address</div>
                                        <div><input defaultValue={person.applicant_email} onChange={(e) => setEmail(e.target.value)} type="text" style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "33px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} /></div>
                                    </div>
                                </div>
                                <div style={{ marginTop: "10px" }}>
                                    <input defaultChecked={person.isCriminal} onChange={(e) => setIsCriminal(e.target.checked)} type="checkbox" style={{ margin: "0 8px 0 0", transform: "translate(0,1px)" }} /> The person is a criminal
                                </div>
                                <div style={{ marginTop: "2px" }}>
                                    <input defaultChecked={person.isTracked} onChange={(e) => setIsTracked(e.target.checked)} type="checkbox" style={{ margin: "0 8px 0 0", transform: "translate(0,1px)" }} /> The person has been tracked
                                </div>
                                <div style={{ marginTop: "2px" }}>
                                    <input defaultChecked={person.isFound} onChange={(e) => setIsFound(e.target.checked)} type="checkbox" style={{ margin: "0 8px 0 0", transform: "translate(0,1px)" }} /> The person has been found
                                </div>
                                <div style={{ display: "flex", marginTop: "14px" }}>
                                <div style={{ marginLeft: "auto", transform:"translate(0,5px)" }}>{isLoading ? <CircularProgress size="20px" style={{color:"#37A794", marginRight:"15px"}} />: null}</div> 
                                    <div><button onClick={handleCloseEditModal} style={{ border: "none", padding: "6px 12px 6px 12px", borderRadius: "4px" }}>Cancel</button></div>
                                    <div><button onClick={handleSave} style={{ border: "none", padding: "6px 12px 6px 12px", borderRadius: "4px", background: "#37A794", color: "white", marginLeft: "8px" }}>Save</button></div>
                                </div>
                            </div>
                        </Modal>

                        <Modal
                            isOpen={openDeleteModal}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={handleCloseDeleteModal}
                            style={deleteModalStyle}
                            contentLabel="Example Modal"
                        >
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <div>Please confirm again to delete this record</div>
                                <div style={{ display: "flex", marginTop: "14px" }}>
                                    {isLoading ? <div><CircularProgress /></div> : null}
                                    <div style={{ marginLeft: "auto" }}><button onClick={handleCloseDeleteModal} style={{ border: "none", padding: "6px 12px 6px 12px", borderRadius: "4px" }}>Cancel</button></div>
                                    <div><button onClick={handleDelete} style={{ border: "none", padding: "6px 12px 6px 12px", borderRadius: "4px", background: "red", color: "white", marginLeft: "8px" }}>Delete</button></div>
                                </div>
                            </div>
                        </Modal>

                        <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
                            <div style={{ marginTop: "20px", fontSize: "14px", color: "rgb(82,82,82)" }}>
                                <div style={{ display: "flex" }}>
                                    <div>Age :</div>
                                    <div style={{ marginLeft: "20px" }}>{person.age}</div>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <div>Gender :</div>
                                    <div style={{ marginLeft: "20px" }}>{person.gender === "M" ? "Male" : "Female"}</div>
                                </div>
                                <div style={{ marginTop: "20px" }}>
                                    {person.isFound ? <div>The person has been found. See track history for more details<br /></div> : null}
                                    {person.isTracked ? "The person has been tracked. See track history for more details" : "The person has not been tracked yet"} <br />
                                    {person.isCriminal ? "The person is a criminal" : "The person is not a criminal"}
                                </div>
                            </div>

                            <div style={{ fontSize: "14px", color: "rgb(82,82,82)", marginTop: "20px" }}>
                                <div style={{ color: "rgb(52,52,52)", fontWeight: "500" }}>Police Station details:</div>
                                <div style={{ display: "flex", marginTop: "10px" }}>
                                    <div>Phone: </div>
                                    <div style={{ marginLeft: "20px" }}>{person.ps_phone}</div>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <div>Email :</div>
                                    <div style={{ marginLeft: "20px" }}>{person.ps_email}</div>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <div>Location :</div>
                                    <div style={{ marginLeft: "20px" }}>{person.ps_location}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <div style={{ fontSize: "14px", color: "rgb(52,52,52)", fontWeight: "500" }}>
                        Track History
                        {isAuthenticated ? <span><button onClick={handleOpenAddModal} style={{ marginLeft: "15px", borderRadius: "5px", border: "none", outline: "none", transform: "translate(0,5px)", cursor: "pointer" }}><AddOutlinedIcon style={{ fontSize: "18px", margin: "3px 0 1px 0", color: "green" }} /></button></span> : null}
                    </div>

                    <Modal
                        isOpen={openAddModal}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={handleCloseAddModal}
                        style={deleteModalStyle}
                        contentLabel="Add Modal"
                    >
                        <div style={{ display: "flex", flexDirection: "column", width: "700px" }}>
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
                                        onChange={(e) => handleDateTimeChange(e.target.value, "datetime")}
                                    />
                                </div>
                                <div>
                                    Location
                                    <input type="text" list="data1" onChange={(e)=>handleDateTimeChange(e.target.value, "location")} style={{ width: "96%", margin: "8px 0 5px 0.2px", height: "33px", borderRadius: "5px", border: "1px solid rgb(192, 192, 192)", paddingLeft: "10px", outline: "none" }} id="dropdown-input" />
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
                            </div>

                            <div style={{ display: "flex", marginTop: "14px" }}>
                                {showError?<div style={{fontSize:"12px", color:"red", opacity:"0.85", marginLeft:"93px"}}>* Please fill all the fields properly!</div>:null}
                            <div style={{ marginLeft: "auto", transform:"translate(0,5px)" }}>{isLoading ? <CircularProgress size="20px" style={{color:"#37A794", marginRight:"15px"}} />: null}</div> 
                                <div><button onClick={handleCloseAddModal} style={{ border: "none", padding: "6px 12px 6px 12px", borderRadius: "4px" }}>Cancel</button></div>
                                <div><button onClick={handleAdd} style={{ border: "none", padding: "6px 12px 6px 12px", borderRadius: "4px", background: "#37A794", color: "white", marginLeft: "8px" }}>Add</button></div>
                            </div>
                        </div>
                    </Modal>

                    <div style={{ fontSize: "14px", color: "rgb(82,82,82)", marginTop: "20px" }}>
                        {person.track_history ? person.track_history.map((item, index) => {
                            return (
                                <div style={{ display: "flex" }}>
                                    <div>{index + 1}. </div>
                                    <div style={{ marginLeft: "10px" }}>{item.time.substring(11, 16)}, {moment(item.time.substring(0, 10)).format("Do MMM YYYY")}{" "} :</div>
                                    <div style={{ marginLeft: "10px" }}>{item.location}</div>
                                    {item.image ? <div style={{ marginLeft: "15px" }}><a style={{ fontSize: "12px", opacity: "0.75" }} href={item.image} target="_blank">View image</a></div> : null}
                                </div>
                            )
                        }) : null}
                    </div>
                </div>
                <hr />
                <div style={{ marginTop: "20px" }}>
                    <div style={{ fontSize: "14px", color: "rgb(52,52,52)", fontWeight: "500" }}>Person Description</div>
                    <div style={{ fontSize: "14px", color: "rgb(82,82,82)", marginTop: "20px" }}>
                        {person.details}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonDetails