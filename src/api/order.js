import baseAxios from './baseClient';

export const addDeliveryInfo = async (body) => {
  return await baseAxios.post('/address/add', body)
}

export const getDeliveryInfo = async () => {
  return await baseAxios.get('/address/get')
} 

export const removeDeliveryInfo = async (params) => {
  return await baseAxios.delete(`/address/${params.addressId}/delete`)
}

export const updateDeliveryInfo = async (params, body) => {
  return await baseAxios.put(`/address/${params.addressId}/update`, body)
}

export const setDefaultDeliveryInfo = async (params) => {
  return await baseAxios.patch(`/address/${params.addressId}/set-default`)
}

export const addOrder = async (body) => {
  return await baseAxios.post(`/order/add`, body)
}

export const checkStatusPayment = async (payId) => {
  return await baseAxios.post('/pay/check-status', {payId})
}