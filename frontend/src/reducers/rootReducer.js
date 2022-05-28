const initState = {
    isAuthenticated:  localStorage.getItem('authTokens')?(JSON.parse(localStorage.getItem('authTokens')).access):false,
    user: localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')):null,
    monitoring: false,
    police_station_details: {},
    allPersons: [],
    notifications: []
}

const rootReducer = (state=initState,action) => {

    if(action.type==='LOGIN_USER') {
        return {
            ...state,
            isAuthenticated:true,
            user: action.user,
        }
    }

    if(action.type==='LOGOUT_USER') {
        return {
            ...state,
            isAuthenticated:false,
            user: {},
        }
    }

    if(action.type==='GET_PS_DETAILS') {
        const newObj = action.police_station_details;
        return {
            ...state,
            police_station_details: newObj
        }
    }

    if(action.type==='GET_PERSONS') {
        const newArr = action.allPersons;
        return {
            ...state,
            allPersons: newArr
        }
    }

    if(action.type==='MONITORING_CHANGE') {
        const status = action.status;
        return {
            ...state,
            monitoring: status
        }
    }

    if(action.type==='GET_NOTIFICATIONS') {
        const notifications = action.notifications;
        return {
            ...state,
            notifications: notifications
        }
    }

    return state;
}

export default rootReducer;