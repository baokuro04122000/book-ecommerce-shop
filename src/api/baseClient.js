
import axios from "axios";
import { getUser } from "../store/authentication/selector";


export const BASE_URL = process.env.REACT_APP_SERVER_HOST;
console.log('host::', BASE_URL)
const baseClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const injectStore = (_store) => _store;

baseClient.interceptors.response.use((response) => {
   return response;
}, error => {
  if( error.response.status === 409) {
    return baseClient.get("/auth/refresh-token").then(async ({data}) => {
      localStorage.setItem('authUser', JSON.stringify(data.data));
      return baseClient(error.config)
    })
  }
  return Promise.reject(error)
});

baseClient.interceptors.request.use((config) => {
  const token = getUser()?.accessToken;
  config.headers.Authorization = "Bearer "+token;
  return config;
})

export default baseClient;
