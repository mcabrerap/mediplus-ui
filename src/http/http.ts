import type { AxiosInstance } from 'axios';
import axios from 'axios';

const http: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default http;
