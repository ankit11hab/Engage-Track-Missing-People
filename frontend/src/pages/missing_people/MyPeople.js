import React, { useEffect } from 'react';
import './MissingPeopleStyles.css';
import Obama from '../../images/obama.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppliedHere, getAllCriminals, getAllFound, getAllNonCriminals, getAllPersons, getAllTracked, getMyFound, getMyTracked } from '../../actions/action';
import { Link } from 'react-router-dom';
import Select from 'react-select';


const options = [
  { value: 'A', label: 'All', type: 'logged' },
  { value: 'T', label: 'Tracked', type: 'logged' },
  { value: 'F', label: 'Found', type: 'logged' },
]

const selectStyle = {

  menu: (provided, state) => ({
    ...provided,
    width: "96%",
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
    width: "300px",
    // This line disable the blue border
    boxShadow: "none",
    width: "96%",
    fontFamily: 'Roboto',
    fontSize: "14px",
    background: 'transparent',
  })
}


const MyPeople = () => {

  const dispatch = useDispatch();
  const allPersons = useSelector(state => state.allPersons)

  
  const getMyTrackedPersons = async (start, end) => {
    const data = await dispatch(getMyTracked(JSON.parse(localStorage.getItem("authTokens")).access));
  }

  const getMyFoundPersons = async (start, end) => {
    const data = await dispatch(getMyFound(JSON.parse(localStorage.getItem("authTokens")).access));
  }

  const getAllAppliedFromHere = async (start, end) => {
    const data = await dispatch(getAllAppliedHere(JSON.parse(localStorage.getItem("authTokens")).access));
  }

  const handleChange = (val) => {
    console.log(val.value)
    if(val.value==='A') 
      getAllAppliedFromHere();
    if(val.value==='T') 
      getMyTrackedPersons();
    if(val.value==='F') 
      getMyFoundPersons();
  }


  useEffect(async () => {
    getAllAppliedFromHere(0, 9);
  }, [])

  return (
    <div>
      <div style={{ fontSize: "17px", margin: "0 0 15px 0" }}>List of Missing People</div>
      <div style={{ display: "flex", background: "white", margin: "10px 25px 20px 0", padding: "10px", borderRadius: "5px" }}>
      <div style={{ width: "300px" }}>
            <Select options={options} components={{
              IndicatorSeparator: () => null
            }}
              placeholder = 'All'
              styles={selectStyle}
              onChange={handleChange}
            />
          </div>

      </div>
      <div style={{ display: "flex", flexFlow: "row wrap" }}>

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
                    {person.details.substring(0, 14) + "..."}
                  </div>
                  <Link to={`/missing-people/${person.person_uuid}`} style={{ cursor: "pointer", fontWeight: "500", color: "#3f7bea", fontSize: "13px", transform: "translate(0,-2px)", marginLeft: "auto", textDecoration: "none" }}>
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

export default MyPeople