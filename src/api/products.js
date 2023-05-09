import baseAxios from './baseClient';


export const bestSelling =async () => {
  return await baseAxios.get('/product/best-selling/get')
}

export const getAllCategories = async () => {
  return await baseAxios.get('/category/all')
}

export const getFeaturedProduct = async () => {
  return await baseAxios.get('/product/featured/get')
}

export const getAllCategoriesWithAmount = async () => {
  return await baseAxios.get('/category/all-amount')
}

export const getNewReleaseBook = async (query) => {
  return await baseAxios.get(`/product/new-release/get?page=${query.page}&limit=${query.limit}`)
}

export const getProducts =async (query) => {
  return await baseAxios.get(`/product/list?${query}`)
}

export const getProductDetailsBySlug = async (slug) => {
  return await baseAxios.get('/product/'+slug)
}