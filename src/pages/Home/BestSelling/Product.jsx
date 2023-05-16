import { useAppSelector, useAppDispatch } from "../../../store/index";
import { calDiscount } from "../../../helpers/utils";
import { useEffect } from "react";
import { actionGetBestSelling } from "../../../store/products/action";
import { setBestSelling } from "../../../store/products/slice";
import Price from "../../../components/Price/Price";
import Carousel from "react-multi-carousel";
import { useNavigate, useParams } from "react-router-dom";
export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    paritialVisibilityGutter: 30,
  },
};
const Product = () => {
  const bestSelling = useAppSelector(({ products }) => products.bestSelling);

  const dispatch = useAppDispatch();
  const { params } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(actionGetBestSelling());
    return () => {
      dispatch(setBestSelling(null));
    };
  }, [dispatch, params]);

  return (
    <>
      {bestSelling?.length > 0 ? (
        <Carousel
          ssr
          partialVisbile
          itemClass="image-item"
          responsive={responsive}
        >
          {bestSelling?.map((product) => (
            <div className="item">
              <div className="tg-postbook">
                <figure className="tg-featureimg">
                  <div className="tg-bookimg">
                    <div className="tg-frontcover">
                      <img
                        src={product.productPictures[0]}
                        alt="image description"
                      />
                    </div>
                    <div className="tg-backcover">
                      <img
                        src={product.productPictures[0]}
                        alt="image description"
                      />
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
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          navigate(
                            "/products/category=" + product.category._id
                          );
                        }}
                      >
                        {product.category.name}
                      </a>
                    </li>
                  </ul>
                  <div className="tg-themetagbox">
                    <span className="tg-themetag">sale</span>
                  </div>
                  <div className="tg-booktitle">
                    <h3>
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          navigate("/products/detail=" + product.slug);
                        }}
                      >
                        {product.name}
                      </a>
                    </h3>
                  </div>
                  <span className="tg-bookwriter">
                    By:{" "}
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        navigate("/products/author=" + product.specs.author);
                      }}
                    >
                      {product.specs.author}
                    </a>
                  </span>
                  <span className="tg-bookwriter">
                    Seller:{" "}
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        navigate("/products/sellers=" + product.sellerId._id);
                      }}
                    >
                      {product.sellerId.info.name}
                    </a>
                  </span>
                  <span className="tg-stars">
                    <span></span>
                  </span>
                  <span className="tg-bookprice">
                    <Price product={product} />
                  </span>
                  <a
                    className="tg-btn tg-btnstyletwo"
                    href="javascript:void(0);"
                  >
                    <i className="fa fa-shopping-basket"></i>
                    <em>Add To Basket</em>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <></>
      )}
    </>
  );
};

export default Product;
