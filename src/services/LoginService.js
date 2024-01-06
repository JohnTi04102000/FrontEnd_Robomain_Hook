import axios from "./CustomizeAxios";

const handleLogin = (email, password) =>{
    return axios.post('/api/v1/login', {email, password});
}

export {handleLogin};

