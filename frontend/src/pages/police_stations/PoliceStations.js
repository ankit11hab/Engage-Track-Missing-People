import React, {useEffect, useState} from 'react';
import '../missing_people/AddMissingStyles.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllPoliceStations } from '../../actions/action';





const PoliceStations = () => {

  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPoliceStations = async () => {
      const data = await dispatch(getAllPoliceStations(JSON.parse(localStorage.getItem("authTokens")).access))
      setRows(data.data)
    }
    getPoliceStations();
  }, [dispatch])
  

  return (
    <div style={{ marginRight: "50px" }}>
      <div style={{ display: "flex" }}>
        <div>Police Stations</div>
        <div style={{ marginLeft: "auto" }}>
          <Link to = "/add-police-stations"><button style={{background:"white", border:"1px solid rgb(200,200,200)", padding:"8px 12px 8px 12px", borderRadius:"5px", cursor:"pointer"}}>New police station</button></Link>
        </div>
      </div>
      <div className='add-missing-main' style={{ margin: "15px 0 0 0", display: "block" }}>
        <div className='add-missing-form'>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Police Station UID</TableCell>
                    <TableCell align="right">Location</TableCell>
                    <TableCell align="right">Phone</TableCell>
                    <TableCell align="right">Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                      {row.police_station_uid}
                      </TableCell>
                      <TableCell align="right">{row.location}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PoliceStations