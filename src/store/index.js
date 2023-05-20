import {  configureStore } from "@reduxjs/toolkit";
import {  useDispatch, useSelector } from "react-redux";
import authenticationSlice from "./authentication/slice";
import productsSlice from "./products/slice";
import cartSlice from "./cart/slice";
import orderSlice from "./order/slice";


export const store = configureStore({
  reducer: {
    authentication: authenticationSlice,
    products: productsSlice,
    cart: cartSlice,
    order: orderSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

