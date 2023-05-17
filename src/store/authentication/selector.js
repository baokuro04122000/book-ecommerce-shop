
import { createSelector } from "@reduxjs/toolkit";


export const selectAuthentication = (state) => state?.authentication;

export const selectIsAuth = createSelector(selectAuthentication, (auth) => {
  const token = JSON.parse(localStorage.getItem('authUser'))?.accessToken
  if (!token) return false;
  return true
});

export const getUser = () => {
  return JSON.parse(localStorage.getItem('authUser'))
}
