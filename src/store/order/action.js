import { addDeliveryInfo, addOrder, checkStatusPayment, getDeliveryInfo, removeDeliveryInfo, setDefaultDeliveryInfo, updateDeliveryInfo } from "../../api/order";
import { setDeliveryInfo } from "./slice";

export const actionAddDeliveryInfo = async (body) => {
  try {
    const { data } = await addDeliveryInfo(body);
    return data.message;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const actionGetDeliveryInfo = () => {
  return async (dispatch) => {
    try {
      const { data } = await getDeliveryInfo();

      console.log('check call api', data)
      await dispatch(setDeliveryInfo(data.data))
    } catch (error) {
      console.log(error);
      throw error.response?.data;
    }
  };
};

export const actionRemoveDeliveryInfo = async (addressId) => {
  try {
    const { data } = await removeDeliveryInfo({addressId: addressId});
    return data.message;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const actionUpdateDeliveryInfo = async (addressId, address) => {
  try {
    const { data } = await updateDeliveryInfo({addressId: addressId}, address);
    return data.message;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const actionSetDefaultDeliveryInfo = async (addressId) => {
  try {
    const { data } = await setDefaultDeliveryInfo({addressId: addressId});
    return data.message;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const actionAddOrder = async (order) => {
  try {
    const { data } = await addOrder({order: order});
    return data;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};

export const actionCheckStatusPayment = async (payId) => {
  try {
    const { data } = await checkStatusPayment(payId);
    return data;
  } catch (error) {
    console.log(error);
    throw error.response?.data;
  }
};