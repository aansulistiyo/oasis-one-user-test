import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import * as cart from "../../helper/cartHelper";
import { setCart } from "../../redux/actions/cartAction";
import { useParams } from "react-router-dom";

export default function MenuCartContent({ menu }) {
  let { id } = useParams();

  if (id === undefined || id.charAt(0) === "M") {
    id = menu.tenant_id;
  }
  const dispatch = useDispatch();
  const color = useSelector((state) => state.color);
  const quantity = cart.GetItemQuantity(id, menu.id);

  function incrementData() {
    const newCart = cart.IncreaseItemQuantity(id, menu);
    dispatch(setCart(newCart));
  }

  function decrementData() {
    const newCart = cart.DecreaseItemQuantity(id, menu);
    dispatch(setCart(newCart));
  }

  return (
    <React.Fragment>
      <Button
        className="menu-cart-action-button rounded-circle d-flex align-items-center justify-content-center"
        style={{ color: color }}
        onClick={() => {
          if (menu.isUnlimited || menu.quantity > 0) decrementData();
          else return;
        }}
      >
        -
      </Button>
      <div className="flex-grow-1" style={{ color: "white", fontSize: "14px" }}>
        {quantity}
      </div>
      <Button
        className="menu-cart-action-button rounded-circle d-flex align-items-center justify-content-center"
        style={{ color: color }}
        onClick={() => {
          if (menu.isUnlimited || menu.quantity > 0) incrementData();
          else return;
        }}
      >
        +
      </Button>
    </React.Fragment>
  );
}
