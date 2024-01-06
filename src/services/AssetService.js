import axios from "./CustomizeAxios";

const getAllAssets = () => {
    return axios.get('/api/v1/assets');
}
export {getAllAssets};