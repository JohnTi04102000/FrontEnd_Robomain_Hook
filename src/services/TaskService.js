import axios from "./CustomizeAxios";

const getAllTasks = () => {
    return axios.get('/api/v1/tasks');
}

const getTaskById = (id_WO) => {
    return axios.get(`/api/v1/getTask/${id_WO}`);
}

const createTask = (data) => {
    return axios.post(`/api/v1/create-Task`, data);
}

const deleteTask = (id) => {
    return axios.delete(`/api/v1/delete-task/${id}`);
}

export {getAllTasks, getTaskById, createTask, deleteTask};