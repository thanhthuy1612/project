import axios from 'axios';
import { baseURL } from './url';

const request = axios.create({ baseURL: baseURL, withCredentials: true });
const requestConnect= axios.create({ baseURL: baseURL, withCredentials: true });

request.interceptors.request.use(
  function (config) {
    // Perform localStorage action
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers['x-access-token'] = accessToken;
    }
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Headers'] = 'X-Requested-With';
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export const get = async (path: string, options = {}) => {
  try {
    const response = await request.get(path, options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (path: string, options = {}) => {
  const response = await request.put(path, options);
  return response;
};

export const post = async (path: string, options = {}) => {
  const response = await request.post(path, options);
  return response;
};

export const postConnect = async (path: string, options = {}) => {
  const response = await requestConnect.post(path, options);
  return response;
};

export const del = async (path: string, options = {}) => {
  const response = await request.delete(path, options);
  return response;
};

export default request;
