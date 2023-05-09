import { calDiscount } from "../../helpers/utils";
const AlsoAvailable = ({ product }) => {
  return (
    <>
      {product?.variants?.length === 1 ? (
        <>
          {product?.variants[0].discount !== 0 ? (
            <>
              <li>
                <span>
                  {product?.variants[0].type} $
                  {calDiscount(
                    product?.variants[0].price,
                    product?.variants[0].discount
                  )}
                </span>
              </li>
            </>
          ) : (
            <li>
              <span>
                {product?.variants[0].type} ${product?.variants[0].price}
              </span>
            </li>
          )}
        </>
      ) : (
        <>
          {product?.variants?.find((variant) => variant.type === "paperBack")
            .discount !== 0 ? (
            <>
              <li>
                <span>
                  Paperback $
                  {calDiscount(
                    product?.variants?.find(
                      (variant) => variant.type === "paperBack"
                    ).price,
                    product?.variants?.find(
                      (variant) => variant.type === "paperBack"
                    ).discount
                  )}
                </span>
              </li>
            </>
          ) : (
            <li>
              <span>
                Paperback $
                {
                  product?.variants?.find(
                    (variant) => variant.type === "paperBack"
                  ).price
                }
              </span>
            </li>
          )}

          {product?.variants?.find((variant) => variant.type === "kindle")
            .discount !== 0 ? (
            <>
              <li>
                <span>
                  Kindle $
                  {calDiscount(
                    product?.variants?.find(
                      (variant) => variant.type === "kindle"
                    ).price,
                    product?.variants?.find(
                      (variant) => variant.type === "kindle"
                    ).discount
                  )}
                </span>
              </li>
            </>
          ) : (
            <li>
              <span>
                Kindle $
                {
                  product?.variants?.find(
                    (variant) => variant.type === "kindle"
                  ).price
                }
              </span>
            </li>
          )}
        </>
      )}
    </>
  );
};

export default AlsoAvailable;
