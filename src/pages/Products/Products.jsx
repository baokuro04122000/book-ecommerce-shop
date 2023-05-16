import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  actionGetFeaturedProduct,
  actionGetProducts,
  actionGetProductsByAuthor,
} from "../../store/products/action";
import { useParams, useNavigate } from "react-router-dom";
import { setFeaturedProduct, setProducts } from "../../store/products/slice";
import ProductDetail from "./ProductDetail";
import Price from "../../components/Price/Price";
const Products = () => {
  const products = useAppSelector(({ products }) => products.products);

  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(Infinity);
  const [filterPrice, setFilterPrice] = useState('')

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { params } = useParams();
  useEffect(() => {
    switch(params?.split("=")[0]){
      case "category":
        dispatch(
          actionGetProducts(`page=1&limit=8&categoryId=${params.split("=")[1]}`+filterPrice)
        );
        break;
      case "sellers":
        dispatch(
          actionGetProducts(`page=1&limit=8&sellerId=${params.split("=")[1]}`+filterPrice)
        );
        break;
      case "author":
        dispatch(
          actionGetProductsByAuthor(
            `page=1&limit=8&author=${params.split("=")[1]}`+ filterPrice
          )
        );
        break;
      case "search":
        dispatch(
          actionGetProducts(
            `page=1&limit=8&name=${params.split("=")[1]}&author=${params.split("=")[1]}`+ filterPrice
          )
        );
        break;
      default:
        dispatch(actionGetProducts("page=1&limit=8"+filterPrice));
    }
    return () => {
      dispatch(setFeaturedProduct(null));
      dispatch(setProducts(null));
    };
  }, [dispatch, params, filterPrice]);

  const pagination = useMemo(() => {
    if (products) {
      return (
        <select
          onChange={(e) => {
            dispatch(
              actionGetProducts(
                `page=${e.target.value}&limit=8&${
                  params === "all"
                    ? filterPrice
                    : params.split("=")[0] === "category"
                    ? `categoryId=${params.split("=")[1]}`+filterPrice
                    : params.split("=")[0] === "sellers"
                    ? `sellerId=${params.split("=")[1]}`+filterPrice
                    : params
                }`
              )
            );
          }}
        >
          {Array.from(
            Array(Math.ceil((products.total ? products.total : 1) / 8)).keys(),
            (i) => i + 1
          ).map((page) => {
            return <option value={page}>{page * 8}</option>;
          })}
        </select>
      );
    }
  }, [products]);

  const hanleSubmit = () => {
    setFilterPrice(`&price[gte]=${from}&price[lte]=${to}`)
  }

  return (
    <div id="tg-content" class="tg-content">
      {params.split("=")[0] === "detail" ? (
        <ProductDetail />
      ) : (
        <div className="tg-products">
          <div className="tg-sectionhead">
            <h2>
              <span>People’s Choice</span>Bestselling Books
            </h2>
          </div>
          <div className="tg-productgrid">
            <div className="tg-refinesearch">
              <span>showing 1 to 8 of {products?.total} total</span>
              <form className="tg-formtheme tg-formsortshoitems">
                <fieldset>
                  <div
                    className="form-group"
                    style={{
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div id="navbar" class="collapse navbar-collapse">
                      <ul
                        class="nav navbar-nav navbar-right"
                        style={{
                          marginRight: "0px",
                        }}
                      >
                        <li class="dropdown">
                          <a
                            href="#"
                            class="dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            Price
                          </a>
                          <ul
                            class="dropdown-menu dropdown-lr animated slideInRight"
                            role="menu"
                            style={{
                              width: "350px",
                            }}
                          >
                            <form
                              id="ajax-login-form"
                              role="form"
                              method="post"
                              autocomplete="off"
                              class="form-inline col-lg-12 col-xs-12 col-md-12"
                              
                            >
                              <div class="form-row">
                                <label
                                  class="sr-only"
                                  for="inlineFormInputName2"
                                >
                                  From
                                </label>

                                <div class="input-group col-lg-4 col-md-4 col-xs-4">
                                  <input
                                    type="number"
                                    name="from"
                                    min={0}
                                    class="form-control"
                                    id="inlineFormInputGroupUsername2"
                                    placeholder="From"
                                    onChange={(e) => {
                                      if(e.target.value){
                                        setFrom(e.target.value)
                                      }else{
                                        setFrom(0)
                                      }

                                    }}
                                  />
                                </div>

                                <label
                                  class="sr-only"
                                  for="inlineFormInputGroupUsername2"
                                >
                                  To
                                </label>
                                <div class="input-group col-lg-4 col-md-4 col-xs-4" style={{
                                  marginLeft: '12px',
                                  marginRight: '20px'
                                }}>
                                  <input
                                    type="number"
                                    name="to"
                                    min={0}
                                    class="form-control"
                                    id="inlineFormInputGroupUsername2"
                                    placeholder="To"
                                    onChange={(e) => {
                                      if(e.target.value){
                                        setTo(e.target.value)
                                      }else{
                                        setTo(Infinity)
                                      }

                                    }}
                                  />
                                </div>
                                <div class="input-group col-lg-2 col-md-2 col-xs-2">
                                  <div
                                    class="btn btn-primary mb-2"
                                    onClick={hanleSubmit}
                                  >
                                    Apply
                                  </div>

                                </div>
                              </div>
                            </form>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>sort :</label>
                    <span className="tg-select">
                      <select>
                        <option>newest</option>
                        <option>oldest</option>
                      </select>
                    </span>
                  </div>
                  <div className="form-group">
                    <label>show:</label>
                    <span className="tg-select">{pagination}</span>
                  </div>
                </fieldset>
              </form>
            </div>
            {products?.products?.map((product) => (
              <>
                <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
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
                      <a
                        className="tg-btnaddtowishlist"
                        href="javascript:void(0);"
                      >
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
                                `/products/category=${product?.category?._id}`
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
                              navigate(`/products/detail=${product.slug}`);
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
                            navigate(
                              "/products/author=" + product.specs.author
                            );
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
                            navigate(
                              "/products/sellers=" + product.sellerId._id
                            );
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
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
