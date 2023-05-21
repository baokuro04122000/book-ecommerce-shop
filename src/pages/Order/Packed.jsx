import React, { useEffect, useState } from "react";
import { actionGetAllOrdersPacked } from "../../store/order/action";
import moment from "moment";
import { toast } from "react-toastify";
const Packed = () => {
  const [allOrders, setAllOrders] = useState(null);

  useEffect(() => {
    actionGetAllOrdersPacked()
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
                  <th className="px-4 py-2 border">Payment</th>
                  <th className="px-4 py-2 border">Total</th>
                  <th className="px-4 py-2 border">Shipping Cost</th>
                  <th className="px-4 py-2 border">Address</th>
                  <th className="px-4 py-2 border">Shipping Info</th>
                  <th className="px-4 py-2 border">Created at</th>
                  <th className="px-4 py-2 border">Updated at</th>
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
            <div className="text-sm text-gray-600 mt-2">Total {allOrders.total} order found</div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

/* Single Category Component */
const CategoryTable = ({ orders }) => {
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
                  <div
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    Name: {item.product.name}
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
                  <span className="block text-red-600 rounded-full text-xs px-2 font-semibold" style={{
                    padding: '0 188px'
                  }}>
                    <div>{item.orderStatus.at(-1).type}</div>
                    <div>
                      <strong>
                        {item.orderStatus.at(-1).isCompleted===false &&
                        item.orderStatus.at(-1).type === "shipped"
                          ? "Wait confirm from shipper"
                          : ""}

                        {item.orderStatus.at(-1).isCompleted===false &&
                        item.orderStatus.at(-1).type === "packed"
                          ? "Wait packed from seller"
                          : ""}
                      </strong>
                    </div>
                  </span>
                </>
              </td>
              <td className="hover:bg-gray-200 p-2 text-center">
                <div>{item.paymentType}</div>
                <div>{item.paymentStatus}</div>
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
              <td
                className="hover:bg-gray-200 p-2"
                style={{
                  textAlign: "start",
                  fontSize: "13px",
                }}
              >
                <div>Company: {item.shippingCompany.company.name}</div>
                <div>Name: {item.shippingCompany.user.info.name}</div>
                <div>Gender: {item.shippingCompany.user.info.gender}</div>
                <div>Phone: {item.shippingCompany.user.contact.phone}</div>
              </td>

              <td className="hover:bg-gray-200 p-2 text-center">
                {moment(item.createdAt).format("MM/DD/YYYY h:m A")}
              </td>
              <td className="hover:bg-gray-200 p-2 text-center">
                {moment(item.updatedAt).format("MM/DD/YYYY h:m A")}
              </td>
            </>
          </tr>
        </>
      ))}
    </React.Fragment>
  );
};
export default Packed;
