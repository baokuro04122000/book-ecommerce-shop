import { calDiscount, forceLogin } from "../../helpers/utils";
import { selectIsAuth } from "../../store/authentication/selector";
import { useState } from "react";
import { useAppDispatch } from '../../store'
import {toast} from 'react-toastify'
import { actionAddToCart, actionGetCart } from "../../store/cart/action";
const AddCart = ({product}) => {
  const [toggle, setToggle] = useState(true)

  const dispatch = useAppDispatch();
  const handleAddToCart = (variantId, productId) => {
    actionAddToCart({
      product: productId,
      variant: variantId,
      quantity: 1,
      wishlist: false
    }).then(message => {
      dispatch(actionGetCart())
      toast.success(message, {autoClose: 3000})
    }).catch(err => {
      toast.error(err.errors.message, {autoClose: 5000})
    })
  }
  return (
    <>
     <li
       class={`dropdown ${toggle ? 'show-dow-important' : 'show-up-important'}`}
     >
       <a
        className="tg-btn tg-btnstyletwo dropdown-toggle"
        data-toggle="dropdown"
        href="javascript:void(0);"
        onClick={() => {
          setToggle(pre => !pre)
          if (selectIsAuth()) {
            console.log("handle add with");
          } else {
            forceLogin();
          }
        }}
      >
        <i className="fa fa-shopping-basket"></i>
        <em>Add To Basket</em>
      </a>
      <ul
        class={`
        dropdown-menu dropdown-lr animated slideInRight
         ${toggle ? 'display-none-important' : ''}`}
        role="menu"
        style={{
          width: "350px",
        }}
      >
        <div class="col-lg-12">
          {product?.variants?.length === 1 ? (
            <>
              <label
            class="radio-inline"
            style={{
              minWidth: "146px",
            }}
          >
            <input
              style={{
                marginTop: "8px",
              }}
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              onChange={(e) => {
                if(e.target.value){
                  handleAddToCart(e.target.value,product._id)
                }
              }}
              value={product?.variants[0]._id}
              disabled={product?.variants[0].quantity <= 0 ? true : false}
            />{" "}
            {product?.variants[0].type === 'kindle' ? 'E-Book' : 'HardBook'}: ${calDiscount(product?.variants[0].price,product?.variants[0].discount)}
            {" "} {product?.variants[0].quantity <= 0 ? <mark>out of stock</mark> : <></>}
          </label>
            </>
          ): (<></>)}
          {product?.variants?.length === 2 ? (
            <>
            
            <label class="radio-inline">
            <input
              style={{
                marginTop: "8px",
              }}
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              onChange={(e) => {
                if(e.target.value){
                  handleAddToCart(e.target.value,product._id)
                }
              }}
              value={product?.variants?.find((variant) => variant.type === "paperBack")._id}
              disabled={product?.variants?.find((variant) => variant.type === "paperBack").quantity <= 0 ? true : false}
            />{" "}
            HardBook: ${calDiscount(product?.variants?.find((variant) => variant.type === "paperBack").price, product?.variants?.find((variant) => variant.type === "paperBack").discount)}
            {" "} {product?.variants?.find((variant) => variant.type === "paperBack").quantity <= 0 ? <mark>out of stock</mark> : <></>}
          </label>
          <label
            class="radio-inline"
            style={{
              minWidth: "146px",
            }}
          >
            <input
              style={{
                marginTop: "8px",
              }}
              onChange={(e) => {
                if(e.target.value){
                  handleAddToCart(e.target.value,product._id)
                }
              }}
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value={product?.variants?.find((variant) => variant.type === "kindle")._id}
              disabled={product?.variants?.find((variant) => variant.type === "kindle").quantity <= 0 ? true : false}
            />{" "}
            E-Book: ${calDiscount(product?.variants?.find((variant) => variant.type === "kindle").price, product?.variants?.find((variant) => variant.type === "kindle").discount)}
            {" "} {product?.variants?.find((variant) => variant.type === "kindle").quantity <= 0 ? <mark>out of stock</mark> : <></>}
          </label>
            </>
          ): (
            <></>
          )

          }
        </div>
      </ul>
    </li>
    </>
  );
};

export default AddCart;