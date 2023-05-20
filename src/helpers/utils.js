import {toast} from 'react-toastify'
export const calDiscount = (price, discount) => {
  return Number((price - (price * discount) / 100).toFixed(2));
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

export const subtotal = (cartItems) => {
  let result = 0;
  cartItems?.forEach((item) => {
    const variant = item.product.variants.find(v => v._id === item.variant)
    result += calDiscount(variant.price, variant.discount)*item.quantity
  })
  return Number(result.toFixed(2));
}

export const calPriceItemCart = (cartItem) => {
  const variant = cartItem?.product.variants.find(v => v._id === cartItem.variant)
  return Number((calDiscount(variant.price, variant.discount)*cartItem.quantity).toFixed(2))
}