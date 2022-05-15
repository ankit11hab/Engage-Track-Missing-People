import React from 'react';
import './MissingPeopleStyles.css';
import Obama from '../images/obama.jpg';

const MissingPeople = () => {
  return (
    <div>
      <div style={{ fontSize: "17px", margin: "0 0 15px 0" }}>List of Missing People</div>
      <div style={{display:"flex", margin:"0 0 0 25px",flexFlow:"row wrap"}}>

        <div className='missing-person-card'>
          <img src={Obama} style={{width:"100%",height:"250px",objectFit:"fill",borderRadius:"10px 10px 0 0"}} />
          <div style={{padding:"10px"}}>
            <span style={{fontWeight:"500"}}>Barack Obama</span>
            <div style={{marginTop:"10px", fontSize:"12px", color:"grey"}}>
              Last seen:
            </div>
            <div style={{display:"flex"}}>
              <div style={{fontSize:"13px", transform:"translate(0,-2px)"}}>
                Kolkata, West Bengal
              </div>
              <div style={{fontWeight:"500", color:"#3f7bea", fontSize:"13px", transform:"translate(0,-2px)", marginLeft:"auto"}}>
                View details
              </div>
            </div>
          </div>
        </div>

        <div className='missing-person-card'>
          <img src={Obama} style={{width:"100%",height:"250px",objectFit:"fill",borderRadius:"10px 10px 0 0"}} />
          <div style={{padding:"10px"}}>
            <span style={{fontWeight:"500"}}>Barack Obama</span>
            <div style={{marginTop:"10px", fontSize:"12px", color:"grey"}}>
              Last seen:
            </div>
            <div style={{display:"flex"}}>
              <div style={{fontSize:"13px", transform:"translate(0,-2px)"}}>
                Kolkata, West Bengal
              </div>
              <div style={{fontWeight:"500", color:"#3f7bea", fontSize:"13px", transform:"translate(0,-2px)", marginLeft:"auto"}}>
                View details
              </div>
            </div>
          </div>
        </div>

        <div className='missing-person-card'>
          <img src={Obama} style={{width:"100%",height:"250px",objectFit:"fill",borderRadius:"10px 10px 0 0"}} />
          <div style={{padding:"10px"}}>
            <span style={{fontWeight:"500"}}>Barack Obama</span>
            <div style={{marginTop:"10px", fontSize:"12px", color:"grey"}}>
              Last seen:
            </div>
            <div style={{display:"flex"}}>
              <div style={{fontSize:"13px", transform:"translate(0,-2px)"}}>
                Kolkata, West Bengal
              </div>
              <div style={{fontWeight:"500", color:"#3f7bea", fontSize:"13px", transform:"translate(0,-2px)", marginLeft:"auto"}}>
                View details
              </div>
            </div>
          </div>
        </div>

        <div className='missing-person-card'>
          <img src={Obama} style={{width:"100%",height:"250px",objectFit:"fill",borderRadius:"10px 10px 0 0"}} />
          <div style={{padding:"10px"}}>
            <span style={{fontWeight:"500"}}>Barack Obama</span>
            <div style={{marginTop:"10px", fontSize:"12px", color:"grey"}}>
              Last seen:
            </div>
            <div style={{display:"flex"}}>
              <div style={{fontSize:"13px", transform:"translate(0,-2px)"}}>
                Kolkata, West Bengal
              </div>
              <div style={{fontWeight:"500", color:"#3f7bea", fontSize:"13px", transform:"translate(0,-2px)", marginLeft:"auto"}}>
                View details
              </div>
            </div>
          </div>
        </div>

        <div className='missing-person-card'>
          <img src={Obama} style={{width:"100%",height:"250px",objectFit:"fill",borderRadius:"10px 10px 0 0"}} />
          <div style={{padding:"10px"}}>
            <span style={{fontWeight:"500"}}>Barack Obama</span>
            <div style={{marginTop:"10px", fontSize:"12px", color:"grey"}}>
              Last seen:
            </div>
            <div style={{display:"flex"}}>
              <div style={{fontSize:"13px", transform:"translate(0,-2px)"}}>
                Kolkata, West Bengal
              </div>
              <div style={{fontWeight:"500", color:"#3f7bea", fontSize:"13px", transform:"translate(0,-2px)", marginLeft:"auto"}}>
                View details
              </div>
            </div>
          </div>
        </div>

        <div className='missing-person-card'>
          <img src={Obama} style={{width:"100%",height:"250px",objectFit:"fill",borderRadius:"10px 10px 0 0"}} />
          <div style={{padding:"10px"}}>
            <span style={{fontWeight:"500"}}>Barack Obama</span>
            <div style={{marginTop:"10px", fontSize:"12px", color:"grey"}}>
              Last seen:
            </div>
            <div style={{display:"flex"}}>
              <div style={{fontSize:"13px", transform:"translate(0,-2px)"}}>
                Kolkata, West Bengal
              </div>
              <div style={{fontWeight:"500", color:"#3f7bea", fontSize:"13px", transform:"translate(0,-2px)", marginLeft:"auto"}}>
                View details
              </div>
            </div>
          </div>
        </div>

        

      </div>
    </div>
  )
}

export default MissingPeople