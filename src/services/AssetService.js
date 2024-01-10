import axios from "./CustomizeAxios";

const getAllAssets = () => {
    return axios.get('/api/v1/assets');
}

const createNewAssets = (data) => {
    return axios.post('/api/v1/create-asset', data);
}

const updateAssets = (data) => {
    return axios.put('/api/v1/update-asset', data);
}

const deleteAsset = (id_WO) => {
    let id = id_WO;
    return axios.delete(`/api/v1/delete-asset/${id}`);
  };
export {getAllAssets, createNewAssets, deleteAsset, updateAssets};