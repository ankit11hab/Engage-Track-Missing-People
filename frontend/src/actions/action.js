import axios from "axios";
import jwt_decode from 'jwt-decode'
import { config } from "../config";
import { useSelector } from 'react-redux';

const configHeaders = localStorage.getItem('authTokens') ? {
    headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}`
    }
} : ""

export const loginUser = (police_station_uid, password) => async (dispatch) => {
    try {
        const data = await axios.post(
            `${config().url}/auth/token/`,
            {police_station_uid, password}
        )
        if (data.status === 200) {
            dispatch({
                type: 'LOGIN_USER',
                user: data.data
            })
            localStorage.setItem('authTokens', JSON.stringify(data.data))
        }
        return data;
    }
    catch (error) {
        return { status: false };
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'LOGOUT_USER'
        })
        localStorage.removeItem('authTokens')
    }
    catch (error) {
        return { status: false };
    }
}


export const updateToken = () => async (dispatch) => {
    try {
        const data = await axios.post(
            `${config().url}/auth/token/refresh/`,
            { 'refresh': localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).refresh : null }
        )
        if (data.status === 200) {
            await localStorage.removeItem('authTokens')
            localStorage.setItem('authTokens', JSON.stringify(data.data))
            dispatch({
                type: 'LOGIN_USER',
                user: data.data
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}


setInterval(() => {
    if (localStorage.getItem('authTokens'))
        updateToken()
}, 240000);


export const getPoliceStationDetails = (access_token) => async ( dispatch) => {
    let data;
    try {

        const config_header = {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
        };
        const data = await axios.get(
            `${config().url}/auth/get-details/`,
            config_header
        )
        console.log("ok")
        dispatch({
            type: 'GET_PS_DETAILS',
            police_station_details: data.data
        });

        console.log(data);
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}
