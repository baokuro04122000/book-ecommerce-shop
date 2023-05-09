import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  actionGetFeaturedProduct,
  actionGetProducts,
} from "../../store/products/action";
import { useParams, useNavigate } from "react-router-dom";
import { setFeaturedProduct, setProducts } from "../../store/products/slice";
import { calDiscount } from "../../helpers/utils";
import ProductDetail from "./ProductDetail";
import Price from "../../components/Price/Price";
const Products = () => {
  const featured = useAppSelector(({ products }) => products.featuredProduct);
  const products = useAppSelector(({ products }) => products.products);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {params} = useParams();

  useEffect(() => {
    if(params.split('=')[0] === 'category'){
      dispatch(actionGetProducts(`page=1&limit=8&categoryId=${params.split('=')[1]}`))
    }else{
      dispatch(actionGetProducts("page=1&limit=8"));
    }
    dispatch(actionGetFeaturedProduct());
    return () => {
      dispatch(setFeaturedProduct(null));
      dispatch(setProducts(null));
    };
  }, [dispatch, params]);
  return (
    <div id="tg-content" class="tg-content">
      {params.split('=')[0] === 'detail' ? (
        <ProductDetail/>
      ) : (
        
        <div className="tg-products">
          <div className="tg-sectionhead">
            <h2>
              <span>People’s Choice</span>Bestselling Books
            </h2>
          </div>
          <div className="tg-featurebook alert" role="alert">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="tg-featureditm">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 hidden-sm hidden-xs hidden-md">
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
                        <a href="javascript:void(0);" onClick = {() => {
                          navigate(`/products/detail=${featured.slug}`)
                        }}>{featured?.name}</a>
                      </h3>
                    </div>
                    <span className="tg-bookwriter">
                      By:{" "}
                      <a href="javascript:void(0);">{featured?.specs.author}</a>
                    </span>
                    <span className="tg-stars">
                      <span></span>
                    </span>
                    <div className="tg-priceandbtn">
                      <span className="tg-bookprice">
                        <Price product={featured}/>
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
          <div className="tg-productgrid">
            <div className="tg-refinesearch">
              <span>showing 1 to 8 of 20 total</span>
              <form className="tg-formtheme tg-formsortshoitems">
                <fieldset>
                  <div className="form-group">
                    <label>sort by:</label>
                    <span className="tg-select">
                      <select>
                        <option>name</option>
                        <option>name</option>
                        <option>name</option>
                      </select>
                    </span>
                  </div>
                  <div className="form-group">
                    <label>show:</label>
                    <span className="tg-select">
                      <select>
                        <option>8</option>
                        <option>16</option>
                        <option>20</option>
                      </select>
                    </span>
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
                          <a href="javascript:void(0);" onClick = {() => {
                          navigate(`/products/category=${product?.category?._id}`)
                        }}>
                            {product.category.name}
                          </a>
                        </li>
                      </ul>
                      <div className="tg-themetagbox">
                        <span className="tg-themetag">sale</span>
                      </div>
                      <div className="tg-booktitle">
                        <h3>
                          <a href="javascript:void(0);" onClick = {() => {
                          navigate(`/products/detail=${product.slug}`)
                        }}>{product.name}</a>
                        </h3>
                      </div>
                      <span className="tg-bookwriter">
                        By:{" "}
                        <a href="javascript:void(0);">{product.specs.author}</a>
                      </span>
                      <span className="tg-stars">
                        <span></span>
                      </span>
                      <span className="tg-bookprice">
                        <Price product={product}/>
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
      ) }
    </div>
  );
};

export default Products;
