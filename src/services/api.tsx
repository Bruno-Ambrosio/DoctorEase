import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getCookie, removeCookie } from '../utils/Cookies';
import { InternalConstants } from '../constants/InternalConstants';

const Api: AxiosInstance = axios.create({
  baseURL: "https://localhost:7017/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeCookie(InternalConstants.AUTH_TOKEN_NAME);
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

Api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookie(InternalConstants.AUTH_TOKEN_NAME);
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default Api;
