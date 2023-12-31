import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

export const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const onResponse = (res: AxiosResponse): AxiosResponse => res;

const onResponseError = (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('TOKEN')

        window.location.reload();

        return error;
      }
      throw error;
  };
  
  axiosClient.interceptors.response.use(onResponse, onResponseError);
