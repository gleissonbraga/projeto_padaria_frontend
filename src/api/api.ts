import axios from 'axios';
import type { AxiosInstance} from 'axios';




const apiClient: AxiosInstance = axios.create({
    baseURL: "https://localhost:7179/",
    headers: {'content-type': 'application/json'},
    timeout: 10000,
})




// apiClient.interceptors.request.use(config => {
//     const token = localStorage.getItem('token')
//     if(token && config.headers) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
// })


export default apiClient