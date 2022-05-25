import React, { useEffect, useState } from 'react';
import ShareLocationOutlinedIcon from '@mui/icons-material/ShareLocationOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import VideoCameraFrontOutlinedIcon from '@mui/icons-material/VideoCameraFrontOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useDispatch } from 'react-redux';
import { getStats } from '../actions/action';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'bottom',
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
    maintainAspectRatio: false
};

const labels = ['18th', '19th', '20th', '21st', '22nd', '23rd', 'Today'];




const Statistics = () => {
    const dispatch = useDispatch();
    const [stats, setStats] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getAllStats = async () => {
        setIsLoading(true);
        const data = await dispatch(getStats());
        setStats(data.data);
        setIsLoading(false);
    }

    useEffect(async () => {
        await getAllStats();
    }, [])

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: stats.enlisted_daywise,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: stats.tracked_daywise,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Dataset 3',
                data: stats.found_daywise,
                borderColor: 'green',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div>
            {
                isLoading ?
                    <div><CircularProgress size={20} style={{ margin: "8px 14px 9px 0" }} /></div>
                    :
                    <div>
                        <div style={{ fontSize: "17px", margin: "0 0 15px 0" }}>Statistics</div>
                        <div style={{ display: "flex", justifyContent: "space-between", margin: "0 25px 0 0" }}>
                            <div className='stat-card'>

                                <div style={{ padding: "20px 24px 0 24px" }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <div style={{ background: "#3f7bea", padding: "4px", borderRadius: "5px" }}>
                                            <PersonSearchOutlinedIcon style={{ fontSize: "23px", color: "white", transform: "translate(0.5px,1px)" }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", marginLeft: "15px" }}>
                                            <div style={{ fontSize: "12px", fontWeight: "500", color: "grey" }}>
                                                Persons Enlisted
                                            </div>
                                            <div style={{ fontSize: "20px", fontWeight: "500" }}>
                                                {stats.enlisted} <span style={{ fontSize: "14px", fontWeight: "500", color: "green", marginLeft: "6px" }}>{stats.enlisted_daywise[0]}↑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "20px"}}><Link to='/missing-people' style={{ fontSize: "13px", color: "#3f7bea", fontWeight: "500", textDecoration:"none" }}>
                                        View all
                                    </Link></div>
                                </div>
                            </div>

                            <div className='stat-card'>
                                <div style={{ padding: "20px 24px 0 24px" }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <div style={{ background: "#3f7bea", padding: "4px", borderRadius: "5px" }}>
                                            <ShareLocationOutlinedIcon style={{ fontSize: "23px", color: "white", transform: "translate(0,2px)" }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", marginLeft: "15px" }}>
                                            <div style={{ fontSize: "12px", fontWeight: "500", color: "grey" }}>
                                                Persons Tracked
                                            </div>
                                            <div style={{ fontSize: "20px", fontWeight: "500" }}>
                                                {stats.tracked} <span style={{ fontSize: "14px", fontWeight: "500", color: "green", marginLeft: "6px" }}>{stats.tracked_daywise[0]}↑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "20px"}}><Link to='/missing-people' style={{ fontSize: "13px", color: "#3f7bea", fontWeight: "500", textDecoration:"none" }}>
                                        View all
                                    </Link></div>
                                </div>
                            </div>
                            <div className='stat-card'>
                                <div style={{ padding: "20px 24px 0 24px" }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <div style={{ background: "#3f7bea", padding: "4px", borderRadius: "5px" }}>
                                            <HowToRegOutlinedIcon style={{ fontSize: "23px", color: "white", transform: "translate(0,2px)" }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", marginLeft: "15px" }}>
                                            <div style={{ fontSize: "12px", fontWeight: "500", color: "grey" }}>
                                                Persons Found
                                            </div>
                                            <div style={{ fontSize: "20px", fontWeight: "500" }}>
                                                {stats.found} <span style={{ fontSize: "14px", fontWeight: "500", color: "green", marginLeft: "6px" }}>{stats.found_daywise[0]}↑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "20px"}}><Link to='/missing-people' style={{ fontSize: "13px", color: "#3f7bea", fontWeight: "500", textDecoration:"none" }}>
                                        View all
                                    </Link></div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", margin: "0 25px 0 0" }}>
                            <div className='graph-card' style={{ width: "66%", display:"flex", flexDirection:"column", alignItems:"center" }}>

                                <div style={{ padding: "20px 24px 0 24px", maxHeight:"200px", width:"92%" }}>
                                    <Line options={options} data={data} />
                                </div>
                                <div style={{marginTop:"25px", display:"flex", fontSize:"12px"}}>
                                    KJnl
                                </div>
                            </div>
                            <div className='graph-card' style={{ width: "32%", display:"flex", flexDirection:"column" }}>
                                <div style={{ padding:"15px", fontSize:"14px" }}>
                                    <div className='stat-row'>
                                        <div style={{transform:"translate(0,2.5px)"}}>
                                            <LocalPoliceOutlinedIcon style={{fontSize:"18px", color:"red", opacity:"0.55"}} />
                                        </div>
                                        <div style={{marginLeft:"8px"}}>
                                            Police Stations
                                        </div>
                                    </div>
                                    <div className='stat-row' style={{ fontSize:"13px" }}>
                                        <div style={{marginLeft:"35px", color:"grey"}}>
                                            No. of police stations:
                                        </div>
                                        <div style={{marginLeft:"auto", fontSize:"12px", color:"green"}}>
                                            {stats.police_station_count}
                                        </div>
                                    </div>
                                    <div className='stat-row' style={{ fontSize:"13px" }}>
                                        <div style={{marginLeft:"35px", color:"grey"}}>
                                            Most active police station:
                                        </div>
                                        <div style={{marginLeft:"auto", fontSize:"12px", color:"green"}}>
                                            {stats.most_active_ps}
                                        </div>
                                    </div>

                                    <div className='stat-row' style={{marginTop:"20px"}}>
                                        <div style={{transform:"translate(0,2.5px)"}}>
                                            <VideoCameraFrontOutlinedIcon style={{fontSize:"18px", color:"blue", opacity:"0.55"}} />
                                        </div>
                                        <div style={{marginLeft:"8px"}}>
                                            Camera Records
                                        </div>
                                    </div>
                                    <div className='stat-row' style={{ fontSize:"13px" }}>
                                        <div style={{marginLeft:"35px", color:"grey"}}>
                                            No. of active cameras:
                                        </div>
                                        <div style={{marginLeft:"auto", fontSize:"12px", color:"green"}}>
                                            {stats.camera_count}
                                        </div>
                                    </div>
                                    <div className='stat-row' style={{ fontSize:"13px" }}>
                                        <div style={{marginLeft:"35px", color:"grey"}}>
                                            No. of captured images:
                                        </div>
                                        <div style={{marginLeft:"auto", fontSize:"12px", color:"green"}}>
                                            {stats.image_count}
                                        </div>
                                    </div>

                                    <div className='stat-row' style={{marginTop:"20px"}}>
                                        <div style={{transform:"translate(0,2.5px)"}}>
                                            <SearchOutlinedIcon style={{fontSize:"18px", color:"#FFBF00", opacity:"1"}} />
                                        </div>
                                        <div style={{marginLeft:"8px"}}>
                                            Missing People
                                        </div>
                                    </div>
                                    <div className='stat-row' style={{ fontSize:"13px" }}>
                                        <div style={{marginLeft:"35px", color:"grey"}}>
                                            No. of people enlisted:
                                        </div>
                                        <div style={{marginLeft:"auto", fontSize:"12px", color:"green"}}>
                                            {stats.enlisted}
                                        </div>
                                    </div>
                                    <div className='stat-row' style={{ fontSize:"13px" }}>
                                        <div style={{marginLeft:"35px", color:"grey"}}>
                                            No. of people missing:
                                        </div>
                                        <div style={{marginLeft:"auto", fontSize:"12px", color:"green"}}>
                                            {stats.missing}
                                        </div>
                                    </div>
                                </div>

                                
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default Statistics