import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { actionGetFeaturedProduct } from "../../../store/products/action";
import { setFeaturedProduct } from "../../../store/products/slice";
import { calDiscount } from "../../../helpers/utils";
const Feature = () => {
  const featured = useAppSelector(({ products }) => products.featuredProduct);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actionGetFeaturedProduct());
    return () => {
      setFeaturedProduct(null);
    };
  }, [dispatch]);
  return (
    <section className="tg-bglight tg-haslayout">
      <div className="container">
        <div className="row">
          <div className="tg-featureditm">
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 hidden-sm hidden-xs">
              <figure>
                <img
                  src={featured?.productPictures[0]}
                  alt="image description"
                />
              </figure>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
              <div className="tg-featureditmcontent">
                <div className="tg-themetagbox">
                  <span className="tg-themetag">featured</span>
                </div>
                <div className="tg-booktitle">
                  <h3>
                    <a href="javascript:void(0);">{featured?.name}</a>
                  </h3>
                </div>
                <span className="tg-bookwriter">
                  By: <a href="javascript:void(0);">{featured?.specs.author}</a>
                </span>
                <span className="tg-stars">
                  <span></span>
                </span>
                <div className="tg-priceandbtn">
                  <span className="tg-bookprice">
                    {featured?.variants?.length === 1 ? (
                      <>
                        {featured?.variants[0].discount !== 0 ? (
                          <>
                            <ins>
                              $
                              {calDiscount(
                                featured?.variants[0].price,
                                featured?.variants[0].discount
                              )}
                            </ins>
                            <del>${featured?.variants[0].price}</del>
                          </>
                        ) : (
                          <ins>{featured?.variants[0].price}</ins>
                        )}
                      </>
                    ) : (
                      <>
                        {featured?.variants?.find(
                          (variant) => variant.type === "paperBack"
                        ).discount !== 0 ? (
                          <>
                            <ins>
                              $
                              {calDiscount(
                                featured?.variants?.find(
                                  (variant) => variant.type === "paperBack"
                                ).price,
                                featured?.variants?.find(
                                  (variant) => variant.type === "paperBack"
                                ).discount
                              )}
                            </ins>
                            <del>
                              $
                              {
                                featured?.variants?.find(
                                  (variant) => variant.type === "paperBack"
                                ).price
                              }
                            </del>
                          </>
                        ) : (
                          <ins>
                            $
                            {
                              featured?.variants?.find(
                                (variant) => variant.type === "paperBack"
                              ).price
                            }
                          </ins>
                        )}
                      </>
                    )}
                  </span>
                  <a
                    className="tg-btn tg-btnstyletwo tg-active"
                    href="javascript:void(0);"
                  >
                    <i className="fa fa-shopping-basket"></i>
                    <em>Add To Basket</em>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
