import React, { useState, useEffect } from "react";
import { getRelatedProduct } from "../../api/products";
import { useNavigate } from "react-router-dom";
import Price from "../../components/Price/Price";
import Carousel from "react-multi-carousel";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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

const RelatedProducts = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (categoryId) {
      getRelatedProduct(categoryId)
        .then(({ data }) => {
          setProducts(data.data);
        })
        .catch((err) => {
          console.log("err::", err);
        });
    }
  }, [categoryId]);
  return (
    <>
      <div
        id="tg-relatedproductslider"
        class="tg-relatedproductslider tg-relatedbooks"
      >
        {products.length > 0 ? (
          <Carousel
            ssr
            partialVisbile
            itemClass="image-item"
            responsive={responsive}
          >
            {products?.map((product) => (
              <React.Fragment key={product._id}>
                <div class="item">
                  <div class="tg-postbook">
                    <figure class="tg-featureimg">
                      <div class="tg-bookimg">
                        <div class="tg-frontcover">
                          <img
                            src={product.productPictures[0]}
                            alt="image description"
                          />
                        </div>
                        <div class="tg-backcover">
                          <img
                            src={product.productPictures[0]}
                            alt="image description"
                          />
                        </div>
                      </div>
                      <a class="tg-btnaddtowishlist" href="javascript:void(0);">
                        <i class="icon-heart"></i>
                        <span>add to wishlist</span>
                      </a>
                    </figure>
                    <div class="tg-postbookcontent">
                      <ul class="tg-bookscategories">
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
                      <div class="tg-themetagbox">
                        <span class="tg-themetag">sale</span>
                      </div>
                      <div class="tg-booktitle">
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
                      <span class="tg-bookwriter">
                        By:{" "}
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            navigate(
                              "/products/author=" + product?.specs.author
                            );
                          }}
                        >
                          {product.specs.author}
                        </a>
                      </span>
                      <span class="tg-bookwriter">
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
                      <span class="tg-stars">
                        <span></span>
                      </span>
                      <span class="tg-bookprice">
                        <Price product={product} />
                      </span>
                      <a
                        class="tg-btn tg-btnstyletwo"
                        href="javascript:void(0);"
                      >
                        <i class="fa fa-shopping-basket"></i>
                        <em>Add To Basket</em>
                      </a>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </Carousel>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default RelatedProducts;
