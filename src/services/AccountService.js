import axios from "./CustomizeAxios";

const getAllAccounts = () => {
    return axios.get('/api/v1/accounts');
}

const createNewAccounts = (data) => {
    return axios.post('/api/v1/create-account', data);
}

const updateAccount = (data) => {
    return axios.put('/api/v1/update-account', data);
}

const deleteAccount = (id_Account) => {
    let id = id_Account;
    return axios.delete(`/api/v1/delete-account/${id}`);
  };

export {getAllAccounts, createNewAccounts, updateAccount, deleteAccount};