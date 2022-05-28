import axios from "axios";
import { config } from "../config";

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

export const registerUser = (access_token, details) => async (dispatch) => {
    try {
        const config_header = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };

        const data = await axios.post(
            `${config().url}/auth/register/`,
            details,
            config_header
        )
        return data;
    }
    catch (error) {
        return { status: false };
    }
}

export const registerUserBulk = (access_token, csvFile) => async (dispatch) => {
    try {
        const config_header = {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'content-type': 'multipart/form-data'
            },
        };

        const formData = new FormData();
        formData.append('file', csvFile)

        const data = await axios.post(
            `${config().url}/auth/register-bulk/`,
            formData,
            config_header
        )
        return data;
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
}, 1000);


export const changePassword = (details, access_token) => async (dispatch) => {
    let data;
    try {
        const config_header = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };

        const data = await axios.post(
            `${config().url}/auth/change-password/`,
            details,
            config_header
        )
        return data;
    }
    catch (err) {
        console.log("Error:", err);
        return { status: false };
    }

    return data;
}


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
        dispatch({
            type: 'GET_PS_DETAILS',
            police_station_details: data.data
        });

        return data;
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
        dispatch({
            type: 'GET_PERSONS',
            allPersons: data.data
        });

        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}

export const getAllPoliceStations = (access_token) => async (dispatch) => {
    let data;
    try {
        const config_header = {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
        };

        const data = await axios.get(
            `${config().url}/auth/get/all-police-stations`,
            config_header
        )

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
        dispatch({
            type: 'GET_PERSONS',
            allPersons: data.data
        });

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
        dispatch({
            type: 'GET_PERSONS',
            allPersons: data.data
        });
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
        dispatch({
            type: 'GET_PERSONS',
            allPersons: data.data
        });

        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}

export const getAllTracked = (access_token) => async (dispatch) => {
    let data;
    try {

        const data = await axios.get(
            `${config().url}/missing/get/all-tracked`
        )
        dispatch({
            type: 'GET_PERSONS',
            allPersons: data.data
        });

        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}

export const getAllFound = (access_token) => async (dispatch) => {
    let data;
    try {

        const data = await axios.get(
            `${config().url}/missing/get/all-found`
        )
        dispatch({
            type: 'GET_PERSONS',
            allPersons: data.data
        });
        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}


export const getMyTracked = (access_token) => async (dispatch) => {
    let data;
    try {
        const config_header = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };

        const data = await axios.get(
            `${config().url}/missing/get/my-tracked`,
            config_header
        )
        dispatch({
            type: 'GET_PERSONS',
            allPersons: data.data
        });

        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}


export const getMyFound = (access_token) => async (dispatch) => {
    let data;
    try {

        const config_header = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };
        const data = await axios.get(
            `${config().url}/missing/get/my-found`,
            config_header
        )
        dispatch({
            type: 'GET_PERSONS',
            allPersons: data.data
        });

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

export const getNotifications = (access_token) => async (dispatch) => {
    let data;
    try {
        const config_header = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };

        const data = await axios.get(
            `${config().url}/missing/get/notifications`,
            config_header
        )

        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}

export const editNotificationStatus = (access_token, arr) => async (dispatch) => {
    let data;
    try {
        let details = { ids: arr }
        const config_header = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };
        const data = await axios.put(
            `${config().url}/missing/edit/notification-status`,
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

export const changeMonitoringStatus = (status) => async (dispatch) => {
    let data;
    try {
        dispatch({
            type: 'MONITORING_CHANGE',
            status: status
        });
        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}

export const autocomplete = (query, access_token) => async (dispatch) => {
    let data;
    try {

        const config_header = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };
        const data = await axios.post(
            `${config().url}/missing/autocomplete`,
            {query},
            config_header
        )

        return data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}