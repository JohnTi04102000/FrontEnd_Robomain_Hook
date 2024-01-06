import axios from "./CustomizeAxios";

const getAllUsers = () => {
    return axios.get('/api/v1/users');
}

const getAllUser = () => {
    return axios.get('/users');
}

const createNewUserService = (data) => {
    return axios.post('/api/v1/create-user', data);
}

const uploadFile = (data_File) => {
    console.log(data_File);
    return axios.post('/api/v1/upload-profile-pic', data_File);
}

const deleteUser = (id_User) => {
    let id = id_User;
    return axios.delete(`/api/v1/delete-user/${id}`);
}

const updateUser = (data_User) => {
    console.log('data_User', data_User);
    return axios.put('/api/v1/update-user', data_User);
}
export {getAllUsers, getAllUser, createNewUserService, uploadFile, deleteUser, updateUser};