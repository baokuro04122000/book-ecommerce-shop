import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bestSelling: [],
  categories: null,
  categoriesAmount: null,
  featuredProduct: null,
  newReleaseBook: null,
  products: null,
  productDetail: null,
  searchList:null,
  sellers: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setBestSelling(state, action) {
      state.bestSelling = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload
    },
    setFeaturedProduct(state, action){
      state.featuredProduct = action.payload
    },
    setCategoriesAmount(state, action){
      state.categoriesAmount = action.payload
    },
    setNewReleaseBook(state, action){
      state.newReleaseBook = action.payload
    },
    setProducts(state, action){
      state.products = action.payload
    },
    setProductDetail(state, action){
      state.productDetail = action.payload
    },
    setSearchList(state, action){
      state.searchList = action.payload
    },
    setSellers(state, action){
      state.sellers = action.payload
    }
  },
});

export const { 
  setBestSelling,
  setCategories,
  setFeaturedProduct,
  setCategoriesAmount,
  setNewReleaseBook,
  setProducts,
  setProductDetail,
  setSearchList,
  setSellers
} = productsSlice.actions;

export default productsSlice.reducer;
