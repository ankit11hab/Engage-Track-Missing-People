import React, { useEffect } from 'react';
import './MissingPeopleStyles.css';
import Obama from '../images/obama.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPersons } from '../actions/action';
import { Link } from 'react-router-dom';

const MissingPeople = () => {

  const dispatch = useDispatch();
  const allPersons = useSelector(state => state.allPersons)

  const getAllMissingPersons = async (start, end) => {
    const data = await dispatch(getAllPersons());
  }

  

  useEffect(async () => {
    getAllMissingPersons(0, 9);
  }, [])

  return (
    <div>
      <div style={{ fontSize: "17px", margin: "0 0 15px 0" }}>List of Missing People</div>
      <div style={{ display: "flex", margin: "0 0 0 25px", flexFlow: "row wrap" }}>

        {allPersons.map((person) => {
          return (
            <div className='missing-person-card'>
              <img src={person.image} style={{ width: "100%", height: "250px", objectFit: "fill", borderRadius: "10px 10px 0 0" }} />
              <div style={{ padding: "10px" }}>
                <span style={{ fontWeight: "500" }}>{person.name}</span>
                <div style={{ marginTop: "10px", fontSize: "12px", color: "grey" }}>
                  Details:
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "13px", transform: "translate(0,-2px)" }}>
                    {person.details.substring(0,14)+"..."}
                  </div>
                  <Link to={person.person_uuid} style={{ cursor:"pointer", fontWeight: "500", color: "#3f7bea", fontSize: "13px", transform: "translate(0,-2px)", marginLeft: "auto", textDecoration:"none" }}>
                    View details
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MissingPeople