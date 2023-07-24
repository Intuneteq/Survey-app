import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import router from "../router";

export interface ApiError {
    errors: Array<string[]>;
  }

export const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = "123";
    if (config.headers?.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const onResponse = (res: AxiosResponse): AxiosResponse => res;
const onResponseError = (error: AxiosError) => {
    if(error.response && error.response.status === 401) {
        router.navigate('/login')
        return error
    }
     throw error
} 

axiosClient.interceptors.response.use(onResponse, onResponseError);
