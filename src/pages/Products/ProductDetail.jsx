import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { actionGetProductDetails } from "../../store/products/action";
import { setProductDetail } from "../../store/products/slice";
import Price from "../../components/Price/Price";
import SavePrice from "../../components/Price/SavePrice";
import InStock from "../../components/Price/InStock";
import AlsoAvailable from "../../components/Price/AlsoAvailable";
import RelatedProducts from "./RelatedProduct";
import { selectIsAuth } from "../../store/authentication/selector";
import { calDiscount, calRating, forceLogin } from "../../helpers/utils";
import { toast } from "react-toastify";
import { actionAddToCart, actionGetCart } from "../../store/cart/action";
import StarRatings from "react-star-ratings";
import moment from "moment";
const ProductDetail = () => {
  const { params } = useParams();

  const productDetail = useAppSelector(
    ({ products }) => products.productDetail
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(null);
  useEffect(() => {
    dispatch(actionGetProductDetails(params.split("=")[1]));
    return () => {
      dispatch(setProductDetail(null));
    };
  }, [dispatch, params]);

  const handleAddToCart = () => {
    if (productDetail?.variants?.length === 1) {
      actionAddToCart({
        product: productDetail._id,
        quantity: quantity,
        variant: productDetail.variants[0]._id,
        wishlist: false,
      })
        .then((message) => {
          dispatch(actionGetCart());
          toast.success(message, { autoClose: 3000 });
        })
        .catch((err) => {
          toast.error(err?.errors?.message, { autoClose: 5000 });
        });
    } else {
      if (variant) {
        actionAddToCart({
          product: productDetail._id,
          quantity: quantity,
          variant: variant,
          wishlist: false,
        })
          .then((message) => {
            dispatch(actionGetCart());
            toast.success(message, { autoClose: 3000 });
          })
          .catch((err) => {
            toast.error(err?.errors?.message, { autoClose: 5000 });
          });
      } else {
        toast.warning("Please choose the variant that you wanna buy!");
      }
    }
  };
  return (
    <>
      <div class="tg-productdetail">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div class="tg-postbook">
              <figure
                class="tg-featureimg"
                style={{
                  minHeight: "365px",
                }}
              >
                <img
                  src={productDetail?.productPictures[0]}
                  alt="image description"
                />
              </figure>
              <div class="tg-postbookcontent">
                <span class="tg-bookprice">
                  <Price product={productDetail} />
                </span>

                <SavePrice product={productDetail} />
                <ul class="tg-delevrystock">
                  <li>
                    <i class="icon-rocket"></i>
                    <span>Free delivery worldwide</span>
                  </li>
                  <li>
                    <i class="icon-checkmark-circle"></i>
                    <span>Dispatch from the USA in 2 working days </span>
                  </li>
                  <li>
                    <i class="icon-store"></i>
                    <span>
                      Status: <InStock product={productDetail} />
                    </span>
                  </li>
                </ul>
                <div class="tg-quantityholder">
                  <em
                    class="minus"
                    onClick={() => {
                      if (quantity > 1) setQuantity((pre) => pre - 1);
                    }}
                  >
                    -
                  </em>
                  <input
                    type="text"
                    disabled={true}
                    class="result"
                    value={quantity}
                    id="quantity1"
                    name="quantity"
                  />
                  <em
                    class="plus"
                    onClick={() => {
                      if (quantity < 10) setQuantity((pre) => pre + 1);
                    }}
                  >
                    +
                  </em>
                </div>
                <div
                  class="col-lg-12"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "11px 0px",
                  }}
                >
                  {productDetail?.variants?.length === 2 ? (
                    <>
                      <label
                        class="radio-inline"
                        style={{
                          paddingLeft: "10px",
                        }}
                      >
                        <input
                          style={{
                            marginTop: "8px",
                          }}
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          onChange={(e) => {
                            if (e.target.value) {
                              setVariant(e.target.value);
                            }
                          }}
                          value={
                            productDetail?.variants?.find(
                              (variant) => variant.type === "paperBack"
                            )._id
                          }
                          disabled={
                            productDetail?.variants?.find(
                              (variant) => variant.type === "paperBack"
                            ).quantity <= 0
                              ? true
                              : false
                          }
                        />{" "}
                        HardBook: $
                        {calDiscount(
                          productDetail?.variants?.find(
                            (variant) => variant.type === "paperBack"
                          ).price,
                          productDetail?.variants?.find(
                            (variant) => variant.type === "paperBack"
                          ).discount
                        )}{" "}
                        {productDetail?.variants?.find(
                          (variant) => variant.type === "paperBack"
                        ).quantity <= 0 ? (
                          <mark>out of stock</mark>
                        ) : (
                          <></>
                        )}
                      </label>
                      <label
                        class="radio-inline"
                        style={{
                          paddingLeft: 0,
                        }}
                      >
                        <input
                          style={{
                            marginTop: "8px",
                          }}
                          onChange={(e) => {
                            if (e.target.value) {
                              setVariant(e.target.value);
                            }
                          }}
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value={
                            productDetail?.variants?.find(
                              (variant) => variant.type === "kindle"
                            )._id
                          }
                          disabled={
                            productDetail?.variants?.find(
                              (variant) => variant.type === "kindle"
                            ).quantity <= 0
                              ? true
                              : false
                          }
                        />{" "}
                        E-Book: $
                        {calDiscount(
                          productDetail?.variants?.find(
                            (variant) => variant.type === "kindle"
                          ).price,
                          productDetail?.variants?.find(
                            (variant) => variant.type === "kindle"
                          ).discount
                        )}{" "}
                        {productDetail?.variants?.find(
                          (variant) => variant.type === "kindle"
                        ).quantity <= 0 ? (
                          <mark>out of stock</mark>
                        ) : (
                          <></>
                        )}
                      </label>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <a
                  class="tg-btn tg-active tg-btn-lg"
                  href="javascript:void(0);"
                  onClick={() => {
                    if (selectIsAuth()) {
                      handleAddToCart();
                    } else {
                      forceLogin();
                    }
                  }}
                >
                  Add To Basket
                </a>

                <a
                  class="tg-btnaddtowishlist"
                  href="javascript:void(0);"
                  onClick={() => {
                    if (selectIsAuth()) {
                      console.log("handle add with");
                    } else {
                      forceLogin();
                    }
                  }}
                >
                  <span>add to wishlist</span>
                </a>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
            <div class="tg-productcontent">
              <ul class="tg-bookscategories">
                <li>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      navigate(
                        `/products/category=${productDetail?.category?._id}`
                      );
                    }}
                  >
                    {productDetail?.category?.name}
                  </a>
                </li>
              </ul>
              <div class="tg-themetagbox">
                <span class="tg-themetag">sale</span>
              </div>
              <div class="tg-booktitle">
                <h3>{productDetail?.name}</h3>
              </div>
              <span class="tg-bookwriter">
                By:{" "}
                <a
                  href="javascript:void(0);"
                  onClick={() => {
                    navigate(
                      "/products/author=" + productDetail?.specs?.author
                    );
                  }}
                >
                  {productDetail?.specs?.author}
                </a>
              </span>
              <span class="tg-bookwriter">
                Seller:{" "}
                <a
                  href="javascript:void(0);"
                  onClick={() => {
                    navigate("/products/sellers=" + productDetail?.seller?._id);
                  }}
                >
                  {productDetail?.seller?.info?.name}
                </a>
              </span>
              <StarRatings starEmptyColor="gray" starRatedColor="yellow" rating={calRating(productDetail?.reviews) === 0 ? 4 : calRating(productDetail?.reviews)} /> 
              <div style={{
                marginLeft: '10px'
              }}>{calRating(productDetail?.reviews)}/{productDetail?.reviews?.length}</div>
              <div class="tg-share">
                <span>Share:</span>
                <ul class="tg-socialicons">
                  <li class="tg-facebook">
                    <a href="javascript:void(0);">
                      <i class="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li class="tg-twitter">
                    <a href="javascript:void(0);">
                      <i class="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li class="tg-linkedin">
                    <a href="javascript:void(0);">
                      <i class="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li class="tg-googleplus">
                    <a href="javascript:void(0);">
                      <i class="fa fa-google-plus"></i>
                    </a>
                  </li>
                  <li class="tg-rss">
                    <a href="javascript:void(0);">
                      <i class="fa fa-rss"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="tg-description">
                <p>{productDetail?.description}</p>
              </div>
              <div class="tg-sectionhead">
                <h2>Product Details</h2>
              </div>
              <ul class="tg-productinfo">
                <li>
                  <span>Format:</span>
                  <span>Hardback</span>
                </li>
                <li>
                  <span>Pages:</span>
                  <span>{productDetail?.specs?.printLength} pages</span>
                </li>
                <li>
                  <span>Dimensions:</span>
                  <span>153 x 234 x 43mm | 758g</span>
                </li>
                <li>
                  <span>Publication Date:</span>
                  <span>{productDetail?.specs?.publicationDate}</span>
                </li>
                <li>
                  <span>Publisher:</span>
                  <span>{productDetail?.specs?.publisher}</span>
                </li>
                <li>
                  <span>Language:</span>
                  <span>{productDetail?.specs?.language}</span>
                </li>
                <li>
                  <span>ISBN10:</span>
                  <span>1234567890</span>
                </li>
                <li>
                  <span>ISBN13:</span>
                  <span>1234567890000</span>
                </li>
                <li>
                  <span>Other Fomate:</span>
                  <span>Paperback, E-Book</span>
                </li>
              </ul>
              <div class="tg-alsoavailable">
                <figure>
                  <img src="/images/img-02.jpg" alt="image description" />
                  <figcaption>
                    <h3>Also Available in:</h3>
                    <ul>
                      <AlsoAvailable product={productDetail} />
                    </ul>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
          <div class="tg-productdescription">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="tg-sectionhead">
                <h2>Product Description</h2>
              </div>
              <ul class="tg-themetabs" role="tablist">
                <li role="presentation" class="active">
                  <a href="#description" data-toggle="tab">
                    Description
                  </a>
                </li>
                <li role="presentation">
                  <a href="#review" data-toggle="tab">
                    Reviews
                  </a>
                </li>
              </ul>
              <div class="tg-tab-content tab-content">
                <div
                  role="tabpanel"
                  class="tg-tab-pane tab-pane active"
                  id="description"
                >
                  <div class="tg-description">
                    <p>{productDetail?.description}</p>
                  </div>
                </div>
                <div role="tabpanel" class="tg-tab-pane tab-pane" id="review">
                  <div class="tg-description">
                    <div class="spr-reviews">
                      {productDetail?.reviews?.map((review) => (
                        <>
                        <div class="spr-review" style={{
                          minHeight: '100px',
                          width: '100%'
                        }}>
                          <div class="spr-review-header">
                            <StarRatings numberOfStars={5} rating={review.rating} starEmptyColor="gray" starRatedColor="yellow"/>
                            <h3 class="spr-review-header-title">
                              {review.comment}
                            </h3>
                            <span class="spr-review-header-byline">
                              <strong>{review.user.info.name}</strong> on{" "}
                              <strong>{moment(review.updatedAt).format('MM/DD/YYYY h:m A')}</strong>
                            </span>
                          </div>

                        </div>
                        
                        </>
                      ))}

                      {productDetail?.reviews ? (<></>) : (<span>No review</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tg-aboutauthor">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="tg-sectionhead">
                <h2>About Seller</h2>
              </div>
              <div class="tg-authorbox">
                <figure
                  class="tg-authorimg"
                  style={{
                    maxHeight: "250px",
                    maxWidth: "158px",
                  }}
                >
                  <img
                    src={productDetail?.seller?.logo}
                    alt="image description"
                  />
                </figure>
                <div class="tg-authorinfo">
                  <div class="tg-authorhead">
                    <div class="tg-leftarea">
                      <div class="tg-authorname">
                        <h2>{productDetail?.seller?.info?.name}</h2>
                        <span>Phone: {productDetail?.seller?.info?.phone}</span>
                      </div>
                    </div>
                    <div class="tg-rightarea">
                      <ul class="tg-socialicons">
                        <li class="tg-facebook">
                          <a href="javascript:void(0);">
                            <i class="fa fa-facebook"></i>
                          </a>
                        </li>
                        <li class="tg-twitter">
                          <a href="javascript:void(0);">
                            <i class="fa fa-twitter"></i>
                          </a>
                        </li>
                        <li class="tg-linkedin">
                          <a href="javascript:void(0);">
                            <i class="fa fa-linkedin"></i>
                          </a>
                        </li>
                        <li class="tg-googleplus">
                          <a href="javascript:void(0);">
                            <i class="fa fa-google-plus"></i>
                          </a>
                        </li>
                        <li class="tg-rss">
                          <a href="javascript:void(0);">
                            <i class="fa fa-rss"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="tg-description">
                    <p>{productDetail?.seller?.slogan}</p>
                  </div>
                  <a
                    class="tg-btn tg-active"
                    href="javascript:void(0);"
                    onClick={() => {
                      navigate(
                        `/products/sellers=${productDetail?.seller?._id}`
                      );
                    }}
                  >
                    View All Books
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="tg-relatedproducts">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="tg-sectionhead">
                <h2>
                  <span>Related Products</span>You May Also Like
                </h2>
                <a
                  class="tg-btn"
                  href="javascript:void(0);"
                  onClick={() => {
                    navigate(
                      "/products/category=" + productDetail?.category?._id
                    );
                  }}
                >
                  View All
                </a>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <RelatedProducts categoryId={productDetail?.category?._id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
