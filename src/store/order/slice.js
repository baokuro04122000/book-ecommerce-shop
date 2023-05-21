import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveryInfo: null,
  infoOrder:null,
  allOrders: null,
};

export const order = createSlice({
  name: "order",
  initialState,
  reducers: {
    setDeliveryInfo(state, action) {
      state.deliveryInfo = action.payload;
    },
    setInfoOrder(state, action) {
      state.infoOrder = action.payload;
    },
    setAllOrders(state, action) {
      state.infoOrder = action.payload;
    } 
  },
});

export const { 
  setDeliveryInfo,
  setInfoOrder,
  setAllOrders
} = order.actions;

export default order.reducer;
