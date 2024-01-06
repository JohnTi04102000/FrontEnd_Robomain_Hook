import axios from "axios";
import localStorage from "localStorage";

const createAxiosInstance = () => {
  const instance = axios.create({
    // baseURL: 'http://103.98.160.26:1010/',
    baseURL: 'http://localhost:8080/'
  });

  // Thêm interceptor trước khi gửi request
  instance.interceptors.request.use(
    (config) => {
      // Kiểm tra xem token có trong local storage hay không
      const token = localStorage.getItem("token");

      // Nếu có token, thì thêm token vào header của request
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
