import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setNewReleaseBook } from "../../../store/products/slice";
import { actionGetNewReleaseBook } from "../../../store/products/action";
import { useNavigate } from "react-router-dom";
const NewRelease = () => {
  const newRelease = useAppSelector(({ products }) => products.newReleaseBook);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      actionGetNewReleaseBook({
        page: 1,
        limit: 3,
      })
    );
    return () => {
      setNewReleaseBook(null);
    };
  }, [dispatch]);
  return (
    <section className="tg-sectionspace tg-haslayout">
      <div className="container">
        <div className="row">
          <div className="tg-newrelease">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <div className="tg-sectionhead">
                <h2>
                  <span>Taste The New Spice</span>New Release Books
                </h2>
              </div>
              <div className="tg-description">
                <p>
                  Step into a world of adventure and intrigue with the newest
                  addition to our bookshop - Ebook and PaperBack, an enthralling
                  tale that will transport you to another time and place, and
                  keep you hooked until the very last page; written by the
                  talented [author name], this thrilling novel promises to be a
                  must-read for fans of [genre] and beyond, so come and grab
                  your copy today, and lose yourself in the captivating story
                  that everyone is talking about!
                </p>
              </div>
              <div className="tg-btns">
                <a
                  className="tg-btn tg-active"
                  href="javascript:void(0);"
                  onClick={() => {
                    navigate("/products/all");
                  }}
                >
                  View All
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <div className="row">
                <div className="tg-newreleasebooks">
                  {newRelease?.map((product) => (
                    <>
                      <div className="col-xs-4 col-sm-4 col-md-6 col-lg-4">
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
                                <a href="javascript:void(0);">
                                  {product.category.name}
                                </a>
                              </li>
                            </ul>
                            <div className="tg-booktitle">
                              <h3>
                                <a href="javascript:void(0);">{product.name}</a>
                              </h3>
                            </div>
                            <span className="tg-bookwriter">
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
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewRelease;
