import React from 'react';
import './AddMissingStyles.css';
import Default from '../images/default.jpg';
import Select from 'react-select';
import { useState } from 'react';

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
      fontFamily: 'Roboto',
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

    const [selectedOpn, setSelectedOpn] = useState('M')

    const handleChange = (val) => {
        setSelectedOpn(val)
        console.log(val);
    }
  return (
    <div>
        <div style={{ fontSize: "17px", margin: "0 0 15px 0" }}>Add a Missing Person</div>
        <div className='add-missing-main'>
            <div className='add-missing-form'>
                <div style={{display:"flex", width:"100%"}}>
                    <div style={{width:"33%", margin:"20px 50px 25px 50px"}}>
                        <div>First Name</div>
                        <div><input type="text" style={{width:"96%", margin:"8px 0 5px 0.2px", height:"30px", borderRadius:"5px", border:"1px solid rgb(192, 192, 192)", paddingLeft:"10px", outline:"none"}} /></div>
                    </div>
                    <div style={{width:"33%", margin:"20px 50px 25px 0"}}>
                        <div>Last Name</div>
                        <div><input type="text" style={{width:"96%", margin:"8px 0 5px 0.2px", height:"30px", borderRadius:"5px", border:"1px solid rgb(192, 192, 192)", paddingLeft:"10px", outline:"none"}} /></div>
                    </div>
                </div>
                <div style={{margin:"0 50px 0 50px"}}>
                    <div>About</div>
                    <div><textarea style={{width:"96%", margin:"8px 0 5px 0.2px", height:"70px", borderRadius:"5px", border:"1px solid rgb(192, 192, 192)", paddingLeft:"10px", outline:"none"}} /></div>
                </div>
                <div style={{margin:"25px 50px 0 50px"}}>
                    <div>Photo</div>
                    <div style={{marginTop:"20px", display:"flex", alignItems:"center"}}>
                        <div><img src={Default} style={{width:"75px",height:"75px", borderRadius:"50%", transform:"translate(-5px,0)"}} /></div>
                        <div>
                            <button style={{marginLeft:"30px", background:"white", border:"1px solid rgb(192, 192, 192)", outline:"none", cursor:"pointer", padding:"8px 12px 8px 12px", borderRadius:"5px", fontSize:"15px"}}>Change</button>
                        </div>
                    </div>
                </div>
                <div style={{display:"flex", width:"100%", fontSize:"15px"}}>
                    <div style={{width:"33%", margin:"20px 50px 25px 50px"}}>
                        <div>Age</div>
                        <div><input type="number" style={{width:"96%", margin:"8px 0 5px 0.2px", height:"33px", borderRadius:"5px", border:"1px solid rgb(192, 192, 192)", paddingLeft:"10px", outline:"none"}} /></div>
                    </div>
                    <div style={{width:"33%", margin:"20px 50px 25px 0"}}>
                        <div>Gender</div>
                        <div style={{marginTop:"7px"}}> <Select options={options} components={{
                            IndicatorSeparator: () => null
                          }}
                            styles={selectStyle}
                          /></div>
                    </div>
                </div>
                <div style={{display:"flex", width:"100%"}}>
                    <div style={{width:"33%",margin:"25px 50px 25px 50px"}}>
                        <div>Applicant Email Address</div>
                        <div><input type="text" style={{width:"96%", margin:"8px 0 5px 0.2px", height:"33px", borderRadius:"5px", border:"1px solid rgb(192, 192, 192)", paddingLeft:"10px", outline:"none"}} /></div>
                    </div>
                </div>
                <div style={{margin:"25px 50px 25px 50px"}}>
                    <input type="checkbox" style={{margin:"0 8px 0 0", transform:"translate(0,1px)"}} /> The person is a criminal
                </div>
                <div style={{display:"flex"}}>
                    <div style={{marginLeft:"auto", marginBottom:"30px"}}>
                        <button style={{background:"white", border:"1px solid rgb(192, 192, 192)", padding:"7px 12px 7px 12px", borderRadius:"5px", marginRight:"8px"}}>Cancel</button>
                    </div>
                    <div>
                        <button style={{background:"#3f7bea",color:"white", border:"1px solid rgb(192, 192, 192)", padding:"7px 12px 7px 12px", borderRadius:"5px", marginRight:"45px"}}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddMissingPerson