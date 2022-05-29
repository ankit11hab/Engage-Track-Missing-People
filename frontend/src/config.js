export const LOCAL_SERVER_URL = `http://localhost:8000`;
export const LOCAL_SERVER_URL_MAIN = `http://localhost:8000`; 
export const LOCAL_SERVER_URL_IP = `http://127.0.0.1:8000`;
export const AWS_SERVER_URL_IP = `http://18.223.206.135`;
export const config = ()=>{
    const confs = {
        'local':{
            'url':LOCAL_SERVER_URL,
            'AUTOCOMEPLETE_API_KEY': "AIzaSyCbcM_1NaJDrnmpCp8XJHGfJwk-l_pW_SY"
        }
    }

    return confs['local'];
}
