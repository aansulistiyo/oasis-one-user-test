import React, { useEffect, useState } from "react";
import axios from "axios";
import formatCurrency from "../../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../../redux/actions/cartAction";

export default function CartReceiptTable({ cart }) {
  // Get All Carts Data
  let carts = useSelector((state) => state.cart);
  const [tenant, setTenant] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchTenant(id) {
      const response = await axios
        .get("https://backend.oasis-one.com/api/tenant/user/" + id)
        .catch((err) => {
          console.log("Error: ", err);
        });
      const data = response.data.data;
      setTenant(data);

      // Update Cart
      const updatedCart = setAmount(cart, data);

      const tenantIndex = carts
        .map(function (tenant) {
          return tenant.tenant_id;
        })
        .indexOf(cart.tenant_id);

      carts[tenantIndex] = updatedCart;
      // setData(updatedCart);
      localStorage.setItem("cart", JSON.stringify(carts));
      dispatch(setCart(carts));
    }
    fetchTenant(cart.tenant_id);
  }, [cart]);

  function setAmount(cart, data) {
    const subTotal = cart.order_data
      .map((data) => {
        return data.price * data.quantity;
      })
      .reduce((a, b) => a + b, 0);
    const serviceCharge = subTotal * (data.serviceCharge / 100);
    const taxCharge = subTotal * (data.taxCharge / 100);
    const total = subTotal + serviceCharge + taxCharge;

    cart.order_total = total;
    cart.order_item = cart.order_data.length;
    cart.order_servicecharge = serviceCharge;
    cart.order_taxcharge = taxCharge;

    return cart;
  }

  return (
    <div className="col-12">
      <table
        className="table text-light table-borderless table-sm"
        style={{ fontSize: "14px", fontWeight: "700" }}
      >
        <thead>
          <tr className="border-bottom">
            <th colSpan={2}>
              <b>{tenant.name}</b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-bottom">
            <td className="text-left">Items : </td>
            <td className="text-right">{cart.order_item}</td>
          </tr>
          <tr className="border-bottom">
            <td className="text-left">Subtotal :</td>
            <td className="text-right">
              {formatCurrency(
                cart.order_total -
                  (cart.order_servicecharge + cart.order_taxcharge)
              )}
            </td>
          </tr>
          <tr className="border-bottom">
            <td className="text-left">
              Service Charge ({tenant.serviceCharge}%):
            </td>
            <td className="text-right">
              {formatCurrency(cart.order_servicecharge)}
            </td>
          </tr>
          <tr className="border-bottom">
            <td className="text-left">Tax ({tenant.taxCharge}%) : </td>
            <td className="text-right">
              {formatCurrency(cart.order_taxcharge)}
            </td>
          </tr>
          <tr>
            <td className="text-left">Total : </td>
            <td className="text-right">{formatCurrency(cart.order_total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
