import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { actionGetCart } from "../../store/cart/action";
import { setCarts } from "../../store/cart/slice";
import { useNavigate } from "react-router-dom";
import { calDiscount, calPriceItemCart, subtotal } from "../../helpers/utils";

import { getDeliveryInfo } from "../../api/order";
import {
  actionAddDeliveryInfo,
  actionAddOrder,
  actionCheckStatusPayment,
  actionRemoveDeliveryInfo,
  actionSetDefaultDeliveryInfo,
  actionUpdateDeliveryInfo,
} from "../../store/order/action";
import { toast } from "react-toastify";

const Checkout = () => {
  const carts = useAppSelector(({ cart }) => cart.carts);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [deleteItem, setDeleteItem] = useState(false);
  const [saveSubtotalState, setSaveSubtotalState] = useState(null);
  const [saveQuantity, setSaveQuantity] = useState({});
  const [savePrice, setSavePrice] = useState({});
  const [address, setAddress] = useState(null);
  const [showFormAdressNewBie, setShowFormAddressNewBie] = useState(false);

  const [nameShip, setNameShip] = useState("");
  const [phoneNumberShip, setPhoneNumberShip] = useState("");
  const [addressShip, setAddressShip] = useState("");
  const [zipCodeShip, setZipCodeShip] = useState("");
  const [edit, setEdit] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  useEffect(() => {
    dispatch(actionGetCart());
    handleGetAddress();
    return () => {
      dispatch(setCarts(null));
    };
  }, [dispatch]);

  const handleGetAddress = () => {
    getDeliveryInfo()
      .then(({ data }) => setAddress(data.data))
      .catch((err) => {
        if (err.response.status === 404) {
          setShowFormAddressNewBie(true);
        }
      });
  };

  const cartItems = useMemo(() => {
    if (carts?.cartItems?.length > 0) {
      const data = JSON.stringify(localStorage.getItem("orderList"));
      const orderList = JSON.parse(data);
      if (orderList?.length === 0) {
        return carts.cartItems;
      }
      let items = [];
      carts.cartItems.forEach((cartItem) => {
        if (orderList?.includes(cartItem._id)) {
          items.push(cartItem);
        }
      });
      return items;
    }
    return [];
  }, [carts, deleteItem]);

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
      const total = Number(subtotal(cartItems)) + Number(defaultPrice);
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
      const total = Number(subtotal(cartItems)) - Number(defaultPrice);
      setSaveSubtotalState(Number(total.toFixed(2)));
    }
  };

  const handleDeleteItemCart = (cartItem) => {
    const data = JSON.stringify(localStorage.getItem("orderList"));
    const orderList = JSON.parse(data);
    if (orderList?.length > 0) {
      console.log("test::", orderList.replace('"', "").split(","));
      console.log(typeof orderList);
      const save = orderList
        .replace('"', "")
        .split(",")
        .filter((val) => val !== cartItem?._id);
      console.log("check::", save);

      localStorage.setItem("orderList", save);
      if (saveQuantity[cartItem._id]) {
        const temp = { ...saveQuantity };
        delete temp[cartItem?._id];
        setSaveQuantity(temp);

        const price = Number(savePrice[cartItem?._id]);
        const tempPrice = { ...savePrice };
        delete tempPrice[cartItem?._id];
        setSavePrice(tempPrice);

        setSaveSubtotalState((pre) => Number(Number(pre - price).toFixed(2)));
      } else {
        setSaveSubtotalState(
          Number(
            Number(subtotal(cartItems) - calPriceItemCart(cartItem)).toFixed(2)
          )
        );
      }
    }
  };

  const handleDeleteAddress = (addressId) => {
    actionRemoveDeliveryInfo(addressId)
      .then((message) => {
        toast.success(message, { autoClose: 3000 });
        handleGetAddress();
      })
      .catch((err) => toast.error(err.errors.message, { autoClose: 5000 }));
  };

  const handleEditAddress = () => {
    if (!nameShip || !phoneNumberShip || !addressShip || !zipCodeShip) {
      toast.warning("Please fill all field!");
    } else {
      if (edit) {
        actionUpdateDeliveryInfo(addressId, {
          address: {
            name: nameShip,
            zipCode: zipCodeShip,
            phoneNumber: phoneNumberShip,
            address: addressShip,
            addressCode: {
              district: 1,
              province: 3,
              ward: 2,
              street: 222,
            },
            code: 1,
          },
        })
          .then((message) => {
            toast.success(message, { autoClose: 3000 });
            handleGetAddress();
            setShowFormAddressNewBie(false);
            setEdit(false);
          })
          .catch((err) => {
            console.log("err::", err);
            toast.error(err?.errors?.message);
          });
      } else {
        actionAddDeliveryInfo({
          address: {
            name: nameShip,
            zipCode: zipCodeShip,
            phoneNumber: phoneNumberShip,
            address: addressShip,
            addressCode: {
              district: 1,
              province: 3,
              ward: 2,
              street: 222,
            },
            code: 1,
          },
        })
          .then((message) => {
            toast.success(message, { autoClose: 3000 });
            handleGetAddress();
            setShowFormAddressNewBie(false);
            setEdit(false);
          })
          .catch((err) => {
            console.log("check:::", err);
            toast.error(err?.errors?.message);
          });
      }
    }
  };

  const handleSetDefault = (item) => {
    if (item?.isDefault) {
      toast.warning("Address is default, please choose another address!", {
        autoClose: 3000,
      });
    } else {
      actionSetDefaultDeliveryInfo(item._id)
        .then((message) => {
          toast.success(message, { autoClose: 3000 });
          handleGetAddress();
        })
        .catch((err) => {
          toast.error(err?.errors?.message, { autoClose: 5000 });
        });
    }
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleAddOrder = () => {
    const items = cartItems.map((cartItem) => {
      if (saveQuantity[cartItem._id]) {
        return {
          productId: cartItem.product._id,
          variant: cartItem.variant,
          quantity: saveQuantity[cartItem._id].quantity,
          shippingCode: 1,
        };
      }

      return {
        productId: cartItem.product._id,
        variant: cartItem.variant,
        quantity: cartItem.quantity,
        shippingCode: 1,
      };
    });


    const addressId = address.address.find((ele) => ele.isDefault);
    if (!addressId) {
      toast.warning("Please choose shipping address!");
      return;
    }

    if (paymentMethod === "paypal") {
      actionAddOrder({
        addressId: addressId._id,
        paymentType: "paypal",
        items: items,
      }).then((data) => {
        openInNewTab(data.data.link);
        setTimeout(() => {
          actionCheckStatusPayment(data.data.payId)
            .then((res) => {
              if (res.data.paymentStatus === "cancelled") {
                toast.warning(
                  "Your order is canceled, because payment had been failed!",
                  { autoClose: 5000 }
                );
                navigate("/");
              }
              if (res.data.paymentStatus === "completed") {
                toast.success(
                  "Thank for your order!, web had been send a notify to your email!",
                  { autoClose: 5000 }
                );
                navigate("/");
              }
              if (res.data.paymentStatus === "pending") {
                toast.warning(
                  "Your order is canceled, because payment processing is timeout!",
                  { autoClose: 5000 }
                );
                navigate("/");
              }
            })
            .catch((err) =>
              toast.error(err?.errors?.message, { autoClose: 5000 })
            );
        }, 120000);
        setTimeout(() => {
          actionCheckStatusPayment(data.data.payId)
            .then((res) => {
              if (res.data.paymentStatus === "completed") {
                toast.success(
                  "Thank for your order!, web had been send a notify to your email!",
                  { autoClose: 5000 }
                );
                navigate("/");
              }
            })
            .catch((err) =>
              toast.error(err?.errors?.message, { autoClose: 5000 })
            );
        }, 60000);
      });
    } else {
      actionAddOrder({
        addressId: addressId._id,
        paymentType: paymentMethod,
        items: items,
      })
        .then((message) => {
          toast.success(
            "Thank for your order!, web had been send a notify to your email!",
            { autoClose: 5000 }
          );
          navigate("/");
        })
        .catch((err) => {
          toast.error(err?.errors?.message, { autoClose: 5000 });
        });
    }
  };
  return (
    <>
      <section class="content-checkout">
        <div class="container-checkout row">
          <div class="col-lg-6 col-md-6 col-sx-6">
            <div
              className={`dropdown tg-themedropdown tg-minicartdropdown open`}
              style={{
                position: "relative",
                padding: "0",
                boxShadow: "none",
                margin: "0",
                zIndex: 0,
              }}
            >
              <div
                className="dropdown-menu tg-themedropdownmenu"
                aria-labelledby="tg-minicart"
                style={{
                  position: "relative",
                  minWidth: "550px",
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              >
                <div className="tg-minicartbody">
                  <>
                    {cartItems?.map((cartItem) => (
                      <>
                        <div className="tg-minicarproduct row">
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
                                setDeleteItem((pre) => !pre);
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
                  </>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-lg-6 col-md-6 col-sx-6"
            style={{
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <div class="Yorder">
              <table>
                <tr>
                  <th colspan="2">Your order</th>
                </tr>
                {cartItems?.map((cartItem) => (
                  <>
                    <tr>
                      <td>
                        {cartItem?.product?.name} x{" "}
                        {saveQuantity[cartItem?._id]
                          ? saveQuantity[cartItem?._id].quantity
                          : cartItem?.quantity}
                        (Qty)
                      </td>
                      <td>
                        $
                        {savePrice[cartItem?._id]
                          ? savePrice[cartItem?._id].quantity
                          : calPriceItemCart(cartItem)}
                      </td>
                    </tr>
                  </>
                ))}

                <tr>
                  <td>Shipping</td>
                  <td>Free shipping</td>
                </tr>
                <tr>
                  <td>Subtotal</td>
                  <td>
                    $
                    {saveSubtotalState
                      ? saveSubtotalState
                      : subtotal(cartItems)}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <div class="container-checkout">
          <div class="payment-checkout">
            <div class="payment__title-checkout">Payment Method</div>
            <div class="payment__types-checkout">
              <div
                class={`payment__type-checkout payment__type--cc-checkout ${
                  paymentMethod === "CREDIT_CARD" ? "active" : ""
                }`}
                onClick={() => {
                  setPaymentMethod("CREDIT_CARD");
                }}
              >
                <i class="icon-checkout icon-credit-card-checkout"></i>Credit
                Card
              </div>
              <div
                class={`payment__type-checkout payment__type--paypal-checkout ${
                  paymentMethod === "paypal" ? "active" : ""
                }`}
                onClick={() => {
                  setPaymentMethod("paypal");
                }}
              >
                <i class="icon icon-paypal"></i>Paypal
              </div>

              <div
                class={`payment__type-checkout payment__type--paypal ${
                  paymentMethod === "cod" ? "active" : ""
                }`}
                onClick={() => {
                  setPaymentMethod("cod");
                }}
              >
                <i class="icon icon-note"></i>COD
              </div>
            </div>

            <div class="payment__info">
              {paymentMethod === "CREDIT_CARD" ? (
                <>
                  <div class="payment__cc">
                    <div class="payment__title">
                      <i class="icon icon-user"></i>Personal Information
                    </div>
                    <form>
                      <div class="form__cc">
                        <div class="row-checkout">
                          <div class="field-checkout">
                            <div class="title-checkout">Credit Card Number</div>
                            <input
                              type="text"
                              class="input-checkout txt-checkout text-validated-checkout"
                            />
                          </div>
                          <div class="field-checkout">
                            <div class="title-checkout">Name on Card</div>
                            <input
                              type="text"
                              class="input-checkout txt-checkout"
                            />
                          </div>
                        </div>
                        <div class="row-checkout">
                          <div class="field-checkout small-checkout">
                            <div class="title-checkout">Expiry Date</div>
                            <select class="input-checkout ddl-checkout">
                              <option selected>01</option>
                              <option>02</option>
                              <option>03</option>
                              <option>04</option>
                              <option>05</option>
                              <option>06</option>
                              <option>07</option>
                              <option>08</option>
                              <option>09</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                            </select>
                            <select class="input-checkout ddl-checkout">
                              <option>01</option>
                              <option>02</option>
                              <option>03</option>
                              <option>04</option>
                              <option>05</option>
                              <option>06</option>
                              <option>07</option>
                              <option>08</option>
                              <option>09</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                              <option>13</option>
                              <option>14</option>
                              <option>15</option>
                              <option selected>16</option>
                              <option>17</option>
                              <option>18</option>
                              <option>19</option>
                              <option>20</option>
                              <option>21</option>
                              <option>22</option>
                              <option>23</option>
                              <option>24</option>
                              <option>25</option>
                              <option>26</option>
                              <option>27</option>
                              <option>28</option>
                              <option>29</option>
                              <option>30</option>
                              <option>31</option>
                            </select>
                          </div>
                          <div class="field-checkout small-checkout">
                            <div class="title-checkout">
                              CVV Code
                              <span class="numberCircle">?</span>
                            </div>
                            <input
                              type="text"
                              class="input-checkout txt-checkout"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <></>
              )}
              <div class="payment__shipping-checkout">
                <div class="payment__title-checkout">
                  <div
                    style={{
                      width: "174px",
                    }}
                  >
                    <i class="icon icon-plane"></i> Shiping Information
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <div
                      className="btn btn-default"
                      onClick={() => {
                        setShowFormAddressNewBie(true);
                        setEdit(false);
                        setNameShip("");
                        setAddressShip("");
                        setPhoneNumberShip("");
                        setZipCodeShip("");
                      }}
                    >
                      Add Address
                    </div>

                    <>
                      <div
                        className={`dropdown tg-themedropdown tg-minicartdropdown `}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "20px",
                        }}
                      >
                        <a
                          href="javascript:void(0);"
                          id="tg-minicart"
                          className="tg-btnthemedropdown dropdown-toggle"
                          aria-haspopup="true"
                          aria-expanded="false"
                          data-toggle="dropdown"
                          onClick={() => {
                            //handleUpdateCartItem();
                            //setOpen((pre) => !pre);
                          }}
                        >
                          <span className="tg-themebadge">
                            {address?.address?.length}
                          </span>
                          <i
                            class="fa fa-location-arrow"
                            aria-hidden="true"
                          ></i>
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
                            {address?.address?.map((item) => (
                              <>
                                {item ? (
                                  <div
                                    className="tg-minicarproduct row"
                                    style={{
                                      marginLeft: "12px",
                                      borderBottom: "1px solid",
                                    }}
                                  >
                                    <div
                                      className="tg-minicarproductdata col-lg-3 col-md-3 col-sx-3"
                                      style={{
                                        maxWidth: "63%",
                                        width: "63%",
                                      }}
                                    >
                                      <h5>
                                        <a href="javascript:void(0);">
                                          {item.name}
                                        </a>
                                      </h5>
                                      <h5>
                                        <a href="javascript:void(0);">
                                          {item.phoneNumber}
                                        </a>
                                      </h5>
                                      <h5>
                                        <a href="javascript:void(0);">
                                          {item.address}
                                        </a>
                                      </h5>
                                      <h5>
                                        <a href="javascript:void(0);">
                                          {item.zipCode}
                                        </a>
                                      </h5>
                                    </div>
                                    <div
                                      class="col-md-3 col-lg-3 col-sx-3"
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "10px",
                                        placeContent: "flex-start",
                                        minHeight: "101px",
                                      }}
                                    >
                                      <button
                                        class="btn btn-link px-2"
                                        style={{
                                          paddingRight: "16px",
                                        }}
                                        onClick={() => {
                                          handleDeleteAddress(item._id);
                                        }}
                                      >
                                        <i
                                          class="fa fa-trash-o"
                                          style={{ fontSize: "24px" }}
                                          aria-hidden="true"
                                        ></i>
                                      </button>
                                      <button
                                        class="btn btn-link px-2"
                                        style={{
                                          paddingRight: "16px",
                                        }}
                                        onClick={() => {
                                          // handle edit
                                          setAddressShip(item?.address);
                                          setZipCodeShip(item?.zipCode);
                                          setNameShip(item?.name);
                                          setPhoneNumberShip(item?.phoneNumber);
                                          setShowFormAddressNewBie(true);
                                          setAddressId(item?._id);
                                          setEdit(true);
                                        }}
                                      >
                                        <i
                                          class="fa fa-pencil"
                                          style={{ fontSize: "24px" }}
                                          aria-hidden="true"
                                        ></i>
                                      </button>
                                      <button
                                        class="btn btn-link px-2"
                                        style={{
                                          paddingRight: "16px",
                                        }}
                                        onClick={() => {
                                          handleSetDefault(item);
                                        }}
                                      >
                                        {item?.isDefault
                                          ? "Default"
                                          : "Set Default"}
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </>
                            ))}

                            {address?.address ? (
                              <></>
                            ) : (
                              <>
                                <div className="tg-minicarproduct row">
                                  <div
                                    className="tg-minicarproductdata col-lg-3 col-md-3 col-sx-3"
                                    style={{
                                      maxWidth: "100%",
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <h5>
                                      <a href="javascript:void(0);">
                                        You don't create any address!
                                      </a>
                                    </h5>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
                <div class="details__user-checkout">
                  {showFormAdressNewBie ? (
                    <>
                      <div class="row-checkout">
                        <div class="field-checkout">
                          <div class="title-checkout">Name</div>
                          <input
                            type="text"
                            class="input-checkout txt-checkout text-validated-checkout"
                            onChange={(e) => {
                              setNameShip(e.target.value);
                            }}
                            value={nameShip}
                          />
                        </div>
                        <div class="field-checkout">
                          <div class="title-checkout">Phone Number</div>
                          <input
                            type="text"
                            class="input-checkout txt-checkout"
                            onChange={(e) => {
                              setPhoneNumberShip(e.target.value);
                            }}
                            value={phoneNumberShip}
                          />
                        </div>
                      </div>
                      <div class="row-checkout">
                        <div class="field-checkout">
                          <div class="title-checkout">Address</div>
                          <input
                            type="text"
                            class="input-checkout txt-checkout text-validated-checkout"
                            onChange={(e) => {
                              setAddressShip(e.target.value);
                            }}
                            value={addressShip}
                          />
                        </div>
                        <div class="field-checkout">
                          <div class="title-checkout">Zip Code</div>
                          <input
                            type="text"
                            class="input-checkout txt-checkout"
                            onChange={(e) => {
                              setZipCodeShip(e.target.value);
                            }}
                            value={zipCodeShip}
                          />
                        </div>
                      </div>
                      <div class="field-checkout">
                        <div
                          className="btn btn-default"
                          style={{
                            marginRight: "10px",
                          }}
                          onClick={handleEditAddress}
                        >
                          Save
                        </div>
                        <div
                          className="btn btn-danger"
                          onClick={() => {
                            setAddressShip("");
                            setZipCodeShip("");
                            setNameShip("");
                            setPhoneNumberShip("");
                            setShowFormAddressNewBie(false);
                            setEdit(false);
                          }}
                        >
                          Cancel
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {address?.address?.map((item) => (
                        <>
                          {item?.isDefault ? (
                            <>
                              <div class="user__name-checkout">
                                {item.name}
                                <br /> {item.phoneNumber}
                              </div>
                              <div class="user__address-checkout">
                                Shipping Address: {item?.address}
                                <br />
                                ZipCode: {item.zipCode}
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-checkout">
          <div class="actions-checkout">
            <a
              href="javascript:void(0);"
              class="btn-checkout action__submit"
              onClick={handleAddOrder}
            >
              Place your Order
              <i class="icon icon-arrow-right-circle"></i>
            </a>
            <a href="javascript:void(0);" class="backBtn-checkout" onClick={() => {
              navigate('/')
            }}>
              Go Back to Shop
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
