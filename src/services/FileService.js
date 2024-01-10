import axios from "./CustomizeAxios";


const uploadFile = (data_File) => {
    console.log(data_File);
    return axios.post('/api/v1/upload-asset', data_File);
}


export {uploadFile};