import axios from 'axios';
import type { AxiosInstance} from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: "https://padaria-api-sui1.onrender.com/api/",
    headers: {'content-type': 'application/json'},
    timeout: 1000000,
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