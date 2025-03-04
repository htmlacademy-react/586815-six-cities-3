import axios, { AxiosInstance } from 'axios';

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  // const onSuccess = (response) => response;

  // const onFail = (err) => {
  //   throw err;
  // };

  // api.interceptors.response.use(onSuccess, onFail);

  return api;
};
