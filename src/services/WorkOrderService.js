import axiosInstance from "./CustomizeAxios";

const createNewWOService = (data) => {
  return axiosInstance.post("/api/v1/create-workOrder", data);
};

const getAllWorkOrders = () => {
  return axiosInstance.get("/api/v1/workOrders");
};

const getWorkOrderById = (id_User) => {
  return axiosInstance.get(`/api/v1/getWO/${id_User}`);
};

const getAllWorkOrderComplete = () => {
  return axiosInstance.get(`/api/v1/getAllWOComplete`);
};

const getWorkOrderCompleteById = (id_User) => {
  return axiosInstance.get(`/api/v1/getWOComplete/${id_User}`);
};

const getWorkOrderExpire = (id_User) => {
  return axiosInstance.get(`/api/v1/getExpireWO/${id_User}`);
};

const updateWorkOrder = (data) => {
  return axiosInstance.put("/api/v1/update-workOrder", data);
};

const completeWorkOrder = (id) => {
  return axiosInstance.put(`/api/v1/complete-workOrder/${id}`);
};

const deleteWorkOrder = (id_WO) => {
  let id = id_WO;
  return axiosInstance.delete(`/api/v1/delete-workOrder/${id}`);
};

const getAllAssets = () => {
  return axiosInstance.get("/api/v1/assets");
};

export {
  getAllWorkOrders,
  createNewWOService,
  updateWorkOrder,
  deleteWorkOrder,
  getAllAssets,
  getWorkOrderById,
  getWorkOrderExpire,
  completeWorkOrder,
  getWorkOrderCompleteById,
  getAllWorkOrderComplete,
};
