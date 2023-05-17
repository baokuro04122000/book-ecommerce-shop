import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { actionGetFeaturedProduct } from "../../../store/products/action";
import { setFeaturedProduct } from "../../../store/products/slice";
import { calDiscount, forceLogin } from "../../../helpers/utils";
import { useNavigate } from "react-router-dom";
import { selectIsAuth } from "../../../store/authentication/selector";
import AddCart from "../../../components/AddCart";
const Feature = () => {
  const featured = useAppSelector(({ products }) => products.featuredProduct);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
            <div
              className="col-xs-12 col-sm-12 col-md-4 col-lg-4 hidden-sm hidden-xs"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "352px",
              }}
            >
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
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        navigate("/products/detail=" + featured?.slug);
                      }}
                    >
                      {featured?.name}
                    </a>
                  </h3>
                </div>
                <span className="tg-bookwriter">
                  By:{" "}
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      navigate("/products/author=" + featured?.specs.author);
                    }}
                  >
                    {featured?.specs.author}
                  </a>
                </span>
                <span className="tg-bookwriter">
                  Seller:{" "}
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      navigate("/products/sellers=" + featured?.sellerId._id);
                    }}
                  >
                    {featured?.sellerId.info.name}
                  </a>
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
                  <AddCart product={featured}/>
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
