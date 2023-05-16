
import { createSelector } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export const selectAuthentication = (state) => state?.authentication;

export const selectIsAuth = createSelector(selectAuthentication, (auth) => {
  const token = auth?.authUser?.data.accessToken;
  if (!token) return false;
  const { exp } = jwtDecode(token);
  const now = new Date().getTime();
  if (now > exp * 1000) { 
    return false;
  }else{
    return true
  }
});
