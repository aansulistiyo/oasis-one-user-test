import formatCurrency from "../../../utils/formatCurrency";
import { Modal, Button } from "react-bootstrap/";
import moment from "moment";
import { useHistory } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSocket } from "../../../redux/actions/utilsAction";
import { SocketContext } from "../../../context/socketContext";

export default function DetailCurrentOrder({ tenant, order, ...props }) {
  const history = useHistory();

  const socket = useContext(SocketContext);

  console.log(order);

  let status = "Pending";
  if (order.order_status === 1) status = "Pending";
  else if (order.order_status === 2) status = "Payment";
  else if (order.order_status === 3) status = "Order Placed";
  else if (order.order_status === 4) status = "Served";
  else if (order.order_status === 5) status = "Complete";
  else status = "Rejected";

  let statusClass = "";
  if (status === "Pending" || status === "Payment")
    statusClass = "bagde-status-pending";
  else if (status === "Served" || status === "Order Placed")
    statusClass = "bagde-status-pending";
  else if (status === "Complete") statusClass = "bagde-status-complete";
  else statusClass = "bagde-status-rejected";

  function callTheWaiter() {
    history.push(`/${tenant.tenant_id}/CallWaiter`);
  }

  return (
    <Modal {...props} dialogClassName={"modal-detail"} size={"sm"} centered>
      <React.Fragment>
        <div className="d-flex justify-content-between">
          <div className={`badge bagde-status mt-2 ${statusClass}`}>
            {status}
          </div>
          {order.order_status < 5 && (
            <button
              className="btn btn-call-waiter btn-sm"
              onClick={() => {
                callTheWaiter();
              }}
            >
              Call the Waiter
            </button>
          )}
        </div>

        <div className="order-divider"></div>
      </React.Fragment>

      <table className="table table-bills table-borderless table-sm ">
        <thead className="text-sm">
          <tr>
            <th colSpan={2} style={{ color: "#FF7B01" }}>
              {order.order_id}
            </th>
          </tr>
          <tr>
            <th>Store: {tenant.name}</th>
            <th className="text-right" style={{ color: "#FF7B01" }}>
              Table&nbsp;{order.order_table_index}
            </th>
          </tr>
          <tr>
            <th colSpan={2}>
              Time:&nbsp;
              {moment(order.order_time).format("MMMM, Do YYYY; h:mm:ss a")}
            </th>
          </tr>
        </thead>
        <tbody>
          {order.order_menu.map((menu) => {
            return (
              <tr key={menu.id}>
                <td>{`${menu.name} - ${menu.orderQuantity}x`} </td>
                <td className="order-bills">
                  {formatCurrency(
                    menu.orderQuantity * menu.price.replaceAll(",", "")
                  )}
                </td>
              </tr>
            );
          })}

          <tr className="border-top">
            <td>Subtotal :</td>
            <td className="order-bills">
              {formatCurrency(
                order.order_total -
                  (order.order_servicecharge + order.order_taxcharge)
              )}
            </td>
          </tr>

          <tr>
            <td>Service Charge ({tenant.serviceCharge}%):</td>
            <td className="order-bills">
              {formatCurrency(order.order_servicecharge)}
            </td>
          </tr>

          <tr className="border-bottom">
            <td>Tax ({tenant.taxCharge}%):</td>
            <td className="order-bills">
              {formatCurrency(order.order_taxcharge)}
            </td>
          </tr>

          <tr>
            <td>Bill Amount :</td>
            <td className="order-bills">{formatCurrency(order.order_total)}</td>
          </tr>
        </tbody>
      </table>

      {order.order_status < 3 && (
        <div className="row my-2">
          <div className="col-12 text-center">
            <button
              className={`btn btn-payment${
                order.order_status > 1 && order.order_status < 3
                  ? ""
                  : "-disabled"
              }`} //|| order.order_status === 3
              disabled={
                order.order_status > 1 && order.order_status < 3
                  ? ""
                  : "disabled"
              } //|| order.order_status === 3
              onClick={() => {
                history.push({
                  pathname: `/Payment`,
                  state: {
                    tenant,
                    order,
                  },
                });
              }}
            >
              Payment
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
