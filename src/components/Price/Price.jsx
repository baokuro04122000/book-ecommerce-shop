import {calDiscount} from '../../helpers/utils'
const Price = ({ product }) => {
  return (
    <>
      {product?.variants?.length === 1 ? (
        <>
          {product?.variants[0].discount !== 0 ? (
            <>
              <ins>
                $
                {calDiscount(
                  product?.variants[0].price,
                  product?.variants[0].discount
                )}
              </ins>
              <del>${product?.variants[0].price}</del>
            </>
          ) : (
            <ins>${product?.variants[0].price}</ins>
          )}
        </>
      ) : (
        <>
          {product?.variants?.find((variant) => variant.type === "paperBack")
            .discount !== 0 ? (
            <>
              <ins>
                $
                {calDiscount(
                  product?.variants?.find(
                    (variant) => variant.type === "paperBack"
                  ).price,
                  product?.variants?.find(
                    (variant) => variant.type === "paperBack"
                  ).discount
                )}
              </ins>
              <del>
                $
                {
                  product?.variants?.find(
                    (variant) => variant.type === "paperBack"
                  ).price
                }
              </del>
            </>
          ) : (
            <ins>
              $
              {
                product?.variants?.find(
                  (variant) => variant.type === "paperBack"
                ).price
              }
            </ins>
          )}
        </>
      )}
    </>
  );
};

export default Price
