
import { 
  setBestSelling, setCategories, setCategoriesAmount, setFeaturedProduct, setNewReleaseBook, setProductDetail, setProducts,
} from "../products/slice";
import { 
  bestSelling, getAllCategories, getAllCategoriesWithAmount, getFeaturedProduct, getNewReleaseBook, getProductDetailsBySlug, getProducts 
} from "../../api/products";

export const actionGetBestSelling = (
) => {
  return async (dispatch) => {
    try {
      const { data } = await bestSelling();
      dispatch(setBestSelling(data.data));
    } catch (error) {
      console.log(error)
      throw error.response?.data;
    }
  };
};

export const actionGetAllCategory = () => {
  return async (dispatch) => {
    try {
      const { data } = await getAllCategories();
      dispatch(setCategories(data.data));
    } catch (error) {
      console.log(error)
      throw error.response?.data;
    }
  }
}

export const actionGetAllCategoriesAmount = () => {
  return async (dispatch) => {
    try {
      const { data } = await getAllCategoriesWithAmount();
      dispatch(setCategoriesAmount(data.data));
    } catch (error) {
      console.log(error)
      throw error.response?.data;
    }
  }
}

export const actionGetFeaturedProduct = () => {
  return async (dispatch) => {
    try {
      const { data } = await getFeaturedProduct();
      dispatch(setFeaturedProduct(data.data));
    } catch (error) {
      console.log(error)
      throw error.response?.data;
    }
  }
}

export const actionGetNewReleaseBook = (query) => {
  return async (dispatch) => {
    try {
      const { data } = await getNewReleaseBook(query);
      dispatch(setNewReleaseBook(data.data));
    } catch (error) {
      console.log(error)
      throw error.response?.data;
    }
  }
}

export const actionGetProducts = (query) => {
  return async (dispatch) => {
    try {
      const { data } = await getProducts(query);
      await dispatch(setProducts({
        products: data.data,
        total: data.total
      }));
    } catch (error) {
      console.log(error)
      throw error.response?.data;
    }
  }
}

export const actionGetProductDetails = (slug) => {
  return async (dispatch) => {
    try {
      const {data} = await getProductDetailsBySlug(slug);
      dispatch(setProductDetail(data.data))
    } catch (error) {
      console.log(error)
      throw error.response?.data;
    }
  }
}
