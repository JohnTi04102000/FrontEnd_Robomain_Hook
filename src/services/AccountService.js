import axios from "./CustomizeAxios";

const getAllAccounts = () => {
    return axios.get('/api/v1/accounts');
}

const createNewAccounts = (data) => {
    return axios.post('/api/v1/create-account', data);
}

const deleteAccount = (id_WO) => {
    let id = id_WO;
    return axios.delete(`/api/v1/delete-account/${id}`);
  };

export {getAllAccounts, createNewAccounts, deleteAccount};