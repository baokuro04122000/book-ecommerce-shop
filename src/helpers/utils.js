import {toast} from 'react-toastify'
export const calDiscount = (price, discount) => {
  return (price - (price * discount) / 100).toFixed(2);
};

export const inStock = (product) => {
  return product?.variants?.length === 1
    ? product?.variants[0].quantity > 0
      ? product?.variants[0].type
      : `out_of_${product?.variants[0].type}`
    : product?.variants?.find((variant) => variant.type === "paperBack")
        .quantity > 0
    ? "paperBack"
    : product?.variants?.find((variant) => variant.type === "kindle").quantity >
      0
    ? "kindle"
    : "outOfkindle";
};

export const forceLogin = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  setTimeout(() => {
    document.querySelector("#pin-login").click()
    document.querySelector("#email").focus()
    toast.warning('Please login to use the feature!', {autoClose: 3000})
  }, 300)
  
}
export const scrollTop = () => {
  window.screenTop = 0;
}