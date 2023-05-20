import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: null
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCarts(state, action) {
      state.carts = action.payload;
    },
  },
});

export const { 
  setCarts,
} = cart.actions;

export default cart.reducer;
