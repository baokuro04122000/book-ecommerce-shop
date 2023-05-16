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
