import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Refresh = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/add/missing-person`);
    }, [])
    

    return (
        <div>Refreshing</div>
    )
}

export default Refresh