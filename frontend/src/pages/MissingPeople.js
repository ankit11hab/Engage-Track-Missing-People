import React, { useEffect } from 'react';
import './MissingPeopleStyles.css';
import Obama from '../images/obama.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppliedHere, getAllCriminals, getAllNonCriminals, getAllPersons } from '../actions/action';
import { Link } from 'react-router-dom';
import Select from 'react-select';


const options = [
  { value: 'A', label: 'All', type: 'all' },
  { value: 'C', label: 'Criminals', type: 'all' },
  { value: 'N', label: 'Non-criminals', type: 'all' },
  { value: 'P', label: 'Applied from this police station', type: 'logged' },
]

const options2 = [
  { value: 'A', label: 'All', type: 'all' },
  { value: 'C', label: 'Criminals', type: 'all' },
  { value: 'N', label: 'Non-criminals', type: 'all' }
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


const MissingPeople = () => {

  const dispatch = useDispatch();
  const allPersons = useSelector(state => state.allPersons)

  const getAllMissingPersons = async (start, end) => {
    const data = await dispatch(getAllPersons());
  }

  const getAllCriminalPersons = async (start, end) => {
    const data = await dispatch(getAllCriminals());
  }

  const getAllNonCriminalPersons = async (start, end) => {
    const data = await dispatch(getAllNonCriminals());
  }

  const getAllAppliedFromHere = async (start, end) => {
    const data = await dispatch(getAllAppliedHere(JSON.parse(localStorage.getItem("authTokens")).access));
  }

  const handleChange = (val) => {
    if(val.value==='A') 
      getAllMissingPersons();
    if(val.value==='C') 
      getAllCriminalPersons();
    if(val.value==='N') 
      getAllNonCriminalPersons();
    if(val.value==='P') 
      getAllAppliedFromHere();
  }


  useEffect(async () => {
    getAllMissingPersons(0, 9);
  }, [])

  return (
    <div>
      <div style={{ fontSize: "17px", margin: "0 0 15px 0" }}>List of Missing People</div>
      <div style={{ display: "flex", background: "white", margin: "10px 25px 20px 25px", padding: "10px", borderRadius: "5px" }}>
        {JSON.parse(localStorage.getItem("authTokens")) ?JSON.parse(localStorage.getItem("authTokens")).access?
          <div style={{ width: "300px" }}>
            <Select options={options} components={{
              IndicatorSeparator: () => null
            }}
              placeholder = 'All'
              styles={selectStyle}
              onChange={handleChange}
            />
          </div>
          :
          <div style={{ width: "300px" }}>
            <Select options={options2} components={{
              IndicatorSeparator: () => null
            }}
              placeholder = 'All'
              styles={selectStyle}
              onChange={handleChange}
            />
          </div>
          :
          <div style={{ width: "300px" }}>
            <Select options={options2} components={{
              IndicatorSeparator: () => null
            }}
              placeholder = 'All'
              styles={selectStyle}
              onChange={handleChange}
            />
          </div>
        }

      </div>
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
                    {person.details.substring(0, 14) + "..."}
                  </div>
                  <Link to={person.person_uuid} style={{ cursor: "pointer", fontWeight: "500", color: "#3f7bea", fontSize: "13px", transform: "translate(0,-2px)", marginLeft: "auto", textDecoration: "none" }}>
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