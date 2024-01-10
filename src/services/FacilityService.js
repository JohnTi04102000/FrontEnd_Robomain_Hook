import axios from "./CustomizeAxios";

const getAllFacilities = () => {
    return axios.get('/api/v1/facilities');
}

export {getAllFacilities};