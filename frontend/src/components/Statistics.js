import React, { useEffect, useState } from 'react';
import ShareLocationOutlinedIcon from '@mui/icons-material/ShareLocationOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { useDispatch } from 'react-redux';
import { getStats } from '../actions/action';
import { CircularProgress } from '@mui/material';

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

    return (
        <div>
            {
                isLoading ?
                    <div><CircularProgress size={20} style={{margin:"8px 14px 9px 0"}} /></div>
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
                                                Persons Missing
                                            </div>
                                            <div style={{ fontSize: "20px", fontWeight: "500" }}>
                                                {stats.missing} <span style={{ fontSize: "14px", fontWeight: "500", color: "green", marginLeft: "6px" }}>{stats.missing_today}↑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "20px", fontSize: "13px", color: "#3f7bea", fontWeight: "500" }}>
                                        View all
                                    </div>
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
                                            {stats.tracked} <span style={{ fontSize: "14px", fontWeight: "500", color: "green", marginLeft: "6px" }}>{stats.tracked_today}↑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "20px", fontSize: "13px", color: "#3f7bea", fontWeight: "500" }}>
                                        View all
                                    </div>
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
                                            {stats.found} <span style={{ fontSize: "14px", fontWeight: "500", color: "green", marginLeft: "6px" }}>{stats.found_today}↑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "20px", fontSize: "13px", color: "#3f7bea", fontWeight: "500" }}>
                                        View all
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