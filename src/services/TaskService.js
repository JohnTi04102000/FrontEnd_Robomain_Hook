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

const updateTask = (id) => {
    return axios.get(`/api/v1/updateTask/${id}`);
}

const addNoteTask = (data) => {
    return axios.put(`/api/v1/note-task`, data);
}

export {getAllTasks, getTaskById, createTask, deleteTask, updateTask, addNoteTask};