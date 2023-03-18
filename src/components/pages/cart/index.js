import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../../../redux/actions/utilsAction";
import HeaderBar from "../../navbar/HeaderBar";
import CartReceipts from "./CartReceipts";
import MenuLists from "./MenuLists";
import emptyCart from "../../../assets/images/emptyCart.png";

import FormCheckout from "./FormCheckout";

export default function CartPage() {
  const carts = useSelector((state) => state.cart);
  return (
    <React.Fragment>
      <HeaderBar />

      <CartReceipts />

      {carts.length > 0 ? (
        <div className="container-body">
          <MenuLists />

          <FormCheckout />
        </div>
      ) : (
        <div className="container-body d-flex justify-content-center align-items-center">
          <div className="col-12 text-center">
            <img src={emptyCart} alt="" className="w-75 p-5" />
            <div className="mb-4">
              <b>Your Cart is Empty.</b>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
