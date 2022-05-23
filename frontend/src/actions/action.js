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
            { police_station_uid, password }
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


export const getPoliceStationDetails = (access_token) => async (dispatch) => {
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


export const editPoliceStationDetails = (access_token, details) => async (dispatch) => {
    let data;
    try {

        const config_header = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };
        const data = await axios.put(
            `${config().url}/auth/edit-details/`,
            details,
            config_header
        )


        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}


export const addMissingPerson = (detail, access_token) => async (dispatch) => {
    try {
        console.log("here")
        const config_header = {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'content-type': 'multipart/form-data'
            },
        };

        const config_header2 = {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
        };

        let form_data = new FormData();
        form_data.append('image', detail.personal_details.image, detail.personal_details.image.name);
        form_data.append('name', detail.personal_details.name);
        form_data.append('age', detail.personal_details.age);
        form_data.append('gender', detail.personal_details.gender);
        form_data.append('isCriminal', detail.personal_details.isCriminal);
        form_data.append('details', detail.personal_details.details);
        form_data.append('applicant_email', detail.personal_details.applicant_email);

        const data = await axios.post(
            `${config().url}/missing/add/person`,
            form_data,
            config_header
        )

        const person_uuid = data.data;

        detail.trackHistory.map(async (history) => {
            await axios.post(
                `${config().url}/missing/add/track-history-manually`,
                { ...history, person_uuid },
                config_header2
            )
        })

        return data;
    }
    catch (error) {
        return { status: false };
    }
}

export const addTrackHistory = (detail, access_token) => async (dispatch) => {
    try {

        const config_header2 = {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
        };

        const data = await axios.post(
            `${config().url}/missing/add/track-history-manually`,
            { time_of_tracking: detail.time_of_tracking, location: detail.location, person_uuid: detail.person_uuid },
            config_header2
        )

        return data;
    }
    catch (error) {
        return { status: false };
    }
}

export const getStats = () => async (dispatch) => {
    let data;
    try {
        const data = await axios.get(
            `${config().url}/missing/get/stats`
        )
        console.log(data);
        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}

export const getAllPersons = () => async (dispatch) => {
    let data;
    try {
        const data = await axios.get(
            `${config().url}/missing/get/all-persons`
        )
        console.log("ok")
        dispatch({
            type: 'GET_PERSONS',
            allPersons: data.data
        });

        console.log(data);
        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}

export const getAllCriminals = () => async (dispatch) => {
    let data;
    try {
        const data = await axios.get(
            `${config().url}/missing/get/all-criminals`
        )
        console.log("ok")
        dispatch({
            type: 'GET_PERSONS',
            allPersons: data.data
        });

        console.log(data);
        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}


export const getAllNonCriminals = () => async (dispatch) => {
    let data;
    try {
        const data = await axios.get(
            `${config().url}/missing/get/all-non-criminals`
        )
        console.log("ok")
        dispatch({
            type: 'GET_PERSONS',
            allPersons: data.data
        });

        console.log(data);
        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}


export const getAllAppliedHere = (access_token) => async (dispatch) => {
    let data;
    try {
        const config_header = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };

        const data = await axios.get(
            `${config().url}/missing/get/all-applied-from-here`,
            config_header
        )
        console.log("ok")
        dispatch({
            type: 'GET_PERSONS',
            allPersons: data.data
        });

        console.log(data);
        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}

export const getPersonDetails = (person_uuid) => async (dispatch) => {
    let data;
    try {
        const config_header = {
            headers: {
                'content-type': 'multipart/form-data'
            },
        };

        const form_data = new FormData()
        form_data.append(`person_uuid`, person_uuid)

        const data = await axios.post(
            `${config().url}/missing/get/person`,
            form_data,
            config_header
        )
        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}


export const addCameraRecord = (details, access_token) => async (dispatch) => {
    let data;
    try {
        const config_header = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };

        const data = await axios.post(
            `${config().url}/camera/camera-record`,
            details,
            config_header
        )
        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}

export const deletePerson =
    (person_uuid, access_token) => async (dispatch, getState) => {
        try {

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            };

            await axios.delete(
                `${config().url}/missing/delete/person`,
                { data: { person_uuid }, headers }
            );
        } catch (error) { }
    };

export const editPersonDetails = (access_token, details) => async (dispatch) => {
    let data;
    try {

        const config_header = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };
        const data = await axios.put(
            `${config().url}/missing/edit/person`,
            details,
            config_header
        )


        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}