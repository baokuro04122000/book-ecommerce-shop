
import axios from "axios";
import {setAuthUser} from '../store/authentication/slice'
let store;

export const BASE_URL = process.env.REACT_APP_SERVER_HOST;
console.log('host::', BASE_URL)
const baseClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const injectStore = (_store) =>
  (store = _store);

baseClient.interceptors.response.use((response) => {
   return response;
}, error => {
  if( error.response.status === 409) {
    return baseClient.get("/auth/refresh-token").then(async ({data}) => {
      localStorage.setItem('authUser', JSON.stringify(data));
      await store.dispatch(setAuthUser(data))
      return baseClient(error.config)
    })
  }
  return Promise.reject(error)
});

baseClient.interceptors.request.use((config) => {
  const token = store.getState().authentication.authUser?.data.accessToken;
  config.headers.Authorization = "Bearer "+token;
  return config;
})

export default baseClient;
