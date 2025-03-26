import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { getToken } from './token';
import { toast, ToastOptions } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

type ValidationMessageType = {
  messages: string[];
}

type DetailMessageType = {
  type: string;
  message: string;
  details?: Record<string, ValidationMessageType>;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const options: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;
        if (detailMessage.details) {
          Object.entries(detailMessage.details).forEach(([, validation]) => {
            validation.messages.forEach((message) => {
              toast.warn(message, options);
            });
          }
          );
        }
      }
      if (error.response?.status === 401) {
        return;
      }
      toast.warn(error.message);
      throw error;
    }
  );

  return api;
};
