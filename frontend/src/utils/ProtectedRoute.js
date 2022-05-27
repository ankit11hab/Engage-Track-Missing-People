import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
    const police_station_details = useSelector(state => state.police_station_details)
    return police_station_details.is_admin ? <Outlet />:<Navigate to = '/' />
}


export default ProtectedRoute