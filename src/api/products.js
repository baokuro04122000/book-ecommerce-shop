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

export const searchProducts =async (keyword) => {
  return await baseAxios.get('/product/search/'+keyword)
}

export const getSellers = async () => {
  return await baseAxios.get('/sellers');
}

export const getRelatedProduct = async (categoryId) => {
  return await baseAxios.get('/product/related-product/get?categoryId='+categoryId)
}

export const getSellersTop3 = async () => {
  return await baseAxios.get('/sellers/top3')
}

export const getProductsByAuthor = async (query) => {
  return await baseAxios.get('/product/author/get?'+ query)
}