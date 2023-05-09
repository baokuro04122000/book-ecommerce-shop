import {  configureStore } from "@reduxjs/toolkit";
import {  useDispatch, useSelector } from "react-redux";
import authenticationSlice from "./authentication/slice";
import productsSlice from "./products/slice";


export const store = configureStore({
  reducer: {
    authentication: authenticationSlice,
    products: productsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

