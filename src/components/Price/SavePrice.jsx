import {calDiscount} from '../../helpers/utils'
const SavePrice = ({product}) => {
  return (
    <>
      {product?.variants?.length === 1 ? (
        <>
          {product?.variants[0].discount !== 0 ? (
            <>
              <span class="tg-bookwriter">You save ${
                product?.variants[0].price -
                calDiscount(
                  product?.variants[0].price,
                  product?.variants[0].discount
                )
              }</span>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {product?.variants?.find((variant) => variant.type === "paperBack")
            .discount !== 0 ? (
            <>
              <span class="tg-bookwriter">You save ${
                  product?.variants?.find(
                    (variant) => variant.type === "paperBack"
                  ).price -
                  calDiscount(
                    product?.variants?.find(
                      (variant) => variant.type === "paperBack"
                    ).price,
                    product?.variants?.find(
                      (variant) => variant.type === "paperBack"
                    ).discount
                  )
                }</span>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  )
}

export default SavePrice