import baseAxios from './baseClient';

export const addToCart = async (body) => {
  return await baseAxios.post('/cart/add', body)
}

export const getCarts = async () => {
  return await baseAxios.get('/cart/get')
}

export const deleteItemsCarts = async (params) => {
  return await baseAxios.delete(`/cart/delete/${params.productId}/variant/${params.variantId}`)
}

export const deleteAllCarts = async () => {
  return await baseAxios.delete(`/cart/delete-all`)
}
