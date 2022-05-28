import React, { useEffect } from 'react';
import './MissingPeopleStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppliedHere, getAllCriminals, getAllFound, getAllNonCriminals, getAllPersons, getAllTracked } from '../../actions/action';
import { Link } from 'react-router-dom';
import Select from 'react-select';




const options2 = [
  { value: 'A', label: 'All', type: 'all' },
  { value: 'T', label: 'Tracked', type: 'all' },
  { value: 'F', label: 'Found', type: 'all' },
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

  const getAllMissingPersons = async () => {
    await dispatch(getAllPersons());
  }

  const getAllCriminalPersons = async () => {
    await dispatch(getAllCriminals());
  }

  const getAllTrackedPersons = async () => {
    await dispatch(getAllTracked());
  }

  const getAllFoundPersons = async () => {
    await dispatch(getAllFound());
  }

  const getAllNonCriminalPersons = async () => {
    await dispatch(getAllNonCriminals());
  }

  const getAllAppliedFromHere = async () => {
    await dispatch(getAllAppliedHere(JSON.parse(localStorage.getItem("authTokens")).access));
  }

  const handleChange = (val) => {
    switch(val.value) {
    case 'A':
      getAllMissingPersons();
      break;
    case 'T':
      getAllTrackedPersons();
      break;
    case 'F':
      getAllFoundPersons();
      break;
    case 'C':
      getAllCriminalPersons();
      break;
    case 'N':
      getAllNonCriminalPersons();
      break;
    case 'P':
      getAllAppliedFromHere();
    }
  }


  useEffect(async () => {
    getAllMissingPersons(0, 9);
  }, [])

  return (
    <div>
      <div style={{ fontSize: "17px", margin: "0 0 15px 0" }}>List of Missing People</div>
      <div style={{ display: "flex", background: "white", margin: "10px 25px 20px 0", padding: "10px", borderRadius: "5px" }}>
        <div style={{ width: "300px" }}>
          <Select options={options2} components={{
            IndicatorSeparator: () => null
          }}
            placeholder='All'
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