import React, { useEffect, useState } from "react";
import {
  actionAddReview,
  actionGetAllCompleted,
} from "../../store/order/action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import StarRatings from "react-star-ratings";
const Completed = () => {
  const [allOrders, setAllOrders] = useState(null);
  useEffect(() => {
    actionGetAllCompleted(1, 10)
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
                  <th className="px-4 py-2 border">Order Status</th>
                  <th className="px-4 py-2 border">Seller</th>
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
  const navigate = useNavigate();
  const [rating, setRating] = useState({}); // Initialize rating state with 0
  const [open, setOpen] = useState({});
  const [review, setReview] = useState({});

  const handleAddReview = ({ itemId, productId }) => {
    if (!rating[itemId] || !review[itemId]) {
      toast.error("Please fill rating and comment!");
    } else {
      actionAddReview({
        productId: productId,
        rating: rating[itemId],
        comment: review[itemId],
      })
        .then((message) => {
          toast.success(message, { autoClose: 3 });
        })
        .catch((err) => {
          toast.error(err.errors.message, { autoClose: 5 });
        });
    }
  };
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
                      href="javascript:void(0);"
                      style={{
                        fontSize: "10px",
                      }}
                      onClick={() => {
                        navigate("/products/detail=" + item.product.slug);
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
                <>
                  <span
                    className="block text-red-600 rounded-full text-xs px-2 font-semibold"
                    style={{
                      padding: "0 188px",
                    }}
                  >
                    <div>{item.orderStatus.at(-1).type}</div>
                    <div>
                      <strong>
                        {item.orderStatus.at(-1).isCompleted
                          ? "Completed"
                          : "Pending"}
                      </strong>
                    </div>
                  </span>
                </>
              </td>
              <td className="hover:bg-gray-200 p-2 text-center">
                <a
                  href="javascript:void(0);"
                  onClick={() => {
                    navigate("/products/sellers=" + item.seller._id);
                  }}
                >
                  <div>{item.seller.info.name}</div>
                </a>
              </td>
              <td className="hover:bg-gray-200 p-2 text-center">
                <div>{item.paymentType}</div>
                <div>{item.paymentStatus}</div>
              </td>
              <td className="hover:bg-gray-200 p-2 text-center">
                ${Number(item.totalPaid).toFixed(2)}
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
                <div
                  className={`dropdown tg-themedropdown tg-minicartdropdown ${
                    open[item._id] ? "open" : ""
                  }`}
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
                    className="tg-btnthemedropdown "
                    aria-haspopup="true"
                    aria-expanded="false"
                    onClick={() => {
                      setOpen((pre) => {
                        pre[item._id] = true;
                        return { ...pre };
                      });
                    }}
                  >
                    <div className="btn btn-default">Leave a review</div>
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
                        <div
                          class="row"
                          id="post-review-box"
                          style={{
                            display: "block",
                          }}
                        >
                          <div class="col-md-12">
                            <StarRatings
                              rating={rating[item._id] ? rating[item._id] : 0}
                              starRatedColor="blue"
                              changeRating={(value) => {
                                console.log("rating::", value);
                                setRating((pre) => {
                                  pre[item._id] = value;

                                  return {
                                    ...pre,
                                  };
                                });
                              }}
                              numberOfStars={5}
                              name="rating"
                            />
                            <textarea
                              style={{
                                height: "50px",
                              }}
                              class="form-control animated"
                              cols="50"
                              id="new-review"
                              name="comment"
                              placeholder="Enter your review here..."
                              rows="5"
                              value={review[item._id] ? review[item._id] : ""}
                              onChange={(e) => {
                                setReview((pre) => {
                                  pre[item._id] = e.target.value;
                                  return {
                                    ...pre,
                                  };
                                });
                              }}
                            ></textarea>

                            <div class="text-right">
                              <div class="stars starrr" data-rating="3"></div>
                              <a
                                class="btn btn-danger btn-sm"
                                href="#"
                                id="close-review-box"
                                style={{
                                  marginRight: "10px",
                                }}
                                onClick={() => {
                                  setOpen((pre) => {
                                    pre[item._id] = false;
                                    return { ...pre };
                                  });
                                }}
                              >
                                <span class="glyphicon glyphicon-remove"></span>
                                Cancel
                              </a>
                              <button
                                class="btn btn-success btn-lg"
                                type="submit"
                                onClick={() => {
                                  handleAddReview({
                                    itemId: item._id,
                                    productId: item.product._id,
                                  });

                                  setOpen((pre) => {
                                    pre[item._id] = false;
                                    return { ...pre };
                                  });
                                }}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              </td>
            </>
          </tr>
        </>
      ))}
    </React.Fragment>
  );
};

export default Completed;
