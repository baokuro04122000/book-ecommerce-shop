import Carousel from "react-multi-carousel";
import {useAppSelector, useAppDispatch} from '../../../store/index'
import { calDiscount } from "../../../helpers/utils";
import { useEffect } from "react";
import { actionGetBestSelling } from "../../../store/products/action";
import { setBestSelling } from "../../../store/products/slice";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const Product = () => {
  const bestSelling = useAppSelector(({products}) =>  products.bestSelling)
  
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(actionGetBestSelling())
    return () => {
      dispatch(setBestSelling(null))
    }
  }, [dispatch])

  return (
    <>
      <Carousel responsive={responsive}>
        {bestSelling?.length > 0 ? (
          <>
            {bestSelling.map((product) => (
              <div className="item">
              <div className="tg-postbook">
                <figure className="tg-featureimg">
                  <div className="tg-bookimg">
                    <div className="tg-frontcover">
                      <img src={product.productPictures[0]} alt="image description" />
                    </div>
                    <div className="tg-backcover">
                      <img src={product.productPictures[0]} alt="image description" />
                    </div>
                  </div>
                  <a className="tg-btnaddtowishlist" href="javascript:void(0);">
                    <i className="icon-heart"></i>
                    <span>add to wishlist</span>
                  </a>
                </figure>
                <div className="tg-postbookcontent">
                  <ul className="tg-bookscategories">
                    <li>
                      <a href="javascript:void(0);">{product.category.name}</a>
                    </li>
                    
                  </ul>
                  {/* <div className="tg-themetagbox">
                    <span className="tg-themetag">sale</span>
                  </div> */}
                  <div className="tg-booktitle">
                    <h3>
                      <a href="javascript:void(0);">{product.name}</a>
                    </h3>
                  </div>
                  <span className="tg-bookwriter">
                    By: <a href="javascript:void(0);">{product.specs.author}</a>
                  </span>
                  <span className="tg-stars">
                    <span></span>
                  </span>
                  <span className="tg-bookprice">
                  {product.variants?.length === 1 ? (
                  <>
                    {
                      product?.variants[0].discount !== 0 ? 
                      (<>
                        <ins>
                        ${calDiscount( product?.variants[0].price, product?.variants[0].discount)}
                      </ins>
                      <del>${product?.variants[0].price}</del>
                      </>)
                       : <ins>
                    {product?.variants[0].price}
                     </ins>
                    }
                  </>
                ) : (
                <>
                    {product?.variants?.find((variant) => variant.type === 'paperBack').discount !== 0 ? (
                      (
                        <>
                          <ins>
                            ${
                              calDiscount(product?.variants?.find((variant) => variant.type === 'paperBack').price,
                              product?.variants?.find((variant) => variant.type === 'paperBack').discount)
                            }
                          </ins>
                          <del>${product?.variants?.find((variant) => variant.type === 'paperBack').price}</del>
                        
                        </>
                      )
                    ): (
                      <ins>
                            ${
                              product?.variants?.find((variant) => variant.type === 'paperBack').price
                            }
                          </ins>

                    )}
                </>)  }
                  </span>
                  <a className="tg-btn tg-btnstyletwo" href="javascript:void(0);">
                    <i className="fa fa-shopping-basket"></i>
                    <em>Add To Basket</em>
                  </a>
                </div>
              </div>
            </div>
            ))}
          </>
        ): (
          <></>
        )}
      </Carousel>
      ;
    </>
  );
};

export default Product;
