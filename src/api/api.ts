import axios from 'axios';
import type { AxiosInstance} from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: "https://padaria-api-sui1.onrender.com/api/",
    // baseURL: "http://localhost:5000/api/",
    headers: {'content-type': 'application/json'},
    timeout: 1000000,
})

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return await axios.post("http://localhost:5000/api/produtos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
})

// https://padaria-api-sui1.onrender.com/api/
// http://localhost:5000/api/


// apiClient.interceptors.request.use(config => {
//     const token = localStorage.getItem('token')
//     if(token && config.headers) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
// })


export default apiClient