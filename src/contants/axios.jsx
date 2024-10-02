import axios from "axios";

import {base_url} from '../contants/contants';


const instance = axios.create({
    baseURL:base_url
});


instance.interceptors.request.use(
    config=>{
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default instance