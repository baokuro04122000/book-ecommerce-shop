import React, { useEffect, useState } from "react";
import {
  actionGetAllOrdered,
  actionGetAllOrders,
} from "../../store/order/action";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Ordered = () => {
  const [allOrders, setAllOrders] = useState(null);

  useEffect(() => {
    actionGetAllOrdered()
      .then((data) => {
        setAllOrders(data);
      })
      .catch((err) => toast.error(err?.errors?.message));
  }, []);

  return (
    <React.Fragment>
      <section class="content-checkout">
        <div
          class="container-checkout row"
          style={{
            width: "1340px",
          }}
        >
          <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
            <table
              className="table-auto border w-full my-2"
              style={{
                display: "block",
                overflowY: "auto",
                maxHeight: "800px",
              }}
            >
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Order Item Id</th>
                  <th className="px-4 py-2 border">Product</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Payment</th>
                  <th className="px-4 py-2 border">Total</th>
                  <th className="px-4 py-2 border">Shipping Cost</th>
                  <th className="px-4 py-2 border">Address</th>
                  <th className="px-4 py-2 border">Created at</th>
                  <th className="px-4 py-2 border">Updated at</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allOrders ? (
                  <CategoryTable key={123} orders={allOrders.data} />
                ) : (
                  <tr>
                    <td
                      colSpan="12"
                      className="text-xl text-center font-semibold py-8"
                    >
                      No order found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="text-sm text-gray-600 mt-2">
              Total {allOrders?.total} order found
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

/* Single Category Component */
const CategoryTable = ({ orders }) => {
  const [nameShip, setNameShip] = useState({});
  const [phoneNumberShip, setPhoneNumberShip] = useState({});
  const [addressShip, setAddressShip] = useState({});
  const [zipCodeShip, setZipCodeShip] = useState({});
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleSaveAddress = (itemId) => {};

  return (
    <React.Fragment>
      {orders?.map((item) => (
        <>
          <tr className="border-b">
            <>
              <td className="hover:bg-gray-200 p-2 text-center">{item._id}</td>
              <td className="w-48 hover:bg-gray-200 p-2 flex flex-col space-y-1">
                <span className="block flex items-center space-x-2" key={123}>
                  <img
                    className="w-8 h-8 object-cover object-center"
                    src={item.product.productPictures[0]}
                    alt="productImage"
                    style={{
                      maxWidth: "140px",
                      textAlign: "center",
                      padding: "10px 40px",
                    }}
                  />
                  <div>
                    <a
                      href="javascript:void(0)"
                      onClick={() => {
                        navigate("/products/detail=" + item.product.slug);
                      }}
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      Name: {item.product.name}
                    </a>
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    Qty: {item.quantity}x
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    Type:{" "}
                    {item.product.variants.find((v) => v._id === item.variant)
                      .type === "kindle"
                      ? "E-Book"
                      : "HardBook"}
                  </div>
                </span>
              </td>
              <td className="hover:bg-gray-200 p-2 text-center cursor-default">
                {item.isCancel ? (
                  <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
                    <div>Cancel by: {item.personCancel}</div>
                    <div>Reason: {item.reason}</div>
                  </span>
                ) : (
                  <>
                    <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
                      {item.orderStatus.type}
                    </span>
                  </>
                )}
              </td>
              <td className="hover:bg-gray-200 p-2 text-center">
                {item.paymentType}
              </td>
              <td className="hover:bg-gray-200 p-2 text-center">
                ${item.totalPaid}
              </td>
              <td className="hover:bg-gray-200 p-2 text-center">
                {item.shippingCost === 0 ? "Free" : "$" + item.shippingCost}
              </td>
              <td
                className="hover:bg-gray-200 p-2"
                style={{
                  textAlign: "start",
                  fontSize: "13px",
                }}
              >
                <div>Name: {item.address.name}</div>
                <div>Phone: {item.address.phoneNumber}</div>
                <div>Address: {item.address.address}</div>
              </td>

              <td className="hover:bg-gray-200 p-2 text-center">
                {moment(item.createdAt).format("MM/DD/YYYY h:m A")}
              </td>
              <td className="hover:bg-gray-200 p-2 text-center">
                {moment(item.updatedAt).format("MM/DD/YYYY h:m A")}
              </td>
              <td className="p-2 flex items-center justify-center">
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
                      onClick={async () => {
                        await Promise.all([
                          setNameShip((pre) => {
                            const newState = {
                              ...pre,
                              [item._id]: item.address.name,
                            };

                            return newState;
                          }),
                          setAddressShip((pre) => {
                            const newState = {
                              ...pre,
                              [item._id]: item.address.address,
                            };

                            return newState;
                          }),
                          setPhoneNumberShip((pre) => {
                            const newState = {
                              ...pre,
                              [item._id]: item.address.phoneNumber,
                            };

                            return newState;
                          }),
                          setZipCodeShip((pre) => {
                            const newState = {
                              ...pre,
                              [item._id]: item.address.zipCode,
                            };

                            return newState;
                          }),
                        ]);
                      }}
                    >
                      <div className="btn btn-default">Edit Address</div>
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
                        <>
                          <div class="row-checkout">
                            <div class="field-checkout">
                              <div class="title-checkout">Name</div>
                              <input
                                type="text"
                                class="input-checkout txt-checkout text-validated-checkout"
                                onChange={(e) => {
                                  setNameShip((pre) => {
                                    pre[item._id] = e.target.value;
                                    return pre;
                                  });
                                }}
                                value={
                                  nameShip[item._id]
                                    ? nameShip[item._id]
                                    : nameShip[item._id]
                                }
                              />
                            </div>
                            <div class="field-checkout">
                              <div class="title-checkout">Phone Number</div>
                              <input
                                type="text"
                                class="input-checkout txt-checkout"
                                onChange={(e) => {
                                  setPhoneNumberShip((pre) => {
                                    pre[item._id] = e.target.value;
                                    return pre;
                                  });
                                }}
                                value={phoneNumberShip[item._id]}
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
                                  setAddressShip((pre) => {
                                    pre[item._id] = e.target.value;
                                    return pre;
                                  });
                                }}
                                value={addressShip[item._id]}
                              />
                            </div>
                            <div class="field-checkout">
                              <div class="title-checkout">Zip Code</div>
                              <input
                                type="text"
                                class="input-checkout txt-checkout"
                                onChange={(e) => {
                                  setZipCodeShip((pre) => {
                                    pre[item._id] = e.target.value;
                                    return pre;
                                  });
                                }}
                                value={zipCodeShip[item._id]}
                              />
                            </div>
                          </div>
                          <div class="field-checkout">
                            <div
                              className="btn btn-default"
                              style={{
                                marginRight: "10px",
                              }}
                              onClick={() => {
                                handleSaveAddress(item._id);
                              }}
                            >
                              Save
                            </div>
                            <div className="btn btn-danger" onClick={() => {}}>
                              Cancel
                            </div>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={(e) => {}}
                    className="btn btn-danger rounded-lg p-2 mx-1"
                  >
                    Cancel
                  </div>
                </>
              </td>
            </>
          </tr>
        </>
      ))}
    </React.Fragment>
  );
};
export default Ordered;
