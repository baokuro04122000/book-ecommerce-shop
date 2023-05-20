import {
  addToCart,
  deleteAllCarts,
  deleteItemsCarts,
  getCarts,
} from "../../api/cart";
import { setCarts } from "./slice";

export const actionAddToCart = async (body) => {
  try {
    const { data } = await addToCart(body);
    return data.message;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const actionGetCart = () => {
  return async (dispatch) => {
    try {
      const { data } = await getCarts();
      await dispatch(setCarts(data.data));
    } catch (error) {
      console.log(error);
      throw error.response?.data;
    }
  };
};

export const actionDeleteItemCart = async (params) => {
  try {
    const { data } = await deleteItemsCarts(params);
    return data.message;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const actionDeleteAllCarts = async () => {
  try {
    const { data } = await deleteAllCarts();
    return data.message;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};
