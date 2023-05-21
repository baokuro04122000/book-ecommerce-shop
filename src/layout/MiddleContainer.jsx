import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { actionSearchList } from "../store/products/action";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../api/products";
import {
  actionAddToCart,
  actionDeleteAllCarts,
  actionDeleteItemCart,
  actionGetCart,
} from "../store/cart/action";
import { setCarts } from "../store/cart/slice";
import { calDiscount, calPriceItemCart, subtotal } from "../helpers/utils";
import { toast } from "react-toastify";
import { addToCart } from "../api/cart";
const MiddleContainer = () => {
  const navigate = useNavigate();

  const cart = useAppSelector(({ cart }) => cart.carts);

  const dispatch = useAppDispatch();
  const [searchList, setSearchList] = useState([]);
  const [saveSubtotalState, setSaveSubtotalState] = useState(null);
  const [saveQuantity, setSaveQuantity] = useState({});
  const [savePrice, setSavePrice] = useState({});
  const [open, setOpen] = useState(false);
  const [saveCartItemSelected, setSaveCartItemSelected] = useState([]);
  useEffect(() => {
    dispatch(actionGetCart());
    return () => {
      dispatch(setCarts(null));
      handleUpdateCartItem();
    };
  }, [dispatch]);

  const handleChangeSearch = async (e) => {
    if (e.target.value) {
      const { data } = await searchProducts(e.target.value);
      setSearchList(data.data);
    }
  };

  const handleDeleteItemCart = (cartItem) => {
    handleUpdateCartItem();
    actionDeleteItemCart({
      productId: cartItem?.product._id,
      variantId: cartItem.variant,
    })
      .then((message) => {
        dispatch(actionGetCart());
        toast.success(message, { autoClose: 3000 });
      })
      .catch((err) => {
        toast.error(err.errors.message, { autoClose: 5000 });
      });
  };

  const handleDeleteAllCarts = () => {
    handleUpdateCartItem();
    actionDeleteAllCarts()
      .then((message) => {
        dispatch(actionGetCart());
        toast.success(message, { autoClose: 3000 });
      })
      .catch((err) => {
        toast.error(err?.errors?.message, { autoClose: 5000 });
      });
  };

  const handlePlusQuantity = (cartItem, defaultPrice) => {
    const qty = Number(cartItem?.quantity) + 1;
    if (saveQuantity[cartItem?._id]) {
      if (Number(saveQuantity[cartItem?._id].quantity) >= 10) {
        return;
      }
      setSaveQuantity((pre) => {
        pre[cartItem?._id] = {
          quantity: Number(pre[cartItem?._id].quantity) + 1,
          variant: cartItem?.variant,
          product: cartItem?.product?._id,
        };
        return pre;
      });
      setSavePrice((pre) => {
        pre[cartItem?._id] = Number(
          (pre[cartItem?._id] + defaultPrice).toFixed(2)
        );
        return pre;
      });
    } else {
      if (Number(cartItem?.quantity) >= 10) {
        return;
      }
      setSaveQuantity((pre) => {
        pre[cartItem?._id] = {
          quantity: Number(qty),
          variant: cartItem?.variant,
          product: cartItem?.product?._id,
        };
        return pre;
      });
      setSavePrice((pre) => {
        pre[cartItem?._id] = Number((defaultPrice * qty).toFixed(2));
        return pre;
      });
    }

    if (saveSubtotalState) {
      setSaveSubtotalState((pre) => Number(pre) + Number(defaultPrice));
    } else {
      const total = Number(subtotal(cart?.cartItems)) + Number(defaultPrice);
      setSaveSubtotalState(Number(total.toFixed(2)));
    }
  };

  const handleMinusQuantity = (cartItem, defaultPrice) => {
    const qty = Number(cartItem?.quantity) - 1;
    if (saveQuantity[cartItem?._id]) {
      if (Number(saveQuantity[cartItem?._id].quantity) <= 1) {
        return;
      }
      setSaveQuantity((pre) => {
        pre[cartItem?._id] = {
          quantity: Number(pre[cartItem?._id].quantity) - 1,
          variant: cartItem?.variant,
          product: cartItem?.product?._id,
        };
        return pre;
      });
      setSavePrice((pre) => {
        pre[cartItem?._id] = Number(
          (pre[cartItem?._id] - defaultPrice).toFixed(2)
        );
        return pre;
      });
    } else {
      if (Number(cartItem?.quantity) <= 1) {
        return;
      }
      setSaveQuantity((pre) => {
        pre[cartItem?._id] = {
          quantity: Number(qty),
          variant: cartItem?.variant,
          product: cartItem?.product?._id,
        };
        return pre;
      });
      setSavePrice((pre) => {
        pre[cartItem?._id] = Number((defaultPrice * qty).toFixed(2));
        return pre;
      });
    }

    if (saveSubtotalState) {
      setSaveSubtotalState((pre) => Number(pre) - Number(defaultPrice));
    } else {
      const total = Number(subtotal(cart?.cartItems)) - Number(defaultPrice);
      setSaveSubtotalState(Number(total.toFixed(2)));
    }
  };

  const handleUpdateCartItem = async () => {
    if (Object.keys(saveQuantity).length) {
      try {
        await Promise.all(
          Object.entries(saveQuantity).map((item) => {
            return addToCart({
              product: item[1].product,
              variant: item[1].variant,
              quantity: item[1].quantity,
              wishlist: false,
            });
          })
        );
        setSaveQuantity({});
        dispatch(actionGetCart());
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleCheckOut = () => {
    localStorage.setItem(
      "orderList",
      JSON.stringify(saveCartItemSelected.toString())
    );
    navigate("/checkout/process");
  };
  return (
    <div className="tg-middlecontainer">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <strong className="tg-logo">
              <a href="index-2.html">
                <img src="/images/logo.png" alt="company name here" />
              </a>
            </strong>
            <div className="tg-wishlistandcart">
              <div className="dropdown tg-themedropdown tg-wishlistdropdown">
                <a
                  href="javascript:void(0);"
                  id="tg-wishlisst"
                  className="tg-btnthemedropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="tg-themebadge">3</span>
                  <i className="icon-heart"></i>
                  <span>Wishlist</span>
                </a>
                <div
                  className="dropdown-menu tg-themedropdownmenu"
                  aria-labelledby="tg-wishlisst"
                >
                  <div className="tg-description">
                    <p>No products were added to the wishlist!</p>
                  </div>
                </div>
              </div>
              <div
                className={`dropdown tg-themedropdown tg-minicartdropdown ${
                  open ? "open" : ""
                }`}
              >
                <a
                  href="javascript:void(0);"
                  id="tg-minicart"
                  className="tg-btnthemedropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={() => {
                    handleUpdateCartItem();
                    setOpen((pre) => !pre);
                  }}
                >
                  <span className="tg-themebadge">
                    {cart?.cartItems?.length}
                  </span>
                  <i className="icon-cart"></i>
                  <span>
                    $
                    {saveSubtotalState
                      ? Number(saveSubtotalState).toFixed(2)
                      : subtotal(cart?.cartItems)}
                  </span>
                </a>
                <div
                  className="dropdown-menu tg-themedropdownmenu"
                  aria-labelledby="tg-minicart"
                  style={{
                    minWidth: "550px",
                    maxHeight: "500px",
                    overflowY: "auto",
                  }}
                >
                  <div className="tg-minicartbody">
                    {cart?.cartItems?.map((cartItem) => (
                      <>
                        <div className="tg-minicarproduct row">
                          <div className="col-lg-1 col-md-1 col-sx-1">
                            <input
                              type="checkbox"
                              value={cartItem?._id}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSaveCartItemSelected((pre) => {
                                    pre.push(e.target.value);
                                    return pre;
                                  });
                                } else {
                                  setSaveCartItemSelected((pre) =>
                                    pre.filter((val) => val !== e.target.value)
                                  );
                                }
                              }}
                              aria-label="..."
                            />
                          </div>
                          <figure
                            class="col-lg-3 col-md-3 col-xs-3"
                            style={{ margin: 0 }}
                          >
                            <img
                              src={cartItem?.product?.productPictures}
                              alt="image description"
                            />
                          </figure>
                          <div
                            className="tg-minicarproductdata col-lg-3 col-md-3 col-sx-3"
                            style={{
                              maxWidth: "50%",
                              width: "34%",
                            }}
                          >
                            <h5>
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  navigate(
                                    "/products/detail=" +
                                      cartItem?.product?.slug
                                  );
                                }}
                              >
                                {cartItem?.product?.name}
                              </a>
                            </h5>
                            <h5>
                              Variant:{" "}
                              {cartItem?.product?.variants?.find(
                                (variant) => variant._id === cartItem?.variant
                              ).type === "paperBack"
                                ? "HardBook"
                                : "E-Book"}
                            </h5>
                            <h5>
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  navigate(
                                    "/products/author=" +
                                      cartItem?.product?.specs?.author
                                  );
                                }}
                              >
                                Author: {cartItem?.product?.specs?.author}
                              </a>
                            </h5>
                            <h5>
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  navigate(
                                    "/products/sellers=" +
                                      cartItem?.product?.seller?._id
                                  );
                                }}
                              >
                                Seller: {cartItem?.product?.seller?.info.name}
                              </a>
                            </h5>

                            <h6>
                              <a
                                href="javascript:void(0);"
                                data-cartitem-price={cartItem?._id}
                              >
                                ${" "}
                                {savePrice[cartItem?._id]
                                  ? Number(savePrice[cartItem?._id]).toFixed(2)
                                  : calPriceItemCart(cartItem)}
                              </a>
                            </h6>
                          </div>
                          <div
                            class="col-md-3 col-lg-3 col-sx-3"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginTop: "10px",
                              placeContent: "flex-start",
                            }}
                          >
                            <button
                              class="btn btn-link px-2"
                              onClick={() => {
                                handleMinusQuantity(
                                  cartItem,
                                  calDiscount(
                                    cartItem?.product?.variants?.find(
                                      (variant) =>
                                        variant?._id === cartItem?.variant
                                    ).price,
                                    cartItem?.product?.variants?.find(
                                      (variant) =>
                                        variant?._id === cartItem?.variant
                                    ).discount
                                  )
                                );
                              }}
                            >
                              <i class="fa fa-minus"></i>
                            </button>
                            <input
                              disabled={true}
                              data-cartitem-quantity={cartItem?._id}
                              id="form1"
                              min="0"
                              max="100"
                              name="quantity"
                              value={
                                saveQuantity[cartItem?._id]
                                  ? saveQuantity[cartItem?._id].quantity
                                  : cartItem?.quantity
                              }
                              type="number"
                              style={{ width: "68px" }}
                            />
                            <button
                              class="btn btn-link px-2"
                              onClick={() => {
                                handlePlusQuantity(
                                  cartItem,
                                  calDiscount(
                                    cartItem?.product?.variants?.find(
                                      (variant) =>
                                        variant?._id === cartItem?.variant
                                    ).price,
                                    cartItem?.product?.variants?.find(
                                      (variant) =>
                                        variant?._id === cartItem?.variant
                                    ).discount
                                  )
                                );
                              }}
                            >
                              <i class="fa fa-plus"></i>
                            </button>
                            <button
                              class="btn btn-link px-2"
                              style={{
                                paddingRight: "16px",
                              }}
                              onClick={() => {
                                handleDeleteItemCart(cartItem);
                              }}
                            >
                              <i
                                class="fa fa-trash-o"
                                style={{ fontSize: "24px" }}
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="tg-minicartfoot">
                    <a
                      className="tg-btnemptycart"
                      href="javascript:void(0);"
                      onClick={handleDeleteAllCarts}
                    >
                      <i className="fa fa-trash-o"></i>
                      <span>Clear Your Cart</span>
                    </a>
                    <span className="tg-subtotal">
                      Subtotal:{" "}
                      <strong>
                        $
                        {saveSubtotalState
                          ? Number(saveSubtotalState).toFixed(2)
                          : subtotal(cart?.cartItems)}
                      </strong>
                    </span>
                    <div
                      className="tg-btns"
                      style={{
                        marginTop: "18px",
                      }}
                    >
                      <a className="tg-btn" href="javascript:void(0);"></a>
                      <a
                        className="tg-btn"
                        href="javascript:void(0);"
                        onClick={handleCheckOut}
                      >
                        Checkout
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`dropdown tg-themedropdown tg-minicartdropdown`}>
                <a
                  href="javascript:void(0);"
                  id="tg-minicart"
                  className="tg-btnthemedropdown dropdown-toggle"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-toggle="dropdown"
                  onClick={() => {}}
                >
                  <i class="fa fa-th" aria-hidden="true"></i>
                </a>
                <div
                  className="dropdown-menu tg-themedropdownmenu"
                  aria-labelledby="tg-minicart"
                  style={{
                    width: "100px",
                  }}
                >
                  <div className="tg-minicartbody" style={{
                    paddingLeft: '16px'
                  }}>
                    <>
                      <div className="tg-minicarproduct row">
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            navigate("/checkout/orders");
                          }}
                        >
                          All orders
                        </a>
                      </div>
                      <div className="tg-minicarproduct row">
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            navigate("/checkout/ordered");
                          }}
                        >
                          All ordered (wait confirm)
                        </a>
                      </div>
                      <div className="tg-minicarproduct row">
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            navigate("/checkout/packed");
                          }}
                        >
                          All packed
                        </a>
                      </div>
                      <div className="tg-minicarproduct row">
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            navigate("/checkout/delivered");
                          }}
                        >
                          All delivered
                        </a>
                      </div>
                      <div className="tg-minicarproduct row">
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            navigate("/checkout/cancelled");
                          }}
                        >
                          All cancelled
                        </a>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
            <div className="tg-searchbox">
              <form className="tg-formtheme tg-formsearch">
                <fieldset>
                  <li
                    className="menu-item-has-children"
                    style={{
                      listStyleType: "none",
                    }}
                  >
                    <a href="javascript:void(0);"></a>
                    <input
                      type="text"
                      name="search"
                      onChange={handleChangeSearch}
                      className="typeahead form-control"
                      placeholder="Search by category, name, author, seller..."
                    />
                    <ul
                      className="sub-menu"
                      style={{
                        width: "100%",
                        marginTop: "2px",
                      }}
                    >
                      {searchList?.length > 0 ? (
                        <>
                          {searchList.map((result) => {
                            return (
                              <>
                                {result.type === "category" ? (
                                  <>
                                    <li
                                      className="custom-search-list"
                                      onClick={() => {
                                        navigate(
                                          "/products/category=" + result._id
                                        );
                                      }}
                                    >
                                      <a href="javascript:void(0);">
                                        Category: {result.name}
                                      </a>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {result.type === "seller" ? (
                                  <>
                                    <li
                                      className="custom-search-list"
                                      onClick={() => {
                                        navigate(
                                          "/products/sellers=" + result._id
                                        );
                                      }}
                                    >
                                      <a href="javascript:void(0);">
                                        Seller: {result.info.name}
                                      </a>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {result.type === "author" ? (
                                  <>
                                    <li
                                      className="custom-search-list"
                                      onClick={() => {
                                        navigate(
                                          "/products/author=" + result.author
                                        );
                                      }}
                                    >
                                      <a href="javascript:void(0);">
                                        Author: {result.author}
                                      </a>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {result.type === "product" ? (
                                  <>
                                    <li
                                      className="custom-search-list"
                                      onClick={() => {
                                        navigate(
                                          "/products/detail=" + result.slug
                                        );
                                      }}
                                    >
                                      <a href="javascript:void(0);">
                                        Product: {result.name}
                                      </a>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        <li
                          style={{
                            listStyleType: "none",
                          }}
                        >
                          <div>Not Found</div>
                        </li>
                      )}
                    </ul>
                  </li>
                  <button type="submit">
                    <i className="icon-magnifier"></i>
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleContainer;
