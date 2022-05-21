import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPersonDetails } from '../actions/action';
import moment from "moment";

const PersonDetails = () => {

    const [person, setPerson] = useState({});

    const param = useParams();
    const dispatch = useDispatch();
    const person_uuid = param.person_uuid
    useEffect(async () => {
        const data = await dispatch(getPersonDetails(person_uuid));
        console.log(data.data);
        setPerson(data.data);
    }, [])

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", padding: "30px 50px 30px 50px", background: "white", marginRight: "25px", borderRadius: "8px" }}>
                <div style={{ display: "flex", width: "100%", marginBottom:"20px" }}>
                    <div style={{ width: "40%", marginRight: "30px" }}><img src={person.image} style={{ width: "100%", height: "250px", objectFit: "fill", borderRadius: "10px 10px 0 0" }} /></div>
                    <div style={{ width: "60%" }}>
                        <div style={{ color: "rgb(52,52,52)", fontWeight: "500", fontSize: "16px" }}>{person.name}</div>
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
                <div style={{marginTop:"20px", marginBottom:"20px"}}>
                    <div style={{ fontSize:"14px", color: "rgb(52,52,52)", fontWeight: "500" }}>Track History</div>
                    <div style={{fontSize:"14px", color:"rgb(82,82,82)", marginTop:"20px" }}>
                        {person.track_history?person.track_history.map((item, index)=> {
                            return(
                                <div style={{display:"flex"}}>
                                    <div>{index+1}. </div>
                                    <div style={{marginLeft:"10px"}}>{item.time.substring(11,16)}, {moment(item.time.substring(0,10)).format("Do MMM YYYY")}{" "} :</div>
                                    <div style={{marginLeft:"10px"}}>{item.location}</div>
                                </div>
                            )
                        }):null}
                    </div>
                </div>
                <hr/>
                <div style={{marginTop:"20px"}}>
                    <div style={{ fontSize:"14px", color: "rgb(52,52,52)", fontWeight: "500" }}>Person Description</div>
                    <div style={{ fontSize:"14px", color: "rgb(82,82,82)", marginTop:"20px" }}>
                        {person.details}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonDetails